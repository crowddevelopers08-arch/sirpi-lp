"use client"

import {
  Pipette,
  Stethoscope,
  Clock,
  CalendarDays,
  Droplet,
  PersonStanding,
  Syringe,
  User,
  Phone,
  Check,
} from "lucide-react"

/**
 * "Why Choose a Minimally Invasive Approach?" comparison table — responsive replica.
 *
 * TWO LAYOUTS:
 * 1. md and up (>=768px) — pixel-mapped 3-column table, traced from the
 *    1672 x 941px reference (left% = x/1672, top% = y/941). Column and
 *    row backgrounds are real elements (not one background image), so
 *    text stays selectable/accessible.
 * 2. below md — the 3-column table would crush to unreadable text, so
 *    each feature becomes a stacked card: label on top, the two approach
 *    values side by side below it.
 *
 * Traced measurements (used by the md+ layout):
 *   table box ............. x 306 -> 1367  (of 1672)
 *   feature column ........ x 306 -> 598   (17.46% wide)
 *   conventional column .... x 603 -> 990   (23.15% wide)
 *   minimally-invasive col . x 991 -> 1367  (22.49% wide)
 *   header row ............. y 210 -> 264   (5.74% tall)
 *   body rows .............. y 264,330,395,460,524,588,652,716,786
 *                             (8 rows, ~65px each, last row 70px for
 *                             the two-line "Post-Procedure Discomfort")
 *   button ................. x 599 -> 1071, y 811 -> 899 (centered pill)
 *
 * Colors sampled directly from the file:
 *   green (headline accent / mini-invasive header / button) = #6A113D
 *   navy heading ........................................... = #6A113D
 *   slate conventional header .............................. = #78465D
 *   conventional row bg ..................................... = #F9E8EF
 *   minimally-invasive row bg ............................... = #FFF8FA
 *   muted subtitle grey ..................................... = #78465D
 */

const GREEN = "#6A113D"
const NAVY = "#171717"
const SLATE = "#78465D"
const CONV_BG = "#F9E8EF"
const MINI_BG = "#FFF8FA"
const MUTED = "#525252"
const PHONE = "+91 89259 76636"

const rows = [
  { icon: Pipette, feature: "Incision Size", conventional: "Around 4–6 cm", mini: "Around 1–2 cm" },
  { icon: Stethoscope, feature: "Scar Appearance", conventional: "More noticeable", mini: "Less noticeable" },
  { icon: Clock, feature: "Procedure Time", conventional: "Around 90–120 min", mini: "Around 45–60 min" },
  { icon: CalendarDays, feature: "Recovery Period", conventional: "Around 2–4 weeks", mini: "Around 7–14 days" },
  { icon: Droplet, feature: "Blood Loss", conventional: "Relatively higher", mini: "Usually minimal" },
  { icon: PersonStanding, feature: "Chest Contouring", conventional: "Standard contouring", mini: "More targeted contouring" },
  { icon: Syringe, feature: "Anaesthesia", conventional: "General / as advised", mini: "Local / as advised" },
  { icon: User, feature: "Post-Procedure\nDiscomfort", conventional: "Moderate", mini: "Mild to moderate" },
]

/* Soft green swooshes + dotted grids + plus icons behind everything. */
function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg className="absolute -left-[4%] -top-[10%] w-[26%] opacity-70" viewBox="0 0 100 100" fill="none">
        <path d="M0,0 H100 C60,20 20,45 0,70 Z" fill="url(#g1)" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C5D3" />
            <stop offset="100%" stopColor="#FFF8FA" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute -right-[4%] -bottom-[12%] w-[24%] rotate-180 opacity-70" viewBox="0 0 100 100" fill="none">
        <path d="M0,0 H100 C60,20 20,45 0,70 Z" fill="url(#g2)" />
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C5D3" />
            <stop offset="100%" stopColor="#FFF8FA" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* dotted grids */}
      <div
        className="absolute right-[4%] top-[3%] h-[9%] w-[9%]"
        style={{ backgroundImage: "radial-gradient(#E8C5D3 1.2px, transparent 1.3px)", backgroundSize: "14px 14px" }}
      />
      <div
        className="absolute left-[3%] bottom-[13%] h-[13%] w-[9%]"
        style={{ backgroundImage: "radial-gradient(#E8C5D3 1.2px, transparent 1.3px)", backgroundSize: "14px 14px" }}
      />

      {/* plus icons */}
      <svg className="absolute left-[6%] top-[17%] h-[7%] w-[4%] text-[#F0D8E2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4v16M4 12h16" />
      </svg>
      <svg className="absolute right-[10%] top-[42%] h-[6%] w-[3.5%] text-[#F9E8EF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
      </svg>
    </div>
  )
}

export default function ComparisonBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FFF8FA" }}>
      <Decor />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:py-16">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.25em] sm:text-[15px]" style={{ color: "#000000" }}>
            A Smarter, Safer Choice
          </p>
          <h2
            className="mt-2 text-[28px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[40px] lg:text-[46px]"
            style={{ color: "#000000" }}
          >
            Why Choose a <span style={{ color: "#000000" }}>Minimally Invasive</span> Approach?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] sm:text-[20px]" style={{ color: "#000000" }}>
            Less pain. Minimal scars. Faster recovery. A more confident you.
          </p>
        </div>

        {/* ================================================================
            TABLE (all screens) — the same pixel-mapped design everywhere.
            Below its natural width the table keeps a fixed min-width so
            nothing shrinks or wraps, and the rail scrolls horizontally
            instead of swapping to a different stacked layout.
        ================================================================= */}
        <div
          role="region"
          aria-label="Conventional vs. minimally invasive approach comparison table"
          tabIndex={0}
          className="-mx-5 mt-6 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0"
        >
          <div className="relative min-w-[820px] md:min-w-0" style={{ containerType: "inline-size" }}>
          {/* header row */}
          <div className="flex overflow-hidden rounded-t-2xl" style={{ gap: "0.3%" }}>
            <div
              className="flex items-center justify-center font-bold uppercase"
              style={{
                width: "27.5%",
                height: "clamp(42px, 6.2cqw, 68px)",
                backgroundColor: "#F9E8EF",
                color: "#000000",
                fontSize: "clamp(13px, 1.15cqw, 20px)",
                letterSpacing: "0.08em",
              }}
            >
              Feature
            </div>
            <div
              className="flex items-center justify-center font-bold uppercase"
              style={{
                width: "36.4%",
                height: "clamp(42px, 6.2cqw, 68px)",
                backgroundColor: SLATE,
                color: "#FFFFFF",
                fontSize: "clamp(13px, 1.15cqw, 20px)",
                letterSpacing: "0.08em",
              }}
            >
              Conventional Approach
            </div>
            <div
              className="flex items-center justify-center font-bold uppercase"
              style={{
                width: "35.5%",
                height: "clamp(42px, 6.2cqw, 68px)",
                backgroundColor: GREEN,
                color: "#FFFFFF",
                fontSize: "clamp(13px, 1.15cqw, 20px)",
                letterSpacing: "0.08em",
              }}
            >
              Minimally Invasive Approach
            </div>
          </div>

          {/* body rows */}
          <div className="flex flex-col" style={{ gap: "2px", marginTop: "2px" }}>
            {rows.map((r, i) => {
              const tall = i === rows.length - 1
              return (
                <div key={r.feature} className="flex items-stretch" style={{ gap: "0.3%" }}>
                  {/* feature cell — plain, no card background */}
                  <div
                    className="flex items-center bg-white"
                    style={{
                      width: "27.5%",
                      minHeight: tall ? "clamp(52px, 6.2cqw, 72px)" : "clamp(44px, 5.5cqw, 64px)",
                      paddingLeft: "1.2cqw",
                      gap: "0.9cqw",
                    }}
                  >
                    <span
                      className="flex aspect-square shrink-0 items-center justify-center rounded-full"
                      style={{ width: "3.4cqw", backgroundColor: MINI_BG }}
                    >
                      <r.icon style={{ width: "50%", height: "50%", color: "#000000" }} strokeWidth={2} />
                    </span>
                    <span
                      className="whitespace-pre-line font-bold"
                      style={{ fontSize: "clamp(14px, 1.2cqw, 21px)", lineHeight: 1.3, color: "#000000" }}
                    >
                      {r.feature}
                    </span>
                  </div>

                  {/* conventional cell */}
                  <div
                    className="flex items-center justify-center rounded-xl text-center"
                    style={{
                      width: "36.4%",
                      minHeight: tall ? "clamp(52px, 6.2cqw, 72px)" : "clamp(44px, 5.5cqw, 64px)",
                      backgroundColor: CONV_BG,
                      fontSize: "clamp(14px, 1.2cqw, 21px)",
                      color: "#000000",
                    }}
                  >
                    {r.conventional}
                  </div>

                  {/* minimally invasive cell */}
                  <div
                    className="flex items-center justify-center rounded-xl text-center font-semibold"
                    style={{
                      width: "35.5%",
                      minHeight: tall ? "clamp(52px, 6.2cqw, 72px)" : "clamp(44px, 5.5cqw, 64px)",
                      backgroundColor: MINI_BG,
                      fontSize: "clamp(14px, 1.2cqw, 21px)",
                      color: "#000000",
                    }}
                  >
                    {r.mini}
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>

        {/* call button — kept out of the scrollable table rail so it never
            scrolls out of view or gets squeezed by the table's min-width;
            it just sits centred under the table on every screen size. */}
        <div className="mt-8 flex justify-center">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-md px-7 py-3.5 text-white shadow-lg transition hover:brightness-110 sm:px-9 sm:py-4"
            style={{ backgroundColor: GREEN }}
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" fill="white" strokeWidth={0} />
            <span className="self-stretch w-px bg-white/40" />
            <span className="text-left leading-tight">
              <span className="block text-[16px] font-bold sm:text-[20px] lg:text-[22px]">Call for Cost Estimate</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
