import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/components/generic-lp/images";
import { ADDRESS_FULL, EMAIL, HOURS, PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";

const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(`Sirpi Aesthetics, ${ADDRESS_FULL}`)}&output=embed`;

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`;

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        background: "#2a0d1c",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: GRAIN,
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
          opacity: 0.12,
          mixBlendMode: "screen",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(135deg,transparent,transparent 7px,rgba(255,255,255,0.02) 7px,rgba(255,255,255,0.02) 8px)",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "36%",
          height: "60%",
          background: "radial-gradient(ellipse at 0% 0%, rgba(165,45,91,0.2) 0%, transparent 72%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "34%",
          height: "55%",
          background: "radial-gradient(ellipse at 100% 0%, rgba(237,87,92,0.18) 0%, transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1220px] px-5 pt-6 pb-4 sm:px-8 sm:pt-8 lg:px-[44px] lg:pt-[42px] lg:pb-[18px]">
        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-7 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-5">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Link href="/rhinoplasty" className="flex shrink-0 items-center" aria-label="Sirpi Aesthetics home">
                <Image src={IMG.logo} alt="Sirpi Aesthetics" width={1029} height={402} className="h-12 w-auto rounded-xl sm:h-16" />
              </Link>
            </div>

            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "20px",
                color: "#FFF8FA",
              }}
            >
              Sirpi Aesthetics - Cosmetic Surgery Centre.
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,253,250,0.72)",
                maxWidth: "320px",
              }}
            >
              Cosmetic and plastic surgery in Coimbatore, planned around each patient by a certified Plastic Surgeon.
            </p>
          </div>

          <div>
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A52D5B",
                fontWeight: 700,
              }}
            >
              Contact
            </p>

            <div className="flex flex-col gap-1.5 sm:gap-2.5 lg:gap-2 [&_a]:break-words">
              <span style={{ color: "rgba(255,253,250,0.76)", fontSize: "15px", lineHeight: 1.6 }}>
                {ADDRESS_FULL}
              </span>
              <a href={`tel:${PHONE_TEL}`} style={{ color: "#FFF8FA", textDecoration: "none", fontSize: "15px" }}>
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} style={{ color: "#FFF8FA", textDecoration: "none", fontSize: "15px" }}>
                {EMAIL}
              </a>
              <span style={{ color: "rgba(255,253,250,0.72)", fontSize: "15px", lineHeight: 1.6 }}>
                {HOURS}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A52D5B",
                fontWeight: 700,
              }}
            >
              Find Us
            </p>

            <div
              style={{
                overflow: "hidden",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                lineHeight: 0,
                flex: 1,
              }}
              className="min-h-[190px] sm:min-h-[240px] lg:min-h-[280px]"
            >
              <iframe
                title="Sirpi Aesthetics location, Peelamedu, Coimbatore"
                src={MAP_URL}
                width="100%"
                height="280"
                style={{ border: 0, display: "block", width: "100%", height: "100%", minHeight: "inherit" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-5 flex flex-col items-center gap-1 text-center sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-around sm:gap-3 lg:mt-6"
          style={{ paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-[13px] sm:text-[15px]" style={{ color: "rgba(255,253,250,0.62)" }}>
            Copyright 2026 Sirpi Aesthetics. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px",justifyContent: "flex-start" }}>

            <Link href="/rhinoplasty/privacy-policy" style={{ color: "rgba(255,253,250,0.72)", textDecoration: "none", fontSize: "15px" }}>
              Privacy
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
