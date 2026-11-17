"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { IMG } from "@/components/generic-lp/images";


const CONDITIONS = [
  {
    condition: "Gynecomastia",
    headline: "When Your Chest Still Looks Enlarged Despite Your Efforts",
    description: "Persistent male chest enlargement can affect how you dress, exercise and feel in social situations. Gynecomastia surgery can address excess glandular tissue, fat or a combination of both in suitable patients.",
  },
  {
    condition: "Liposuction",
    headline: "When Certain Areas Hold On To Fat That Won’t Budge",
    description: "Some areas of localised fat may remain despite lifestyle efforts. Liposuction is a body-contouring procedure designed to address selected areas of excess fat after proper assessment.",
  },
  {
    condition: "Mommy Makeover",
    headline: "When Pregnancy Leaves Changes That Exercise Can’t Fully Address",
    description: "Pregnancy can bring changes to the abdomen, breasts and overall body contour. A Mommy Makeover combines suitable procedures based on the individual concerns and goals of each patient.",
  },
  {
    condition: "Tummy Tuck",
    headline: "When Your Abdomen Has Loose Skin You Can’t Simply Work Off",
    description: "Significant excess abdominal skin can remain after pregnancy or major weight changes. A tummy tuck focuses on addressing excess skin and improving abdominal contour in suitable candidates.",
  },
  {
    condition: "Sagging Breast Correction",
    headline: "When Your Breast Shape Has Changed Over Time",
    description: "Pregnancy, breastfeeding, weight changes and ageing can alter breast position and shape. Breast lift surgery may be considered to address sagging and create a more proportionate contour.",
  },
  {
    condition: "Rhinoplasty",
    headline: "When Your Nose Doesn’t Feel Proportionate To Your Face",
    description: "The nose plays an important role in overall facial balance. Rhinoplasty can address selected concerns relating to nose shape, size or proportion following individual assessment.",
  },
  {
    condition: "Arm Liposuction",
    headline: "When Upper-Arm Fullness Makes Sleeveless Clothing Uncomfortable",
    description: "Persistent fullness around the upper arms can affect clothing choices and body confidence. Arm liposuction may be considered for suitable patients with localised excess fat.",
  },
];

const CTA = "Submit Your Details";

const IMAGES: Record<string, { src: string; pos?: string }> = {
  Gynecomastia: { src: IMG.gynecomastia },
  Liposuction: { src: "/images-3.jpg" },
  "Mommy Makeover": { src: "/images-1.webp" },
  "Tummy Tuck": { src: "/images-4.jpg" },
  "Sagging Breast Correction": { src: "/images-2.webp", pos: "50% 20%" },
  Rhinoplasty: { src: "/images-6.png" },
  "Arm Liposuction": { src: "/images-7.png" },
};

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SETS = 3; // the list is rendered 3x so it can wrap around in both directions
const SPEED = 45; // px per second (auto scroll)
const IDLE_MS = 1500; // resume auto scroll this long after the user stops touching it

export default function ConditionsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const setW = useRef(0); // width of one full set of cards
  const pos = useRef(0); // exact (fractional) scroll position
  const hover = useRef(false);
  const focus = useRef(false);
  const lastUser = useRef(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length > CONDITIONS.length) {
      setW.current = cards[CONDITIONS.length].offsetLeft - cards[0].offsetLeft;
    }
  }, []);

  /* continuous auto scroll + seamless wrap */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    pos.current = setW.current;
    el.scrollLeft = pos.current;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const w = setW.current;
      if (w) {
        const idle = now - lastUser.current > IDLE_MS;
        if (!hover.current && !focus.current && idle && !reduce) {
          pos.current += SPEED * dt;
          el.scrollLeft = pos.current;
        } else {
          pos.current = el.scrollLeft; // user (or arrows) is driving – stay in sync
        }
        // seamless wrap: always keep the position inside the middle set
        if (pos.current >= 2 * w) {
          pos.current -= w;
          el.scrollLeft = pos.current;
        } else if (pos.current < w) {
          pos.current += w;
          el.scrollLeft = pos.current;
        }
        if (barRef.current) barRef.current.style.width = `${(((pos.current - w) % w) / w) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const old = setW.current;
      measure();
      if (old && setW.current) {
        pos.current = (pos.current / old) * setW.current;
        el.scrollLeft = pos.current;
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  /* a scroll that we did not cause = the user is swiping/dragging */
  const onScroll = () => {
    const el = trackRef.current;
    if (el && Math.abs(el.scrollLeft - pos.current) > 2) lastUser.current = performance.now();
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    lastUser.current = performance.now();
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowBase =
    "grid h-11 w-11 cursor-pointer select-none place-items-center rounded-full border border-[#6A113D]/25 bg-white text-[#6A113D]  transition outline-none hover:bg-[#ED575C] hover:text-white focus-visible:ring-2 focus-visible:ring-[#6A113D]/50 lg:h-[3vw] lg:min-h-11 lg:w-[3vw] lg:min-w-11";

  return (
    <section
      id="treatments"
      className={`font-[family-name:var(--font-lato)] relative w-full overflow-hidden bg-[#FFF8FA] bg-[radial-gradient(circle_at_92%_8%,rgba(237,87,92,0.10),transparent_38%),radial-gradient(circle_at_6%_92%,rgba(165,45,91,0.12),transparent_40%)] py-10 sm:py-10`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6A113D]/[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#ED575C]/[0.10]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-[11.1%]">
        {/* top row: label + arrows */}
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
          <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#6A113D]/25 bg-white py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-[#6A113D] ">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[#6A113D] to-[#ED575C] text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
              </svg>
            </span>
            Treatment Options
          </div>

          {/* div role=button (not <button>) so the global button:hover rule doesn't repaint them */}
          <div className="hidden gap-3 min-[375px]:flex">
            <div
              role="button"
              tabIndex={0}
              aria-label="Previous"
              onClick={() => scrollByCard(-1)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollByCard(-1)}
              className={arrowBase}
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-label="Next"
              onClick={() => scrollByCard(1)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollByCard(1)}
              className={arrowBase}
            >
              <ArrowIcon className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
          onFocus={() => (focus.current = true)}
          onBlur={() => (focus.current = false)}
          className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: SETS }).flatMap((_, set) => CONDITIONS.map((c, i) => (
            <article
              key={`${set}-${c.condition}`}
              aria-hidden={set !== 1 ? true : undefined}
              data-card
              className="group relative flex shrink-0 basis-[88%] flex-col overflow-hidden rounded-[22px] border border-[#6A113D]/12 bg-white transition duration-300 hover:-translate-y-1.5  sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
            >
              {/* illustration */}
              <div className="relative h-[200px] w-full shrink-0 overflow-hidden max-[360px]:h-[170px]">
                <Image
                  src={IMAGES[c.condition].src}
                  alt={`${c.condition} at Sirpi Aesthetics`}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 84vw"
                  style={{ objectPosition: IMAGES[c.condition].pos ?? "50% 50%" }}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
                <span className="absolute bottom-4 left-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A113D] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ED575C]" />
                  {c.condition}
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-2 right-4 text-[44px] font-bold leading-none text-white/80 max-[360px]:text-[36px]`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#6A113D] via-[#ED575C] to-[#ED575C] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-5 min-[400px]:p-6 sm:p-7">
              <div
                role="heading"
                aria-level={3}
                className={`text-[19px] font-bold leading-[1.25] tracking-[-0.01em] text-[#1f0a14] min-[400px]:text-[21px] sm:text-[22px]`}
              >
                {c.headline}
              </div>

              <div className="mb-6 mt-3 text-[14.5px] leading-[1.6] min-[400px]:text-[15px] text-[#5b4450]">{c.description}</div>

              <a
                href="#contact"
                tabIndex={set !== 1 ? -1 : undefined}
                className="mt-auto flex h-[52px] w-full items-center justify-between rounded-full bg-[#6A113D] pl-6 pr-[6px] text-[15px] font-bold text-white transition hover:brightness-110"
              >
                <span className="whitespace-nowrap">{CTA}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#571032] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon className="h-[18px] w-[18px]" />
                </span>
              </a>
              </div>
            </article>
          )))}
        </div>

        {/* progress */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#6A113D]/12">
          <div ref={barRef} className="h-full w-0 rounded-full bg-gradient-to-r from-[#6A113D] to-[#ED575C]" />
        </div>
      </div>
    </section>
  );
}
