"use client"

import { ArrowRight, Phone } from "lucide-react"
import { Reveal } from "../motion"
import { track } from "../track"
import { PHONES } from "../config"
import { GYN_BRANCH } from "./content"

/**
 * Closing call to action.
 *
 * A full-bleed accent band with near-black type — the one place on the page
 * where green is the ground rather than the mark. Both other pages close on a
 * dark ink panel with drifting aurora blobs inside a rounded card; this is the
 * inverse of that, and it is the last thing a reader sees, so it is the right
 * place to spend the contrast.
 */
export default function GynFinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--g-accent)] text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,9,33,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,9,33,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(80% 80% at 50% 50%,#000,transparent)",
          WebkitMaskImage: "radial-gradient(80% 80% at 50% 50%,#000,transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-8 lg:py-10">
        <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2.5 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-black/70">
              <span aria-hidden className="h-px w-6 bg-[#3b0921]/50" />
              Final Step
            </p>
            {/* Inline colour, not a utility: `.gyn h2` sets `color: inherit`,
                and the band's own text colour is what should win here. */}
            <h2 className="mt-5 max-w-[20ch]">Confident Starts with your body</h2>
            <p className="g-display mt-5 text-[1.15rem] tracking-[0.04em] text-black/80">You don&apos;t have to keep hiding your chest or guessing what treatment you need.</p>
          </div>

          <div className="min-w-0">
            <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-black/80">
              Book Your Gynecomastia Consultation
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#book"
                onClick={() => track("book_click", { branch: GYN_BRANCH, section: "final-cta" })}
                className="g-btn g-btn-ink group/btn w-full sm:w-auto"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONES[0].tel}`}
                onClick={() => track("call_click", { branch: GYN_BRANCH, section: "final-cta" })}
                className="g-btn w-full border-[#3b0921]/35 text-black hover:border-[#3b0921] hover:bg-[#3b0921]/10 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </div>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-black/80">
              Sirpi Aesthetics, Coimbatore
              <br />
              {PHONES[0].display}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-black/80">
              <em>Treatment suitability, outcomes, recovery and risks vary from patient to patient and will be discussed during consultation.</em>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
