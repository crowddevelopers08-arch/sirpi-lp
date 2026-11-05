"use client";

import BrandLogo, { RevealStyles } from "./BrandLogo";
import FloatingBackground from "./FloatingBackground";
import { revealDelay } from "./reveal";
import { ADDRESS_FULL, ADDRESS_SHORT, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../config";

const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`Sirpi Aesthetics, ${ADDRESS_FULL}`)}&output=embed`;

export type ThankYouVariant = "booked" | "outstation" | "closed";

export default function ThankYouScreen({ name, phone, variant, onHome }: { name: string; phone: string; variant: ThankYouVariant; onHome: () => void }) {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#FFF8FA] px-[7vw] py-24 text-center text-[#1f0a14] font-[family-name:var(--font-space-grotesk)]">
      <RevealStyles />
        <FloatingBackground />
      <BrandLogo />
      <div className="w-full max-w-[560px]">
        <h1 className="reveal-in text-[clamp(28px,4vw,48px)] leading-[1.15] font-bold text-[#6A113D]" style={revealDelay(0)}>
          Thank you{name ? `, ${name}` : ""}!
        </h1>
        <p className="reveal-in mt-[clamp(10px,2svh,18px)] text-[clamp(15px,1.6vw,22px)] leading-[1.4] text-[#1f0a14]/80" style={revealDelay(1)}>
          {variant === "booked" ? (
            <>Our team will call you{phone ? <> on <b className="font-semibold text-[#1f0a14]">{phone}</b></> : ""} at your preferred time to discuss your hair transplant consultation with Dr. Srigireesh.</>
          ) : variant === "outstation" ? (
            <>We’ve noted your details{phone ? <> (<b className="font-semibold text-[#1f0a14]">{phone}</b>)</> : ""}. Our team will share information about hair transplant treatment at Sirpi Aesthetics, Coimbatore, for your future consideration.</>
          ) : (
            "Thank you for your time. If you change your mind, we’re just a call away."
          )}
        </p>
        <p className="reveal-in mt-[clamp(22px,4svh,36px)] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[clamp(13px,1.15vw,17px)] text-[#1f0a14]/70" style={revealDelay(2)}>
          <span>Phone: <a className="text-[#6A113D] hover:underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></span>
          <span className="text-[#1f0a14]/20" aria-hidden="true">|</span>
          <span>Email: <a className="text-[#6A113D] hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
        </p>
        <p className="reveal-in mt-[clamp(24px,4svh,36px)] text-[clamp(13px,1.1vw,16px)] font-semibold text-[#1f0a14]" style={revealDelay(3)}>
          Sirpi Aesthetics — {ADDRESS_SHORT}
        </p>
        <div className="reveal-in mt-[clamp(12px,2svh,18px)] h-[clamp(190px,32svh,300px)] w-full overflow-hidden rounded-xl border border-[#1f0a14]/10 bg-white" style={revealDelay(4)}>
          <iframe className="h-full w-full border-0" src={mapUrl} title="Map of Sirpi Aesthetics, Peelamedu, Coimbatore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <button type="button" onClick={onHome} className="reveal-in mt-[clamp(20px,3.5svh,32px)] inline-flex h-[46px] cursor-pointer items-center gap-2 rounded-lg border-0 bg-[#6A113D] px-6 text-lg font-bold text-white hover:bg-[#571032] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f0a14]" style={revealDelay(5)}>
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 9.5V20h13V9.5" /></svg>
          Back to home
        </button>
      </div>
    </main>
  );
}
