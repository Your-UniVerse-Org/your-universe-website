import { toSheetRow, WAITLIST_SHEET_HEADERS } from "@/lib/waitlist-fields";

/** Default Your-UniVerse waitlist sheet (company Google account) */
export const DEFAULT_SHEET_ID = "1EnrKAjnb5o8DjCYGM8w4ULIJ2j05eCKO4m5pccTsvGc";

export interface WaitlistSheetRow {
  id: string;
  name: string;
  email: string;
  org: string;
  type: string;
  firstName?: string;
  surname?: string;
  profile?: Record<string, string>;
  timestamp: string;
  ip: string;
}

export function isSheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim());
}

/** Append a waitlist row via Google Apps Script web app URL. */
export async function appendWaitlistRow(
  entry: WaitlistSheetRow
): Promise<{ ok: boolean; reason?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return { ok: false, reason: "GOOGLE_SHEETS_WEBHOOK_URL not configured" };
  }

  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  const row = toSheetRow(entry);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headers: [...WAITLIST_SHEET_HEADERS],
        row,
        ...(secret ? { secret } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, reason: `Sheets webhook HTTP ${res.status}: ${text}` };
    }

    const json = (await res.json().catch(() => null)) as { success?: boolean; error?: string } | null;
    if (json && json.success === false) {
      return { ok: false, reason: json.error ?? "Sheets webhook returned success: false" };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "Sheets webhook request failed",
    };
  }
}
