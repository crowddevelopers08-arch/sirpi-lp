import FAQSection from "@/components/elite-minima/gynecomastia/faq"
import GynBooking from "@/components/elite-minima/gynecomastia/GynBooking"
import GynGoogleReviews from "@/components/elite-minima/gynecomastia/GynGoogleReviews"
import GynGallery from "@/components/elite-minima/gynecomastia/GynGallery"
import GynBeforeAfter from "@/components/elite-minima/gynecomastia/GynBeforeAfter"
import GynFinalCta from "@/components/elite-minima/gynecomastia/GynFinalCta"
import GynFooter from "@/components/elite-minima/gynecomastia/GynFooter"
import GynHeader from "@/components/elite-minima/gynecomastia/GynHeader"
import GynecomastiaBanner from "@/components/elite-minima/gynecomastia/GynHero"
import GynJourney from "@/components/elite-minima/gynecomastia/GynJourney"
import GynLocation from "@/components/elite-minima/gynecomastia/GynLocation"
import GynOptions from "@/components/elite-minima/gynecomastia/GynOptions"
import GynReviews from "@/components/elite-minima/gynecomastia/GynReviews"
import GynStickyCta from "@/components/elite-minima/gynecomastia/GynStickyCta"
import GynSurgeon from "@/components/elite-minima/gynecomastia/GynSurgeon"
import LearningDevelopment from "@/components/elite-minima/gynecomastia/LearningDevelopment"
import type { Metadata } from "next"



export const metadata: Metadata = {
  title: "Gynecomastia Surgery in Chennai | Male Breast Reduction — Sirpi Aesthetics, Anna Nagar",
  description:
    "Gynecomastia treatment in Anna Nagar, Chennai. Specialist evaluation with Dr. Madan K — liposuction, gland excision and chest contouring for a flatter, more masculine chest. Book a private consultation.",
  openGraph: {
    title: "Gynecomastia Surgery in Chennai | Male Breast Reduction — Sirpi Aesthetics",
    description:
      "Specialist-led male breast reduction at Sirpi Aesthetics, Anna Nagar: liposuction, gland excision and advanced chest contouring, planned after clinical evaluation.",
    type: "website",
    locale: "en_IN",
  },
}

/**
 * The gynecomastia landing page.
 *
 * The third landing page on the site, and deliberately the odd one out. `/`
 * and `/general` both wear the `.elite` design system — white paper, pill
 * buttons, soft shadows, Lato throughout — and a third page in it would have
 * been the same page with different words. This one runs on `.gyn` instead
 * (see globals.css): near-black surfaces cut by bone-white bands, square
 * corners, hairline rules, outlined numerals and uppercase headings — set in
 * Lato, the site's only typeface. Its sections live in
 * components/elite-minima/gynecomastia/ and share nothing with the other two
 * beyond the brand primitives — the motion helpers, CountUp, the clinic config
 * and the lead API.
 */
export default function GynecomastiaPage() {
  return (
    <div className="gyn pb-[60px] lg:pb-0">
      {/* Lenis owns scroll position, so no `scroll-smooth` class here. */}
      <GynHeader />
      <main>
        {/* 1 · Hook + the surgeon's face */}
        <GynecomastiaBanner />
        <GynBeforeAfter />
        {/* 1b · Lead capture, immediately under the hook */}
        <GynBooking />
        <GynGoogleReviews />
        {/* 2 · Social proof */}
        {/* <GynReviews /> */}
        {/* 3 · What happens, in order */}
        <GynJourney />
        {/* 3b · Which procedure, and why */}
        <GynOptions />
        
        {/* 3c · Outcomes, scars, recovery */}
        {/* <GynOutcomes /> */}

        {/* <GynecomastiaBanner /> */}
        {/* 4 · Authority */}
        <GynSurgeon />
        <LearningDevelopment />
        <FAQSection />
        {/* 5 · The clinic and who it serves */}
        {/* <GynClinic /> */}
        {/* 6 · Getting there */}
        <GynLocation />
        <GynGallery />
        {/* 7 · Close */}
        <GynFinalCta />
      </main>
      <GynFooter />
      <GynStickyCta />
    </div>
  )
}
