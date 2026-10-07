"use client"

import Image from "next/image"
import { useId, useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Reveal, Stagger, StaggerItem } from "../motion"
import { track } from "../track"
import { GYN_BRANCH, SURGEON } from "./content"

const CARE_REASONS = [
  {
    title: "Hospital-Based Care",
    description: "Sirpi Aesthetics operates with a hospital-based setup for cosmetic surgical procedures, providing structured care throughout your treatment journey.",
  },
  {
    title: "Personalised Treatment Planning",
    description: "Every patient's chest anatomy and tissue composition are different. Treatment is planned after individual assessment rather than using a standard approach.",
  },
  {
    title: "Advanced Aesthetic Approach",
    description: "Sirpi Aesthetics incorporates advanced technology and surgical techniques as appropriate for individual procedures.",
  },
  {
    title: "Comprehensive Patient Care",
    description: "Your journey extends beyond the procedure, with structured pre-operative assessment, surgical care and post-operative follow-up.",
  },
  {
    title: "Emergency Support",
    description: <>Sirpi Aesthetics has an MOU with <strong>PSG Hospital for ICU and ambulance support</strong> to help cater to patients in case emergency support is required.</>,
  },
]

/**
 * The surgeon, set as an editorial spread on the bone band.
 *
 * The general page runs its three specialists as a swipeable card rail. There
 * is only one surgeon here, so the space goes into the portrait and the name
 * instead — the page is asking a visitor to be examined by this person, and
 * that is the moment to make him large rather than one card in a set.
 */
export default function GynSurgeon() {
  const [openReason, setOpenReason] = useState<number | null>(0)
  const accordionId = useId()
  return (
    <section id="surgeon" className="bg-[var(--g-bone)] text-[var(--g-ink)]">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
        {/* Portrait in the middle of the copy on phones, back in its own column
            from lg. Same three-block grid the hero and the clinic section use:
            source order is what phones follow, explicit placement is what puts
            the portrait beside the copy again. Row gap is zeroed at lg so the
            two copy halves close back up into one column. */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-16 lg:gap-y-0">
          {/* ── Copy, above the portrait on mobile ───────────────────── */}
          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <Reveal>
              <p className="g-eyebrow g-eyebrow--ink">Meet Your Surgeon</p>
              <h2 className="mt-5">Why Choose Sirpi Aesthetics for Gynecomastia Correction?</h2>

              <div className="mt-7 space-y-4">
                <h3 className="text-[var(--g-ink)]">Plastic Surgery Expertise</h3>
                <p className="max-w-[62ch] text-[0.98rem] leading-relaxed text-[var(--g-ink-dim)]">
                  Your treatment is planned under the guidance of a qualified Plastic Surgeon with:
                </p>
              </div>
              <p className="mt-4 text-[0.86rem] font-bold uppercase tracking-[0.16em] text-[var(--g-ink-dim)]">
                <strong>MBBS | MS (General Surgery) | MCh &amp; DrNB (Plastic Surgery) | Fellowship in Aesthetic Surgery &amp; Aesthetic Medicine</strong>
              </p>
            </Reveal>
          </div>

          {/* ── Portrait ─────────────────────────────────────────────── */}
          <Reveal className="relative lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:flex lg:h-full lg:flex-col">
            {/* Offset rule behind the frame — depth without a drop shadow,
                which this system does not use. */}
            <span aria-hidden className="absolute -left-3 -top-3 hidden h-full w-full border border-[var(--g-bone-line)] sm:block" />

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--g-bone-2)] lg:aspect-auto lg:min-h-[400px] lg:flex-1">
              <Image
                src="/DSC3351.jpg"
                alt={`${SURGEON.name} — ${SURGEON.title}`}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-top"
              />
              {["left-0 top-0 border-l border-t", "right-0 bottom-0 border-r border-b"].map((c) => (
                <span key={c} className={`pointer-events-none absolute h-6 w-6 border-[var(--g-accent-deep)] ${c}`} aria-hidden />
              ))}
            </div>

            {/* Name plate under the frame, printed on ink so the portrait has a
                foot to stand on. */}
            <div className="bg-[var(--g-ink)] px-6 py-5">
              <p className="g-display text-[1.3rem] leading-none text-[var(--g-bone)]">{SURGEON.name}</p>
              <p className="mt-2 text-[0.78rem] uppercase tracking-[0.14em] text-[var(--g-text)]">{SURGEON.title}</p>
            </div>
          </Reveal>

          {/* ── Copy, below the portrait on mobile ───────────────────── */}
          <div className="min-w-0 lg:col-start-2 lg:row-start-2">
            {/* No top margin on phones — the grid's own gap already separates
                this from the portrait above it. */}
            <Reveal delay={0.08} className="lg:mt-10">
              <h3 className="text-[var(--g-ink)]">Your Care at Sirpi Aesthetics</h3>
            </Reveal>

            {/* Numbered rows rather than ticks — the numeral is this page's
                list marker everywhere else, and a row of green checks is what
                the other two pages already do. */}
            <Stagger gap={0.07} className="mt-6 border-t border-[var(--g-bone-line)]">
              {CARE_REASONS.map((r, i) => (
                <StaggerItem key={r.title}>
                  <div className="group border-b border-[var(--g-bone-line)] transition-colors duration-300 hover:bg-[var(--g-bone-2)]">
                    <h3>
                      <button
                        type="button"
                        id={`${accordionId}-trigger-${i}`}
                        aria-expanded={openReason === i}
                        aria-controls={`${accordionId}-panel-${i}`}
                        onClick={() => setOpenReason(openReason === i ? null : i)}
                        className="flex w-full items-center gap-5 py-4 text-left text-[var(--g-ink)]"
                      >
                        <span aria-hidden className="g-numeral g-numeral--ink flex-none text-[1.4rem] transition-colors duration-300 group-hover:[-webkit-text-stroke-color:var(--g-accent-deep)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">{r.title}</span>
                        <ChevronDown aria-hidden className={`h-4 w-4 flex-none transition-transform duration-200 ${openReason === i ? "rotate-180" : ""}`} />
                      </button>
                    </h3>
                    <div
                      id={`${accordionId}-panel-${i}`}
                      role="region"
                      aria-labelledby={`${accordionId}-trigger-${i}`}
                      hidden={openReason !== i}
                      className="pb-4 pl-12"
                    >
                      <p className="text-[0.95rem] leading-relaxed text-[var(--g-ink-dim)]">{r.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <a
                href="#book"
                onClick={() => track("book_click", { branch: GYN_BRANCH, section: "surgeon" })}
                className="g-btn g-btn-ink group/btn mt-9 w-full sm:w-auto"
              >
                {SURGEON.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
