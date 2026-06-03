import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import { LaunchHeroGraphic } from "@/components/SectionGraphics";

export const metadata: Metadata = {
  title: "Request Early Access",
  description:
    "Join the waitlist for YourUniverse — South Africa's first AI-powered educational decision intelligence platform. Free for every student, always.",
};

export default function EarlyAccessPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section
          style={{
            position: "relative",
            paddingTop: 160,
            paddingBottom: 80,
            borderBottom: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 700,
              height: 380,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(119,77,255,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="container" style={{ position: "relative" }}>
          <div className="sg-row">
            <div className="sg-col" style={{ maxWidth: 640 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="pill">
                  <span className="pill-dot" />
                  Limited Early Access
                </span>
              </div>
              <h1 className="display-2" style={{ marginBottom: 24 }}>
                Be first in line when{" "}
                <span className="text-gradient">we launch</span>
              </h1>
              <p className="body-lg" style={{ maxWidth: 500 }}>
                We&apos;re onboarding schools, learners, and institutional
                partners in cohorts. Reserve your place — it&apos;s completely
                free for every student.
              </p>
            </div>
            <LaunchHeroGraphic />
          </div>
          </div>
        </section>

        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
