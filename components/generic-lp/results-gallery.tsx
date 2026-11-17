"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  Before & after results — one card per treatment, from sirpicentre.com/gallery.
  Each image is already a combined, labelled before/after card, so it is shown
  whole (square, never cropped).

  The cards run in a single row that moves on its own. It is a real horizontal
  scroller, so it also answers swipes and click-drag; the auto-move pauses while
  the pointer is over it or a finger is on it, and resumes shortly after. The
  list is rendered twice and wrapped back by exactly one copy, so the loop has
  no visible jump. Tapping a card opens it larger, with previous / next.
*/

const RESULTS = [
  { title: "Gynecomastia", group: "Men", src: "/gallery/gynecomastia.jpg" },
  { title: "Hair Transplantation", group: "Hair", src: "/gallery/hair-transplant.jpg" },
  { title: "Back Liposuction", group: "Body", src: "/gallery/liposuction.jpg" },
  { title: "Tummy Tuck", group: "Body", src: "/gallery/tummy-tuck.jpg" },
  { title: "Mommy Makeover", group: "Body", src: "/gallery/mommy-makeover.jpg" },
  { title: "Rhinoplasty", group: "Face", src: "/gallery/rhinoplasty.jpg" },
  { title: "Liquid Rhinoplasty", group: "Face", src: "/gallery/liquid-rhinoplasty.jpg" },
  { title: "Otoplasty (Ear Correction)", group: "Face", src: "/gallery/face-procedures.jpg" },
] as const;

const GROUPS = ["All", "Men", "Hair", "Body", "Face"] as const;
type Group = (typeof GROUPS)[number];

const SPEED = 40; // px per second
const RESUME_MS = 1500; // resume auto-move this long after a swipe / drag ends
const MIN_PER_SET = 6; // short filters (e.g. "Men") are repeated so the row still fills and loops

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ResultsGallery() {
  const [group, setGroup] = useState<Group>("All");
  const [open, setOpen] = useState<number | null>(null); // index into `shown`
  const stripRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false); // a drag shouldn't count as a tap on a card

  const shown = RESULTS.filter((r) => group === "All" || r.group === group);
  // One "set" is the filtered list, repeated until it is long enough to loop.
  const repeat = Math.max(1, Math.ceil(MIN_PER_SET / shown.length));
  const set = Array.from({ length: repeat }, () => shown).flat();

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shown.length) % shown.length)), [shown.length]);

  /* ── auto-move + seamless wrap ─────────────────────────────────────────── */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let hovering = false;
    let touching = false;
    let lastUser = 0;
    let raf = 0;
    let last = performance.now();
    let pos = 1; // fractional position, so slow speeds still move smoothly

    const setWidth = () => strip.scrollWidth / 2;
    strip.scrollLeft = pos;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const w = setWidth();
      const idle = now - lastUser > RESUME_MS;
      if (!reduced && !hovering && !touching && idle && w > 0) {
        pos += SPEED * dt;
        strip.scrollLeft = pos;
      } else {
        pos = strip.scrollLeft; // the visitor is driving — follow them
      }
      if (w > 0) {
        if (pos >= w) pos -= w;
        else if (pos <= 0) pos += w;
        if (Math.abs(strip.scrollLeft - pos) > 1) strip.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      lastUser = performance.now() - RESUME_MS; // resume right away on mouse leave
    };
    const onTouchStart = () => (touching = true);
    const onTouchEnd = () => {
      touching = false;
      lastUser = performance.now();
    };

    // click-and-drag for mouse users (touch scrolls natively)
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      dragged.current = false;
      startX = e.clientX;
      startLeft = strip.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) {
        dragged.current = true;
        strip.style.cursor = "grabbing";
      }
      strip.scrollLeft = startLeft - dx;
      lastUser = performance.now();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      strip.style.cursor = "";
    };

    strip.addEventListener("mouseenter", onEnter);
    strip.addEventListener("mouseleave", onLeave);
    strip.addEventListener("touchstart", onTouchStart, { passive: true });
    strip.addEventListener("touchend", onTouchEnd);
    strip.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      strip.removeEventListener("mouseenter", onEnter);
      strip.removeEventListener("mouseleave", onLeave);
      strip.removeEventListener("touchstart", onTouchStart);
      strip.removeEventListener("touchend", onTouchEnd);
      strip.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [group]); // restart (from the beginning) when the filter changes

  /* ── lightbox: Esc closes, arrows move, page behind doesn't scroll ─────── */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : shown[open];

  return (
    <section id="results" className="relative w-full overflow-hidden bg-white py-10 font-[family-name:var(--font-lato)] sm:py-14">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ED575C]/[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#6A113D]/[0.05]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-[8%]">
        {/* heading */}
        <div className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6A113D]/20 bg-[#FFF8FA] py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-[#6A113D]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6A113D] text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
              </svg>
            </span>
            Before &amp; After
          </div>
          <h2 className="mt-4 text-[26px] font-black leading-[1.18] tracking-[-0.02em] text-[#1f0a14] min-[400px]:text-[28px] sm:text-[38px]">
            See What Changed And. <span className="text-[#6A113D]">And Understand What Was Addressed.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5b4450] sm:text-[16px]">
            Every body is different, and surgical outcomes vary from person to person. Explore patient before-and-after images to understand the types of concerns these procedures may address.
          </p>
        </div>

        {/* filter — always one row; swipes sideways when the screen is narrower than the chips */}
        <div className="-mx-4 mt-6 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Filter results by area" className="mx-auto flex w-max gap-2 py-1">
            {GROUPS.map((g) => {
              const active = g === group;
              return (
                <button
                  key={g}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGroup(g)}
                  className={`h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 text-[13px] font-bold transition sm:h-10 sm:px-5 ${
                    active ? "border-[#6A113D] bg-[#6A113D] text-white " : "border-[#6A113D]/20 bg-white text-[#6A113D] hover:border-[#6A113D]"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* results — one moving row, edge to edge, edges faded */}
      <div
        ref={stripRef}
        key={group}
        role="region"
        aria-label="Before and after results"
        className="relative mt-6 cursor-grab select-none overflow-x-auto pb-4 [scrollbar-width:none] sm:mt-8 [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
        }}
      >
        <ul className="flex w-max">
          {[0, 1].flatMap((copy) =>
            set.map((r, i) => {
              const hidden = copy === 1;
              return (
                // padding (not gap) between cards, so both copies are exactly equal and the loop is seamless
                <li key={`${copy}-${i}-${r.src}`} aria-hidden={hidden || undefined} className="shrink-0 pr-4 sm:pr-5">
                  <button
                    type="button"
                    tabIndex={hidden ? -1 : undefined}
                    onClick={() => {
                      if (dragged.current) return;
                      setOpen(i % shown.length);
                    }}
                    aria-label={`View ${r.title} before and after`}
                    className="group block w-[72vw] max-w-[300px] cursor-pointer overflow-hidden rounded-[20px] border border-[#6A113D]/10 bg-white text-left transition duration-300 hover:-translate-y-1  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A113D] sm:w-[300px] lg:w-[320px] lg:max-w-none"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#1f0a14]">
                      <Image
                        src={r.src}
                        alt={hidden ? "" : `${r.title} before and after result at Sirpi Aesthetics`}
                        fill
                        draggable={false}
                        sizes="(min-width:1024px) 320px, (min-width:640px) 300px, 72vw"
                        className="pointer-events-none object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-black text-[#1f0a14] sm:text-[16px]">{r.title}</p>
                        <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#A52D5B] sm:text-[12px]">{r.group}</p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFF8FA] text-[#6A113D] transition group-hover:bg-[#6A113D] group-hover:text-white sm:h-10 sm:w-10">
                        <Arrow className="h-[17px] w-[17px]" />
                      </span>
                    </div>
                  </button>
                </li>
              );
            }),
          )}
        </ul>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-[8%]">
        <p className="mt-4 text-center text-[12.5px] text-[#8a6a78]">
          Individual results vary. Suitability and expected outcome are discussed during consultation.
        </p>

        <div className="mt-5 flex justify-center">
          <a
            href="#contact"
            className="flex h-[52px] items-center justify-between gap-5 rounded-full bg-[#6A113D] pl-7 pr-[7px] text-[15px] font-bold text-white transition hover:bg-[#571032] sm:h-[54px]"
          >
            <span className="whitespace-nowrap">Book a Consultation</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ED575C]">
              <Arrow className="h-[18px] w-[18px]" />
            </span>
          </a>
        </div>
      </div>

      {/* lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} before and after`}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1a0610]/85 p-4 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <figure className="relative m-0 w-full max-w-[min(88vh,720px)]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1f0a14] ">
              <Image src={current.src} alt={`${current.title} before and after result at Sirpi Aesthetics`} fill sizes="720px" className="object-contain" priority />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-white">
              <span className="text-[16px] font-black">{current.title}</span>
              <span className="text-[13px] text-white/70">
                {(open ?? 0) + 1} / {shown.length}
              </span>
            </figcaption>

            <button type="button" onClick={close} aria-label="Close" className="absolute -top-3 -right-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-[#6A113D] sm:-right-14 sm:top-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            {shown.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous result" className="absolute top-1/2 left-2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-[#6A113D] sm:-left-16">
                  <Arrow className="h-5 w-5 rotate-180" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next result" className="absolute top-1/2 right-2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-[#6A113D] sm:-right-16">
                  <Arrow className="h-5 w-5" />
                </button>
              </>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
