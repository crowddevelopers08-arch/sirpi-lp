import Image from "next/image";
import { Sparkles } from "lucide-react";
import styles from "./care-hero.module.css";
import { IMG } from "@/components/generic-lp/images";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";

/* Treatments shown in the scrolling chip row. */
const POINTS = [
  "Gynecomastia",
  "Liposuction",
  "Mommy Makeover",
  "Tummy Tuck",
  "Sagging Breast Correction",
  "Rhinoplasty",
  "Arm Liposuction",
].map((title) => ({ title, icon: Sparkles }));

/**
 * Opening banner.
 *
 * Desktop (lg+): copy on the left, treatment photo on the right.
 * Phones/tablets: one column in this order — label, title, photo, USPs,
 * call button (centred), paragraph, main button (centred). The copy column
 * and the button row use `max-lg:contents`, so their children become items of
 * the outer grid and `order-*` can interleave them with the photo.
 */
export default function CareHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8FA] font-[family-name:var(--font-lato)]">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ED575C]/[0.10]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#6A113D]/[0.06]" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] items-center gap-x-10 gap-y-5 px-4 py-8 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 lg:px-[7%] lg:py-12">
        <div className="min-w-0 max-lg:contents">
          <div className="order-1 justify-self-start inline-flex items-center gap-2 rounded-full border border-[#6A113D]/20 bg-white py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-[#6A113D]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6A113D] text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
              </svg>
            </span>
            Government Approved Hospital for Cosmetic Surgery in Coimbatore
          </div>

          <h1 className="order-2 mt-5 max-lg:mt-0 text-[30px] font-black min-[400px]:text-[32px] leading-[1.12] tracking-[-0.02em] text-[#1f0a14] sm:text-[44px] lg:text-[clamp(40px,2.9vw,54px)]">
            Looking for professional guidance to address <span className="text-[#6A113D]">your aesthetic concerns?</span>
          </h1>
          <p className="order-6 mt-4 max-w-[560px] max-lg:mt-0 text-[16px] font-bold leading-[1.65] text-[#1f0a14] sm:text-[18px] lg:mt-3 lg:text-[16px]">
            Get your concerns assessed by a certified Plastic Surgeon at a government-registered hospital in Coimbatore.
          </p>
          <p className="order-6 mt-3 max-w-[560px] max-lg:-mt-2 text-[16px] leading-[1.65] text-[#5b4450] sm:text-[18px] lg:mt-2 lg:text-[16px]">
            Explore personalised surgical options for concerns ranging from enlarged male chest and stubborn fat to post-pregnancy changes, breast sagging and facial profile concerns, with assessment by a certified Plastic Surgeon in Coimbatore.
          </p>

          <div className={`${styles.points} order-4 mt-6 min-w-0 max-lg:mt-0 lg:mt-5`}>
            <div className={styles.track} style={{ animationDuration: "65s" }}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className={styles.group}>
                  {POINTS.map(({ title, icon: Icon }) => (
                    <li key={title} className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#6A113D]/10 bg-white px-3.5 py-2 text-[13px] font-bold text-[#1f0a14] ">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#6A113D]/[0.07] text-[#6A113D]">
                        <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      {title}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 max-lg:contents lg:mt-5">
            <a
              href="#contact"
              className="order-7 justify-self-center lg:order-none flex h-[54px] max-w-full items-center justify-between gap-3 rounded-full bg-[#6A113D] pl-5 pr-[7px] text-[14px] min-[380px]:gap-5 min-[380px]:pl-7 min-[380px]:text-[15px] font-bold text-white transition hover:bg-[#571032] lg:h-12"
            >
              <span className="min-[380px]:whitespace-nowrap">Explore Your Treatment Options</span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ED575C]">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
            <a href={`tel:${PHONE_TEL}`} className="order-5 justify-self-center lg:order-none flex h-[54px] items-center gap-2 rounded-full border-2 border-[#6A113D]/25 bg-white px-6 text-[15px] font-bold text-[#6A113D] transition hover:border-[#6A113D] lg:h-12">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="relative order-3 mx-auto grid aspect-[4/3] w-full max-w-[640px] grid-cols-[.94fr_1.06fr] grid-rows-2 gap-1.5 overflow-hidden rounded-[22px] border border-[#6A113D]/10 bg-white p-1.5 lg:order-none lg:aspect-[5/4] lg:justify-self-end lg:rounded-[28px] lg:max-w-[590px]">
          <div className="relative row-span-2 overflow-hidden rounded-[16px]">
            <Image
              src={IMG.hero}
              alt="Dr. Srigireesh A R, Plastic Surgeon at Sirpi Aesthetics, Coimbatore"
              fill
              priority
              sizes="(min-width:1024px) 22vw, 44vw"
              className="object-cover object-top"
            />
          </div>
          <div className="relative overflow-hidden rounded-[16px]">
            <Image src={IMG.heroDetailTop} alt="Treatment at Sirpi Aesthetics, Coimbatore" fill priority sizes="(min-width:1024px) 23vw, 48vw" className="object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-[16px]">
            <Image src={IMG.heroDetailBottom} alt="Surgical theatre at Sirpi Aesthetics, Coimbatore" fill priority sizes="(min-width:1024px) 23vw, 48vw" className="object-cover" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#6A113D] via-[#A52D5B] to-[#ED575C]" />
        </div>
      </div>
    </section>
  );
}
