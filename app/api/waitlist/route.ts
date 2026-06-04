import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* Basic in-memory rate limit: 3 requests per IP per 60 seconds */
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  org: string;
  type: string;
  timestamp: string;
  ip: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "No RESEND_API_KEY" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "YourUniverse <noreply@youruniverse.co.za>",
      to,
      subject,
      html,
    }),
  });
  return { ok: res.ok, status: res.status };
}

function logEntry(entry: WaitlistEntry) {
  try {
    const logDir = path.join(process.cwd(), "data");
    fs.mkdirSync(logDir, { recursive: true });
    const logFile = path.join(logDir, "waitlist.json");
    const existing: WaitlistEntry[] = fs.existsSync(logFile)
      ? JSON.parse(fs.readFileSync(logFile, "utf8"))
      : [];
    existing.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));
  } catch { /* non-fatal on serverless */ }
}

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "hello@youruniverse.co.za";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, org, type } = body as Partial<WaitlistEntry>;

    if (!name?.trim() || !email?.trim() || !type?.trim()) {
      return NextResponse.json({ error: "Name, email, and type are required." }, { status: 400 });
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      org: org?.trim() ?? "",
      type: type.trim(),
      timestamp: new Date().toISOString(),
      ip,
    };

    // Log to file (works locally, no-op on Vercel read-only fs)
    logEntry(entry);

    // Notify team
    await sendEmail(
      NOTIFY_EMAIL,
      `New ${entry.type} registration: ${entry.name}`,
      `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0F172A;color:#F1F5F9;border-radius:12px">
        <h2 style="color:#774DFF;margin:0 0 24px">New Waitlist Registration</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;color:#94A3B8;width:100px">Type</td><td style="color:#F1F5F9;font-weight:600">${entry.type}</td></tr>
          <tr><td style="padding:10px 0;color:#94A3B8">Name</td><td style="color:#F1F5F9">${entry.name}</td></tr>
          <tr><td style="padding:10px 0;color:#94A3B8">Email</td><td style="color:#774DFF">${entry.email}</td></tr>
          <tr><td style="padding:10px 0;color:#94A3B8">Organisation</td><td style="color:#F1F5F9">${entry.org || "N/A"}</td></tr>
          <tr><td style="padding:10px 0;color:#94A3B8">Submitted</td><td style="color:#F1F5F9">${new Date(entry.timestamp).toLocaleString("en-ZA")}</td></tr>
        </table>
      </div>`
    );

    // Confirm to registrant
    const isSchool = entry.type === "School";
    const isInstitution = entry.type === "Institution";
    const biz = isSchool || isInstitution;
    await sendEmail(
      entry.email,
      "You're on the list | YourUniverse",
      `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 32px;background:#0F172A;color:#F1F5F9;border-radius:12px">
        <p style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#F1F5F9;margin:0 0 4px">YourUniverse</p>
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#774DFF;margin:0 0 32px">Educational Decision Intelligence</p>
        <h1 style="font-size:22px;font-weight:600;color:#F1F5F9;margin:0 0 16px">You&rsquo;re on the list, ${entry.name}.</h1>
        <p style="color:#94A3B8;line-height:1.7;margin:0 0 24px">
          ${biz
            ? `Thank you for registering as a <strong style="color:#F1F5F9">${entry.type}</strong>. Our team will be in touch with a tailored early access proposal before we open to the general waitlist.`
            : `Thank you for registering. We are building South Africa's first decision intelligence platform for learners and you will be among the first to access it when we launch.`
          }
        </p>
        <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-top:24px">
          <p style="color:#475569;font-size:13px;margin:0">Questions? Reply to this email or reach us at <a href="mailto:hello@youruniverse.co.za" style="color:#774DFF">hello@youruniverse.co.za</a></p>
          <p style="color:#475569;font-size:11px;margin:12px 0 0">A Lynxio Tech product &middot; Built in South Africa</p>
        </div>
      </div>`
    );

    return NextResponse.json({ success: true, message: "Registration received." });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
