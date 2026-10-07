import type { Metadata } from "next"
import Image from "next/image"
import RatingPrompt from "@/components/elite-minima/RatingPrompt"
import { BRAND_FULL, IMAGES } from "@/components/elite-minima/config"

export const metadata: Metadata = {
  title: "Share Your Review | Elite Minima",
  description: "Tell us about your experience at Elite Minima — The Surgical Speciality Clinic.",
  robots: { index: false, follow: false },
}

export default function ReviewPage() {
  return (
    // inline background: `.elite` sets `background: var(--e-paper)` as unlayered
    // CSS, which outranks a Tailwind bg-* utility no matter the specificity
    <div
      className="elite flex min-h-screen flex-col items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "var(--e-green-deep)" }}
    >
      <div className="mx-auto w-full max-w-[460px] rounded-[28px] bg-white px-5 py-8 shadow-[0_40px_80px_-40px_rgba(87,16,50,0.65)] sm:px-9 sm:py-10">
        <div className="flex flex-col items-center">
          {/* the lockup already carries the name and tagline, so it stands in
              for the wordmark-and-subtitle pair at the top of the reference */}
          <Image
            src={IMAGES.logoLockup}
            alt={BRAND_FULL}
            width={1029}
            height={402}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="mt-5 block h-px w-12 bg-[var(--e-green-line)]" aria-hidden />
        </div>

        <div className="mt-7">
          <RatingPrompt />
        </div>
      </div>
    </div>
  )
}
