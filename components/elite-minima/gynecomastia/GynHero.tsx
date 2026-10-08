"use client"

import Image from "next/image"
import { Timer, Users, Star, UserRound, CalendarClock, ShieldCheck, Check, Phone, ArrowRight, ChevronRight } from "lucide-react"
import CountUp from "../CountUp"

/**
 * Gynecomastia Surgery clinic banner — responsive replica.
 *
 * TWO LAYOUTS, one component:
 *
 * 1. lg and up (>=1024px) — exact pixel-mapped replica. Reference art is
 *    1893 x 722px; every element is positioned from that coordinate space
 *    (left% = x/1893, top% = y/722). Type uses `cqw` (1cqw = 1% of the
 *    banner's own width) wrapped in clamp() so it stays readable on a
 *    small laptop and stops growing on an ultrawide.
 *
 * 2. below lg — the absolute composition would crush the copy, so it's
 *    replaced by a stacked flow layout: headline, stats, trust row,
 *    buttons, then the before/after pair. Same content, same colors.
 *
 * Traced measurements (used by the lg+ layout):
 *   left column margin .... x = 202
 *   eyebrow cap top ....... y = 80
 *   headline cap tops ..... y = 114 / 183   (69px line spacing)
 *   subtitle cap top ...... y = 252
 *   stat circles .......... 80px dia at x = 245 / 481 / 720, y = 304
 *   stat dividers ......... x = 400 / 640, y 310 -> 450
 *   stat numbers .......... y = 400   labels y = 437
 *   trust row ............. y = 501 -> 547
 *   primary button ........ 202,585 -> 584,677   (382 x 92, pill)
 *   outline button ........ 604,585 -> 935,677   (331 x 92, pill)
 *   before photo panel .... 946,75  -> 1303,590  (357 x 515, r24)
 *   after photo panel ..... 1311,115 -> 1666,630 (355 x 515, r24)
 *   arrow circle .......... center (1307, 357), 70px dia
 *   before pill ........... 1068,418  after pill 1442,416
 *   white benefits card ... 1444,487 -> 1760,656 (316 x 169, r20)
 *   script tagline ........ ~1530,20 -> 1720,100
 *
 * IMAGES YOU SUPPLY (put in /public):
 *   /before.jpg  - the "before" clinical photo
 *   /after.jpg   - the "after" clinical photo
 */

const GREEN = "#6A113D"
const NAVY = "#171717"
const TEAL = "#525252"
const PURPLE = "#A52D5B"
const BG = "#FFF8FA"

const stats = [
  { icon: Timer, value: 60, suffix: " Minutes", separator: "", label: "SURGERY" },
  { icon: Users, value: 500, suffix: "+", separator: ",", label: "SURGERIES\nDONE" },
  { icon: Star, value: 15, suffix: "+", separator: "", label: "YEARS OF\nEXPERIENCE" },
]

// const trust = [
//   { icon: UserRound, label: "Evaluated by\nDr. Srigireesh A R" },
//   { icon: CalendarClock, label: "Callbacks within\nclinic hours" },
//   { icon: ShieldCheck, label: "Private\nconsultation" },
// ]

const benefits = ["Minimal Scars", "Quick Recovery", "Improved Confidence"]

const PHONE = "+91 89259 76636"

/* Soft mint blobs that sit behind everything. */
function Blobs() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[6%] -top-[30%] aspect-square w-[22%] rounded-full bg-[#F9E8EF]" />
      <div className="absolute -left-[3%] top-[55%] aspect-square w-[16%] rounded-full bg-[#F9E8EF]" />
      <div className="absolute right-[8%] -top-[18%] aspect-square w-[18%] rounded-full bg-[#FCEEF3]" />
      <div className="absolute -right-[4%] top-[40%] aspect-square w-[20%] rounded-full bg-[#F9E8EF]" />
    </div>
  )
}

/* Hand-script tagline + swoosh, shared by both layouts. */
function ScriptTag({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <p
        className="whitespace-nowrap font-serif italic leading-[1.3] tracking-tight"
        style={{ color: "#000000", fontSize: "inherit" }}
      >
        Flatter Chest
        <br />
        Greater Confidence
      </p>
      {/* <svg viewBox="0 0 200 20" className="mt-1 w-full" fill="none" aria-hidden>
        <path d="M2,16 C60,18 150,12 198,2" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      </svg> */}
    </div>
  )
}

/** Show each clinical photo from the shared before/after image. */
function SplitPhoto({ side, sizes }: { side: "before" | "after"; sizes: string }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "200%",
        height: "136.364%",
        left: side === "before" ? "0%" : "-100%",
        top: "-22.727%",
      }}
    >
      <Image
        src="/before-1.jpg"
        alt={`Patient chest ${side} gynecomastia surgery`}
        fill
        priority
        sizes={sizes}
      />
    </div>
  )
}
export default function GynecomastiaBanner() {
  return (
    <section className="w-full" style={{ backgroundColor: BG }}>
      {/* ================================================================
          MOBILE / TABLET (< 1024px) — stacked flow layout
      ================================================================= */}
      <div className="relative isolate overflow-hidden px-5 py-5 lg:hidden">
        <Blobs />

        <div className="relative z-10 mx-auto max-w-[640px]">


          <div className="mt-3 text-[30px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[40px]">
            <span style={{ color: "#000000" }}>Male Gynecomastia</span>
            <br />
            <span style={{ color: "#000000" }}> Surgery in Chennai</span>
          </div>

          {/* before / after — comes right after the label/heading/subheading
              on mobile, ahead of stats/trust/benefits/buttons. */}
          <div className="relative mt-8">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[357/515] overflow-hidden rounded-2xl bg-[#F0D8E2]">
                <SplitPhoto side="before" sizes="100vw" />
              </div>
              <div className="relative aspect-[357/515] overflow-hidden rounded-2xl bg-[#F0D8E2]">
                <SplitPhoto side="after" sizes="100vw" />
              </div>
            </div>

            <span className="absolute left-1/2 top-1/2 flex h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
              <ChevronRight className="h-[22px] w-[22px]" style={{ color: "#000000" }} strokeWidth={3} />
            </span>
          </div>

          {/* stats */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center text-center ${i > 0 ? "border-l border-[#E8C5D3]" : ""}`}
              >
                <span
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full sm:h-[64px] sm:w-[64px]"
                  style={{ backgroundColor: TEAL }}
                >
                  <s.icon className="h-[24px] w-[24px] text-white sm:h-[30px] sm:w-[30px]" strokeWidth={2} />
                </span>
                <span className="mt-2 text-[17px] font-bold sm:text-[22px]" style={{ color: "#000000" }}>
                  <CountUp end={s.value} suffix={s.suffix} separator={s.separator} />
                </span>
                <span
                  className="mt-1 whitespace-pre-line text-[9px] font-bold uppercase leading-tight tracking-[0.12em] sm:text-[11px]"
                  style={{ color: "#000000" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* trust row — first two side by side, the third centred on its own
              row below, on mobile only (grid-cols-3 takes back over at sm). */}
          {/* <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {trust.map((t, i) => (
              <div
                key={t.label}
                className={`flex items-center gap-2.5 ${
                  i === trust.length - 1 ? "col-span-2 justify-center sm:col-span-1 sm:justify-start" : ""
                }`}
              >
                <t.icon className="h-[26px] w-[26px] shrink-0" style={{ color: "#000000" }} strokeWidth={1.8} />
                <span className="whitespace-pre-line text-[14px] leading-tight" style={{ color: "#000000" }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div> */}

          {/* benefits card */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 py-1.5">
                <span
                  className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: TEAL }}
                >
                  <Check className="h-[13px] w-[13px] text-white" strokeWidth={3.5} />
                </span>
                <span className="text-[16px]" style={{ color: "#000000" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* buttons — moved to the end on mobile so the persuasion (stats,
              before/after, benefits) reads before the ask. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#book"
              className="flex items-center justify-center gap-2 rounded-md px-6 py-2 text-[16px] font-medium text-white transition hover:brightness-110"
              style={{ backgroundColor: "var(--g-accent-deep)" }}
            >
              Book Your Consultation
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>

            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-3 rounded-md border-2 bg-white px-6 py-2"
              style={{ borderColor: GREEN }}
            >
              <Phone className="h-[22px] w-[22px] shrink-0" style={{ color: "#000000" }} fill={GREEN} strokeWidth={0} />
              <span className="leading-tight">
                <span className="block text-[18px] font-bold" style={{ color: "#000000" }}>
                  {PHONE}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================
          DESKTOP (>= 1024px) — exact pixel-mapped replica
      ================================================================= */}
      <div
        className="relative isolate mx-auto hidden aspect-[1893/722] w-full max-w-[1893px] overflow-hidden lg:block lg:min-h-[calc(100svh-4rem)] min-[1600px]:aspect-auto min-[1600px]:h-svh"
        style={{ containerType: "inline-size" }}
      >
        <Blobs />

        {/* ---------- eyebrow ---------- */}

        {/* ---------- headline (plain divs + inline color so global h1/h2 styles can't override) ---------- */}
        <div
          className="absolute z-10 font-extrabold"
          style={{
            left: "10.67%",
            top: "14.13%",
            fontSize: "min(2.85cqw, 62px)",
            lineHeight: 1.21,
            letterSpacing: "-0.015em",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
         Male Gynecomastia Surgery
        </div>
        <div
          className="absolute z-10 font-extrabold"
          style={{
            left: "10.67%",
            top: "23.68%",
            fontSize: "min(2.85cqw, 62px)",
            lineHeight: 1.21,
            letterSpacing: "-0.015em",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Surgery in Chennai
        </div>

        {/* ---------- stat dividers (x = 400 / 640) ---------- */}
        {[21.13, 33.81].map((l) => (
          <span
            key={l}
            aria-hidden
            className="absolute z-[5] w-px bg-[#E8C5D3]"
            style={{ left: `${l}%`, top: "35.94%", height: "19.39%" }}
          />
        ))}

        {/* ---------- stats (circles 80px @ x 245/481/720, y 304) ---------- */}
        {stats.map((s, i) => {
          const circleLeft = [12.94, 25.41, 38.03][i]
          const centerLeft = [15.05, 27.52, 40.15][i]
          return (
            <div key={s.label} className="absolute inset-0 z-10">
              <span
                className="absolute flex aspect-square items-center justify-center rounded-full"
                style={{ left: `${circleLeft}cqw`, top: "36.11%", width: "4.23cqw", backgroundColor: TEAL }}
              >
                <s.icon className="text-white" style={{ width: "52%", height: "52%" }} strokeWidth={2} />
              </span>

              <span
                className="absolute -translate-x-1/2 whitespace-nowrap font-bold"
                style={{
                  left: `${centerLeft}cqw`,
                  top: "46.02%",
                  fontSize: "min(1.75cqw, 38px)",
                  color: "#000000",
                }}
              >
                <CountUp end={s.value} suffix={s.suffix} separator={s.separator} />
              </span>

              <span
                className="absolute -translate-x-1/2 whitespace-pre-line text-center font-bold uppercase"
                style={{
                  left: `${centerLeft}cqw`,
                  top: "51.97%",
                  fontSize: "min(0.8cqw, 17px)",
                  lineHeight: 1.55,
                  letterSpacing: "0.14em",
                  color: "#000000",
                }}
              >
                {s.label}
              </span>
            </div>
          )
        })}

        {/* ---------- trust row (y = 501) ---------- */}
        {/* {trust.map((t, i) => (
          <div
            key={t.label}
            className="absolute z-10 flex items-center"
            style={{ left: `${[10.67, 22.72, 35.92][i]}%`, top: "69.39%", gap: "0.65cqw" }}
          >
            <t.icon
              className="shrink-0"
              style={{ width: "1.9cqw", height: "1.9cqw", color: "#000000" }}
              strokeWidth={1.8}
            />
            <span
              className="whitespace-pre-line"
              style={{ fontSize: "min(1.16cqw, 25px)", lineHeight: 1.35, color: "#000000" }}
            >
              {t.label}
            </span>
          </div>
        ))} */}

        {/* ---------- desktop actions ---------- */}
        <div
          className="absolute z-10 flex items-stretch"
          style={{ left: "10.67%", top: "64.02%", width: "36.23%", height: "8.14%", gap: "1.06cqw" }}
        >
          <a
            href="#book"
            className="flex min-w-0 flex-[1.10] items-center justify-center whitespace-nowrap rounded-md text-white transition hover:brightness-110"
            style={{ gap: "0.6cqw", fontSize: "1.05cqw", backgroundColor: "var(--g-accent-deep)" }}
          >
            Book Your Consultation
            <ArrowRight className="shrink-0" style={{ width: "1.32cqw", height: "1.32cqw" }} />
          </a>

          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-md bg-white"
            style={{ gap: "0.7cqw", border: `2px solid ${GREEN}` }}
          >
            <Phone
              className="shrink-0"
              style={{ width: "1.7cqw", height: "1.7cqw", color: "#000000" }}
              fill={GREEN}
              strokeWidth={0}
            />
            <span className="font-bold leading-tight" style={{ fontSize: "1.05cqw", color: "#000000" }}>
              {PHONE}
            </span>
          </a>
        </div>

        {/* ---------- before photo panel (946,75 -> 1303,590) ---------- */}
        <div
          className="absolute z-[5] overflow-hidden bg-[#F0D8E2]"
          style={{ left: "50.2%", top: "calc(50% - 14.25cqw)", width: "22%", height: "28.5cqw", borderRadius: "1.27cqw" }}
        >
          <SplitPhoto side="before" sizes="(min-width: 1024px) 44vw, 100vw" />
        </div>

        {/* ---------- after photo panel (1311,115 -> 1666,630) ---------- */}
        <div
          className="absolute z-[5] overflow-hidden bg-[#F0D8E2]"
          style={{ left: "73%", top: "calc(50% - 14.25cqw)", width: "22%", height: "28.5cqw", borderRadius: "1.27cqw" }}
        >
          <SplitPhoto side="after" sizes="(min-width: 1024px) 44vw, 100vw" />
        </div>

        {/* ---------- arrow circle (center 1307,357, 70px) ---------- */}
        <span
          className="absolute z-10 flex aspect-square items-center justify-center rounded-full bg-white shadow-md"
          style={{ left: "70.75%", top: "calc(50% - 1.85cqw)", width: "3.7%" }}
        >
          <ChevronRight style={{ width: "50%", height: "50%", color: "#000000" }} strokeWidth={3} />
        </span>

        {/* ---------- white benefits card (1444,487 -> 1760,656) ---------- */}
        <div
          className="absolute z-10 flex flex-col justify-center bg-white shadow-lg"
          style={{
            left: "80.9%",
            top: "calc(50% + 10.2cqw)",
            width: "16.69%",
            height: "8.93cqw",
            borderRadius: "1.06cqw",
            padding: "0 1.3cqw",
            gap: "0.85cqw",
          }}
        >
          {benefits.map((b) => (
            <div key={b} className="flex items-center" style={{ gap: "0.75cqw" }}>
              <span
                className="flex aspect-square shrink-0 items-center justify-center rounded-full"
                style={{ width: "1.64cqw", backgroundColor: TEAL }}
              >
                <Check className="text-white" style={{ width: "58%", height: "58%" }} strokeWidth={3.5} />
              </span>
              <span style={{ fontSize: "min(1.16cqw, 25px)", color: "#000000" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* ---------- script tagline (top right) ---------- */}
        <ScriptTag
          className="absolute z-10"
          style={{ left: "84.5%", top: "2.77%", width: "14%", fontSize: "min(1.45cqw, 31px)" }}
        />
      </div>
    </section>
  )
}
