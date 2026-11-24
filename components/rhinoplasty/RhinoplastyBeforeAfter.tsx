"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";
import { track as trackEvent } from "@/components/elite-minima/track";

/*
  Rhinoplasty landing — Before & After section (sits under the hero).
  Label → title → paragraph → one-row carousel of result cards.
  Add more nose results to RESULTS and the carousel picks them up
  (arrows and dots appear as soon as the row overflows).
*/

/* Sirpi palette (same as the hero) */
const C = {
  brand: "#6A113D",
  accent: "#ED575C",
  ground: "#F9E8EF",
  card: "#FFF8FA",
};

/* Only nose results belong here — the clinic's other before/after photos are other procedures. */
const RESULTS = [
  {
    src: CLOUDINARY_IMAGES.gallery.rhinoplasty,
    title: "Rhinoplasty",
    tag: "Surgical",
    text: "Nose reshaping surgery — a smoother bridge and a refined tip.",
  },
  {
    src: CLOUDINARY_IMAGES.gallery.liquidRhinoplasty,
    title: "Liquid Rhinoplasty",
    tag: "Non-surgical",
    text: "Filler-based reshaping to lift and balance the nose profile.",
  },
];

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden>
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
  </svg>
);

export default function RhinoplastyBeforeAfter() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [overflow, setOverflow] = useState(false);

  // which card is first in view, and whether the row scrolls at all
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setOverflow(el.scrollWidth > el.clientWidth + 2);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0"))));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[Math.max(0, Math.min(RESULTS.length - 1, i))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="before-after" className="scroll-mt-4 bg-white font-[family-name:var(--font-lato)]">
      <div className="px-4 py-7 sm:px-8 sm:py-8 lg:px-[7%] xl:px-[11%]">
        {/* label → title → paragraph */}
        <div className="mx-auto max-w-[760px] text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] uppercase sm:text-[13px]"
            style={{ backgroundColor: C.ground, color: C.brand }}
          >
            Before &amp; After
          </span>
          <h2 className="mt-2 text-[28px] leading-[1.2] font-extrabold sm:text-[38px]" style={{ color: C.brand }}>
            We don&rsquo;t just fix nose <span className="block sm:inline" style={{ color: C.accent }}>we fix your confidence</span>
          </h2>
        </div>

        {/* one-row carousel */}
        <div className="relative mx-auto mt-5 max-w-[1180px] sm:mt-6">
          <div
            ref={track}
            onScroll={sync}
            className={`flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden ${
              overflow ? "" : "justify-center"
            }`}
          >
            {RESULTS.map((r) => (
              <figure
                key={r.title}
                className="m-0 w-[86%] shrink-0 snap-start overflow-hidden rounded-[20px] border border-[#F1DCE5] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                style={{ backgroundColor: C.card }}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.src} alt={`${r.title} before and after at Sirpi Aesthetics`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="flex items-start justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-[17px] font-bold" style={{ color: C.brand }}>
                      {r.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#5b4450]">{r.text}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase"
                    style={{ backgroundColor: r.tag === "Surgical" ? C.brand : C.accent }}
                  >
                    {r.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* arrows + dots — only when the row actually scrolls */}
          {overflow && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                aria-label="Previous result"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white transition hover:opacity-90 disabled:cursor-default disabled:opacity-35"
                style={{ backgroundColor: C.brand }}
              >
                <Arrow dir="left" />
              </button>
              <div className="flex gap-2">
                {RESULTS.map((r, i) => (
                  <button
                    key={r.title}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${r.title}`}
                    className="h-2.5 cursor-pointer rounded-full transition-all"
                    style={{ width: i === active ? 26 : 10, backgroundColor: i === active ? C.accent : "#E8C5D3" }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(active + 1)}
                disabled={active >= RESULTS.length - 1}
                aria-label="Next result"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white transition hover:opacity-90 disabled:cursor-default disabled:opacity-35"
                style={{ backgroundColor: C.brand }}
              >
                <Arrow dir="right" />
              </button>
            </div>
          )}
        </div>

        {/* CTAs: to the enquiry form, and call */}
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#enquire"
            className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-full px-8 text-[16px] font-bold text-white transition hover:brightness-95 sm:w-auto"
            style={{ backgroundColor: C.accent }}
          >
            Book Your Consultation
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackEvent("call_click", { section: "rhinoplasty-before-after" })}
            className="inline-flex h-12 w-full max-w-[320px] items-center justify-center gap-2 rounded-full px-8 text-[16px] font-bold text-white transition hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: C.brand }}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
            </svg>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
