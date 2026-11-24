import Footer from "@/components/rhinoplasty/footer";
import Navbared from "@/components/rhinoplasty/thank-navbar";
import type { Metadata } from "next";
import Link from "next/link";
import TodayDate from "@/components/generic-lp/today-date";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Sirpi Aesthetics",
  description: "Learn how Sirpi Aesthetics collects, uses, and protects personal information.",
};

const POLICY_SECTIONS = [
  {
    title: "Information We Collect",
    body: "We may collect your name, phone number, email address, treatment interest, appointment preferences, and any health or concern details you choose to share through consultation forms or direct communication.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to respond to enquiries, schedule consultations, provide treatment guidance, improve patient support, and maintain internal records related to service delivery.",
  },
  {
    title: "Sharing And Protection",
    body: "Your information is handled with reasonable administrative and technical safeguards. We do not sell your personal information, and we only share it when required for clinic operations, legal compliance, or professional service support.",
  },
  {
    title: "Your Choices",
    body: "You may request updates or corrections to the personal details you have shared with us. You may also contact us if you want to understand what information we hold or prefer that we stop using it for follow-up communication.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbared />
      <main
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "72px 24px 96px",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top left, rgba(237,87,92,0.08), transparent 32%), radial-gradient(circle at top right, rgba(165,45,91,0.12), transparent 30%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "980px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(255,253,250,0.94)",
              border: "1px solid rgba(165,45,91,0.16)",
              boxShadow: "0 24px 60px rgba(36,31,33,0.08)",
              padding: "48px clamp(24px, 5vw, 56px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "44px",
                  height: "3px",
                  background: "#A52D5B",
                }}
              />
              <span
                style={{
                  color: "#A52D5B",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                }}
              >
                Privacy Policy
              </span>
            </div>

            <h1
              style={{
                margin: "0 0 16px",
                color: "#1f0a14",
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Your information stays treated with care.
            </h1>

            <p
              style={{
                margin: "0 0 14px",
                color: "#5b4450",
                fontSize: "16px",
                lineHeight: 1.8,
                maxWidth: "740px",
              }}
            >
              This page explains how Sirpi Aesthetics may collect, use, store, and protect information shared through this website or during consultation enquiries.
            </p>

            <p
              style={{
                margin: "0 0 32px",
                color: "#8a7f74",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
              }}
            >
              Effective date: <TodayDate />
            </p>

            <div className="privacy-sections" style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
              {POLICY_SECTIONS.map((section) => (
                <section
                  key={section.title}
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(246,242,236,0.85))",
                    border: "1px solid rgba(36,31,33,0.08)",
                    padding: "24px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 10px",
                      color: "#1f0a14",
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    {section.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "#5b4450",
                      fontSize: "15px",
                      lineHeight: 1.8,
                    }}
                  >
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <section
              style={{
                borderTop: "1px solid rgba(165,45,91,0.16)",
                paddingTop: "24px",
                display: "grid",
                gap: "12px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#1f0a14",
                  fontSize: "22px",
                  fontWeight: 800,
                }}
              >
                Contact For Privacy Requests
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#5b4450",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                If you need help with your personal data, you can reach the clinic team at{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  style={{ color: "#A52D5B", textDecoration: "none" }}
                >
                  {EMAIL}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${PHONE_TEL}`}
                  style={{ color: "#6A113D", textDecoration: "none" }}
                >
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "8px" }}>
                <Link href="/rhinoplasty" className="inline-flex h-[52px] items-center justify-between gap-4 rounded-full bg-[#6A113D] pl-6 pr-[6px] text-[15px] font-bold text-white no-underline shadow-[0_10px_26px_rgba(106,17,61,0.28)] transition hover:bg-[#571032]">
                  <span className="whitespace-nowrap">Back To Home</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ED575C]"><svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                </Link>
                <Link href="/rhinoplasty/thank-you" className="inline-flex h-[52px] items-center rounded-full border-2 border-[#6A113D]/25 bg-white px-6 text-[15px] font-bold text-[#6A113D] no-underline transition hover:border-[#6A113D]">
                  View Thank You Page
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
