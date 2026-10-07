"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, Phone } from "lucide-react"
import { track } from "./track"
import { BRAND_FULL, IMAGES, PHONE_DISPLAY, PHONE_TEL } from "./config"

/**
 * Header for the standalone pages (/thank-you, /privacy-policy): the logo on
 * the left; the clinic number and a way back to the landing page on the right.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <header className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-3 rounded-full pl-4 pr-2 transition-all duration-300 sm:h-16 sm:pl-5 sm:pr-2.5 ${
            scrolled
              ? "border border-[var(--e-line)] bg-white/95 shadow-[0_12px_30px_-18px_rgba(14,22,38,0.35)] backdrop-blur-[12px]"
              : "border border-transparent bg-white/75 backdrop-blur-[8px]"
          }`}
        >
          {/* The lockup carries the brand name and tagline, so it is the accessible
              label — no duplicate text beside it. */}
          <a href="/" className="flex flex-none items-center">
            <Image
              src={IMAGES.logoLockup}
              alt={BRAND_FULL}
              width={1029}
              height={402}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </a>

          <div className="flex flex-none items-center gap-2 sm:gap-4">
            {/* On phones the number collapses to its icon, so the row fits at 360px. */}
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => track("call_click", { branch: "Sirpi Aesthetics Clinic" })}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="group flex items-center gap-2 text-[0.88rem] font-semibold text-[var(--e-ink)] transition-colors hover:text-[var(--e-green)]"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[var(--e-line)] bg-white text-[var(--e-green)] transition-colors group-hover:border-[var(--e-green)] group-hover:bg-[var(--e-green)] group-hover:text-white">
                <Phone className="h-4 w-4" />
              </span>
              <span className="hidden whitespace-nowrap sm:inline">{PHONE_DISPLAY}</span>
            </a>

            <a
              href="/"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--e-green)] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[var(--e-green-deep)] sm:px-6 sm:text-[0.88rem]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sm:hidden">Home</span>
              <span className="hidden sm:inline">Back to Home</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
