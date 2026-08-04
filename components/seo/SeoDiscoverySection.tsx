import Link from "next/link";
import { BASE_URL, SITE_HUB_NAME, SITE_NAME } from "@/lib/seo";

/** Keyword-rich discovery copy for general education search rankings */
export default function SeoDiscoverySection() {
  return (
    <section
      aria-label="About Your Universe Hub"
      className="section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="container" style={{ maxWidth: 820 }}>
        <p
          className="label"
          style={{ marginBottom: 16, color: "var(--text-3)" }}
        >
          Education platform South Africa
        </p>
        <h2
          className="display-3"
          style={{ marginBottom: 24, color: "var(--text-1)" }}
        >
          {SITE_HUB_NAME} — school learning, university guidance &amp; career
          counselling
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            color: "var(--text-2)",
            fontSize: 15,
            lineHeight: 1.8,
          }}
        >
          <p>
            <strong>{SITE_NAME}</strong> ({SITE_HUB_NAME}) is a{" "}
            <strong>school learning platform for South Africa</strong> that helps
            learners answer the questions that shape every future: which subjects
            to choose in Grade 9, <strong>which university to go to</strong>, and
            which career path fits their strengths. From{" "}
            <strong>Grade 9 subject selection</strong> through to graduation,{" "}
            {SITE_HUB_NAME} provides <strong>career guidance for students</strong>,{" "}
            parents, schools, and institutions on one connected platform.
          </p>
          <p>
            Built as an <strong>educational decision intelligence</strong> system,{" "}
            {SITE_HUB_NAME} combines <strong>psychometric career testing</strong>,{" "}
            an <strong>APS calculator for South Africa</strong>, and AI-powered
            recommendations so students can plan their{" "}
            <strong>school-to-university pathway</strong> with clarity — including{" "}
            <strong>TVET career guidance</strong> and routes into higher education.
          </p>
          <p>
            Whether you are a learner choosing the{" "}
            <strong>best subjects for university</strong>, a parent supporting
            subject choices, or a school seeking a{" "}
            <strong>student career counselling platform</strong>, Your Universe
            Hub delivers <strong>university guidance in South Africa</strong> that
            is free for every student and designed for the realities of the
            national curriculum.
          </p>
        </div>
        <nav
          aria-label="Explore Your Universe"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 32,
          }}
        >
          {[
            { href: "/platform", label: "Platform & APS intelligence" },
            { href: "/for-schools", label: "Schools & universities" },
            { href: "/early-access", label: "Join early access" },
            { href: "/about", label: "About Your Universe" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--purple)",
                padding: "10px 16px",
                borderRadius: 100,
                border: "1px solid var(--purple-border)",
                background: "var(--purple-dim)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p
          style={{
            marginTop: 24,
            fontSize: 12,
            color: "var(--text-3)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Canonical site:{" "}
          <a href={BASE_URL} style={{ color: "var(--text-3)" }}>
            {BASE_URL.replace("https://", "")}
          </a>
        </p>
      </div>
    </section>
  );
}
