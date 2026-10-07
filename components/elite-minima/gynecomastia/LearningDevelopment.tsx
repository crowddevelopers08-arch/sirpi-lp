import type { ReactNode } from "react"

/**
 * "Why do men consider gynecomastia correction?" five-point timeline.
 *
 * From `sm` up, the slide is drawn on a 668 × 366 canvas. Every position is a
 * percentage of that canvas and every size is in `cqw`, so the layout scales
 * as one piece and stays identical to the reference at any width. Below `sm`
 * the same steps stack into a vertical timeline so the text stays readable.
 *
 * Colours follow the gynecomastia page palette (`--g-*` in globals.css).
 */

type Step = {
  no: string
  title: string
  text: string
  /** capsule colour */
  color: string
  /** lighter top edge of the capsule, for the raised look */
  shine: string
  /** colour of the number inside the circle */
  numColor: string
  /** colour of the dot sitting on the rail */
  dot: string
  /** sits above the rail (true) or hangs below it (false) */
  up: boolean
  icon: ReactNode
}

const W = 668
const H = 366
const RAIL_Y = 218 // rail position on the canvas
const DOTS_X = [40, 150, 260, 370, 480] // where each step meets the rail

const px = (v: number) => `${(v / W) * 100}%`
const py = (v: number) => `${(v / H) * 100}%`

/* palette — mirrors the --g-* tokens */
const BG = "#FFFFFF"
const RAIL = "#B77591" // --g-line-strong
const INK = "var(--g-ink)"
const MUTED = "var(--g-ink-dim)"

const iconProps = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const STEPS: Step[] = [
  {
    no: "01",
    title: "Clothing",
    text: "Wear fitted shirts and other clothing with greater comfort.",
    color: "#6A113D",
    shine: "#7A234D",
    numColor: "#FFFFFF",
    dot: "#6A113D",
    up: false,
    icon: (
      <svg {...iconProps}>
        <path d="M9 3.5L4 6l-1.5 4.5 3 1.2V20.5h13V11.7l3-1.2L20 6l-5-2.5" />
        <path d="M9 3.5c.6 1.5 1.6 2.3 3 2.3s2.4-.8 3-2.3" />
      </svg>
    ),
  },
  {
    no: "02",
    title: "Exercise",
    text: "Feel less conscious during gym or outdoor activities.",
    color: "#A52D5B",
    shine: "#BC4A75",
    numColor: "#FFFFFF",
    dot: "#A52D5B",
    up: true,
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="8.5" width="3" height="7" rx="1" />
        <rect x="5.5" y="6.5" width="3" height="11" rx="1" />
        <rect x="15.5" y="6.5" width="3" height="11" rx="1" />
        <rect x="18.5" y="8.5" width="3" height="7" rx="1" />
        <path d="M8.5 12h7" />
      </svg>
    ),
  },
  {
    no: "03",
    title: "Social Situations",
    text: "Feel more comfortable at beaches, swimming pools and social gatherings.",
    color: "#ED575C",
    shine: "#F48286",
    numColor: "#FFFFFF",
    dot: "#ED575C",
    up: false,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="7.5" r="3" />
        <path d="M6.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
        <circle cx="5" cy="9.5" r="2.2" />
        <path d="M1.5 18.5c0-2.4 1.6-4.3 3.5-4.3" />
        <circle cx="19" cy="9.5" r="2.2" />
        <path d="M22.5 18.5c0-2.4-1.6-4.3-3.5-4.3" />
      </svg>
    ),
  },
  {
    no: "04",
    title: "Photographs",
    text: "Feel less need to hide their chest in photographs.",
    color: "#F48286",
    shine: "#F6A9AC",
    numColor: "#FFFFFF",
    dot: "#F48286",
    up: true,
    icon: (
      <svg {...iconProps}>
        <path d="M3 8.5A1.5 1.5 0 014.5 7h2.8l1.5-2.5h6.4L16.7 7h2.8A1.5 1.5 0 0121 8.5v10a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5z" />
        <circle cx="12" cy="13.2" r="3.6" />
        <path d="M17.8 10h.01" />
      </svg>
    ),
  },
  {
    no: "05",
    title: "Personal Confidence",
    text: "Feel more comfortable with their overall appearance.",
    color: "#F9E8EF",
    shine: "#FFF8FA",
    numColor: "#6A113D",
    dot: "#E8C5D3",
    up: false,
    icon: (
      <svg {...iconProps}>
        <circle cx="10" cy="7.5" r="3.5" />
        <path d="M3 20.5c0-3.9 3.1-7 7-7 1.4 0 2.7.4 3.8 1.1" />
        <path d="M18 13.5l1.1 2.2 2.4.4-1.7 1.7.4 2.4-2.2-1.1-2.2 1.1.4-2.4-1.7-1.7 2.4-.4z" />
      </svg>
    ),
  },
]

const HEADING_LEAD = "Why Do Men Consider"
const HEADING_REST = "Gynecomastia Correction?"
const INTRO = "For many men, the concern goes beyond physical appearance."
const LEAD_IN = "Correcting persistent chest enlargement may help them feel more comfortable with:"
const NOTE =
  "Individual results vary, and the suitability and expected outcome of surgery should be discussed during consultation."

/* capsule geometry on the 668 × 366 canvas */
const CAP_H = 52 // coloured capsule height
const CAP_LEFT = -22 // capsule start, relative to the dot
const CAP_W = 160 // coloured capsule width
const CARD_LEFT = 22 // white card start, relative to the dot
const CARD_W = 150 // white card width (runs past the capsule end)
const CARD_INSET = 4 // white card is a touch shorter than the capsule
const GAP_UP = 20 // rail → bottom of an upper capsule
const GAP_DOWN = 15 // rail → top of a lower capsule

export default function LearningDevelopment() {
  return (
    <section className="w-full" style={{ background: BG, color: INK }}>
      {/* ───────────── sm and up: exact slide replica ───────────── */}
      <div className="mx-auto hidden w-full max-w-[1280px] sm:block">
        <div
          className="relative w-full overflow-hidden [container-type:inline-size]"
          style={{ aspectRatio: `${W} / ${H}`, background: BG }}
        >
          {/* title */}
          <div className="absolute inset-x-0 text-center" style={{ top: py(30) }}>
            <h2 className="whitespace-nowrap text-[3cqw] uppercase leading-none tracking-[0.01em]">
              <span className="font-bold" style={{ color: INK }}>
                {HEADING_LEAD}
              </span>{" "}
              <span className="font-bold" style={{ color: INK }}>
                {HEADING_REST}
              </span>
            </h2>
            <p className="mt-[1.1cqw] text-[1.6cqw] tracking-[0.02em]" style={{ color: MUTED }}>
              {INTRO}
            </p>
            <p className="mt-[0.4cqw] text-[1.6cqw] tracking-[0.02em]" style={{ color: MUTED }}>
              {LEAD_IN}
            </p>
          </div>

          {/* rail */}
          <div
            className="absolute inset-x-0 h-[0.15cqw] -translate-y-1/2"
            style={{ top: py(RAIL_Y), background: RAIL }}
          />

          {STEPS.map((s, i) => {
            const x = DOTS_X[i]
            const capTop = s.up ? RAIL_Y - GAP_UP - CAP_H : RAIL_Y + GAP_DOWN
            const stemTop = s.up ? RAIL_Y - GAP_UP : RAIL_Y
            const stemH = s.up ? GAP_UP : GAP_DOWN

            return (
              <div key={s.no}>
                {/* stem joining the rail to the capsule */}
                <div
                  className="absolute w-[0.15cqw] -translate-x-1/2"
                  style={{ left: px(x), top: py(stemTop), height: py(stemH), background: RAIL }}
                />

                {/* dot on the rail */}
                <div
                  className="absolute flex h-[1.9cqw] w-[1.9cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.2cqw]"
                  style={{ left: px(x), top: py(RAIL_Y), borderColor: s.dot, background: BG }}
                >
                  <span className="h-[0.95cqw] w-[0.95cqw] rounded-full" style={{ background: s.dot }} />
                </div>

                {/* coloured capsule */}
                <div
                  className="absolute rounded-full shadow-[0_0.9cqw_1.3cqw_rgba(106,17,61,0.28)]"
                  style={{
                    left: px(x + CAP_LEFT),
                    top: py(capTop),
                    width: px(CAP_W),
                    height: py(CAP_H),
                    background: `linear-gradient(180deg, ${s.shine} 0%, ${s.color} 38%, ${s.color} 100%)`,
                  }}
                />

                {/* number circle */}
                <div
                  className="absolute flex h-[5.4cqw] w-[5.4cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.55cqw] border-white shadow-[0_0.3cqw_0.6cqw_rgba(0,0,0,0.25)]"
                  style={{ left: px(x), top: py(capTop + CAP_H / 2), background: s.color }}
                >
                  <span className="text-[2.1cqw] font-bold leading-none" style={{ color: s.numColor }}>
                    {s.no}
                  </span>
                </div>

                {/* white card */}
                <div
                  className="absolute flex items-center gap-[0.9cqw] rounded-lg bg-white pl-[1.3cqw] pr-[1cqw] shadow-[0_0.6cqw_1.2cqw_rgba(106,17,61,0.22)]"
                  style={{
                    left: px(x + CARD_LEFT),
                    top: py(capTop + CARD_INSET),
                    width: px(CARD_W),
                    height: py(CAP_H - CARD_INSET * 2),
                  }}
                >
                  <span className="h-[2.4cqw] w-[2.4cqw] shrink-0" style={{ color: INK }}>
                    {s.icon}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className="text-[1.05cqw] font-extrabold uppercase leading-[1.1] tracking-[0.01em] [font-stretch:condensed]"
                      style={{ color: INK }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-[0.25cqw] line-clamp-4 text-[1cqw] leading-[1.25]" style={{ color: MUTED }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* disclaimer */}
          <p
            className="absolute inset-x-0 px-[6cqw] text-center text-[1.25cqw] italic leading-snug"
            style={{ top: py(318), color: MUTED }}
          >
            {NOTE}
          </p>
        </div>
      </div>

      {/* ───────────── mobile: stacked timeline ───────────── */}
      <div className="px-4 py-10 sm:hidden">
        <h2 className="text-center text-[24px] uppercase leading-tight">
          <span className="font-bold" style={{ color: INK }}>
            {HEADING_LEAD}
          </span>{" "}
          <span className="font-bold" style={{ color: INK }}>
            {HEADING_REST}
          </span>
        </h2>
        <p className="mt-3 text-center text-[15px] tracking-[0.02em]" style={{ color: MUTED }}>
          {INTRO}
        </p>
        <p className="mt-1 text-center text-[15px] tracking-[0.02em]" style={{ color: MUTED }}>
          {LEAD_IN}
        </p>

        <ol className="relative mt-8 space-y-5 pl-7">
          <span className="absolute bottom-6 left-[9px] top-6 w-px" style={{ background: RAIL }} />
          {STEPS.map((s) => (
            <li key={s.no} className="relative">
              <span
                className="absolute -left-7 top-1/2 flex h-[19px] w-[19px] -translate-y-1/2 items-center justify-center rounded-full border-2"
                style={{ borderColor: s.dot, background: BG }}
              >
                <span className="h-[9px] w-[9px] rounded-full" style={{ background: s.dot }} />
              </span>

              <div
                className="flex items-center gap-3 rounded-full p-1.5 pr-1.5 shadow-[0_6px_12px_rgba(106,17,61,0.28)]"
                style={{ background: `linear-gradient(180deg, ${s.shine} 0%, ${s.color} 38%, ${s.color} 100%)` }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-white text-[16px] font-bold shadow-[0_2px_5px_rgba(0,0,0,0.25)]"
                  style={{ background: s.color, color: s.numColor }}
                >
                  {s.no}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white py-2.5 pl-4 pr-6 shadow-[0_4px_10px_rgba(106,17,61,0.2)]">
                  <span className="h-7 w-7 shrink-0" style={{ color: INK }}>
                    {s.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-extrabold uppercase tracking-[0.02em]" style={{ color: INK }}>
                      {s.title}
                    </h3>
                    <p className="text-[13px] leading-snug" style={{ color: MUTED }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-[12px] italic leading-snug" style={{ color: MUTED }}>
          {NOTE}
        </p>
      </div>
    </section>
  )
}
