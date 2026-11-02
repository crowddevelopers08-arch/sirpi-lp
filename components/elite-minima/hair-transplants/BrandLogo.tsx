import Image from "next/image";
import { BRAND_FULL, PHONE_DISPLAY, PHONE_TEL } from "../config";
import { track } from "../track";

/** Header bar: Sirpi logo on its own burgundy ground, call button on the right. */
export default function BrandLogo() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-[#6A113D] px-4 py-2 sm:px-25">
      <Image src="/CIRCLE-STICKER-LOGO.png" alt={BRAND_FULL} width={1029} height={402} priority className="h-[clamp(40px,7svh,56px)] w-auto" />
      <a
        href={`tel:${PHONE_TEL}`}
        onClick={() => track("call_click", { section: "hair-transplant-form" })}
        className="flex h-[clamp(38px,5.5svh,46px)] shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[clamp(13px,1.1vw,16px)] font-semibold text-[#6A113D] transition-colors hover:bg-[#FFF8FA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:w-[clamp(38px,5.5svh,46px)] max-sm:justify-center max-sm:px-0"
        aria-label={`Call Sirpi Aesthetics on ${PHONE_DISPLAY}`}
      >
        <svg viewBox="0 0 24 24" className="size-[18px] shrink-0 fill-current" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
        <span className="max-sm:sr-only">{PHONE_DISPLAY}</span>
      </a>
    </header>
  );
}

/**
 * Fade-up reveal used by every screen. Defined here rather than in
 * globals.css so this form carries its own styles.
 */
export function RevealStyles() {
  return (
    <style>{`
      @keyframes ht-reveal { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      .reveal-in { opacity: 0; animation: ht-reveal .55s cubic-bezier(.16,1,.3,1) forwards; }
      @media (prefers-reduced-motion: reduce) { .reveal-in { opacity: 1; animation: none; } }
    `}</style>
  );
}
