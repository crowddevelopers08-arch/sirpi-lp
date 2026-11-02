"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND_FULL } from "../config";

/*
  Intro shown over the hair transplant form when the page opens.

    "Welcome" → three short phrases, one after another → the Sirpi logo
    → the whole screen fades away to the form underneath.

  The form is already rendered beneath it, so nothing waits on this screen —
  it only covers the first few seconds. A thin coral bar along the bottom
  shows how far through it is. Visitors who ask for reduced motion get the
  logo alone, briefly, with no word sequence.
*/

const WORDS = ["Welcome", "Hair Restoration", "Natural Results", "Renewed Confidence"];

/** How long each word stays up, then the logo, then the fade-out (ms). */
const WORD_MS = 650;
const LOGO_MS = 1100;
const FADE_MS = 600;

export default function IntroLoader() {
  // -1 = nothing yet, 0..WORDS.length-1 = that word, WORDS.length = the logo
  const [stage, setStage] = useState(-1);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    if (isReduced) {
      setStage(WORDS.length);
      at(700, () => setLeaving(true));
      at(700 + FADE_MS, () => setDone(true));
    } else {
      WORDS.forEach((_, i) => at(120 + i * WORD_MS, () => setStage(i)));
      const logoAt = 120 + WORDS.length * WORD_MS;
      at(logoAt, () => setStage(WORDS.length));
      at(logoAt + LOGO_MS, () => setLeaving(true));
      at(logoAt + LOGO_MS + FADE_MS, () => setDone(true));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (done) return null;

  const total = 120 + WORDS.length * WORD_MS + LOGO_MS;
  const showLogo = stage === WORDS.length;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Sirpi Aesthetics"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#6A113D] px-6 text-center text-white"
      style={{ opacity: leaving ? 0 : 1, transition: `opacity ${FADE_MS}ms ease`, pointerEvents: leaving ? "none" : "auto" }}
    >
      <style>{`
        @keyframes ht-word { 0% { opacity: 0; transform: translateY(18px); filter: blur(6px); }
                             18%, 78% { opacity: 1; transform: none; filter: none; }
                             100% { opacity: 0; transform: translateY(-14px); filter: blur(4px); } }
        @keyframes ht-logo { from { opacity: 0; transform: scale(.86); } to { opacity: 1; transform: none; } }
        @keyframes ht-bar  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ht-word { animation: ht-word ${WORD_MS}ms cubic-bezier(.16,1,.3,1) both; }
        .ht-logo { animation: ht-logo 700ms cubic-bezier(.16,1,.3,1) both; }
      `}</style>

      {/* soft coral glow behind the words */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
        style={{ background: "radial-gradient(circle, #ED575C 0%, transparent 70%)" }}
      />

      <div className="relative flex min-h-[120px] items-center justify-center">
        {showLogo ? (
          <div className="ht-logo flex flex-col items-center">
            <Image src="/CIRCLE-STICKER-LOGO.png" alt={BRAND_FULL} width={1029} height={402} priority className="h-[clamp(72px,14vw,130px)] w-auto" />
            <p className="mt-4 text-[clamp(11px,1.2vw,14px)] font-semibold uppercase tracking-[0.32em] text-white/75">
              Aesthetics · Coimbatore
            </p>
          </div>
        ) : stage >= 0 ? (
          <p
            key={stage}
            className={`ht-word font-bold leading-[1.05] tracking-[-0.02em] ${
              stage === 0 ? "text-[clamp(44px,9vw,112px)]" : "text-[clamp(30px,6vw,76px)] text-white/90"
            }`}
          >
            {WORDS[stage]}
          </p>
        ) : null}
      </div>

      {!reduced && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#ED575C]"
          style={{ animation: `ht-bar ${total}ms linear both` }}
        />
      )}
    </div>
  );
}
