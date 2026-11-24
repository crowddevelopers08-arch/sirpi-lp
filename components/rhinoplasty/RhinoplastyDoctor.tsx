"use client";

import Image from "next/image";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";
import { track } from "@/components/elite-minima/track";
import { CEA_REGISTRATION, DOCTOR_EXPERIENCE } from "@/components/elite-minima/hair-transplants/form-content";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

/*
  Rhinoplasty landing — doctor section (after Before & After).
  Same build as the hair-transplant doctor message screen: the surgeon's
  portrait with a caption band, a short message, the two experience figures
  and the CEA registration — with the message written for rhinoplasty and
  the hair form's "Continue" swapped for this page's CTAs (form + call).
*/

/* Sirpi palette (same as the hero) */
const C = {
  brand: "#6A113D",
  accent: "#ED575C",
  ground: "#F9E8EF",
  ink: "#1f0a14",
};

const MESSAGE = [
  "Every nose is different — its shape, size, profile and how it balances with the rest of your face.",
  "At Sirpi Aesthetics, Dr. Srigireesh, a certified Plastic Surgeon, assesses your nose and facial proportions before discussing the approach that may suit you, rather than offering a standard package.",
];
const MESSAGE_CLOSE = "Would you like to discuss your nose concerns with our expert?";

export default function RhinoplastyDoctor() {
  return (
    <section id="doctor" className="scroll-mt-4 font-[family-name:var(--font-lato)]" style={{ backgroundColor: C.ground }}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)] items-center gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        {/* portrait + caption band */}
        <figure className="m-0 mx-auto hidden w-full max-w-[380px] flex-col overflow-hidden rounded-[18px] border border-[#1f0a14]/10 bg-white lg:flex">
          <div className="relative aspect-[4/5]">
            <Image
              src={CLOUDINARY_IMAGES.doctorSuit}
              alt="Dr. Srigireesh A R, Plastic Surgeon at Sirpi Aesthetics"
              fill
              className="object-cover object-top"
              sizes="(min-width:1024px) 380px, 90vw"
            />
          </div>
          <figcaption className="px-3 py-3 text-center text-[14px] font-semibold text-white sm:text-[15px]" style={{ backgroundColor: C.brand }}>
            Dr. Srigireesh A R — Certified Plastic Surgeon
          </figcaption>
        </figure>

        {/* message */}
        <div className="min-w-0 text-center lg:text-left">
          <span
            className="inline-block rounded-full bg-white px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] uppercase sm:text-[13px]"
            style={{ color: C.brand }}
          >
            Meet Your Surgeon
          </span>
          <h2 className="mt-2 text-[26px] leading-[1.2] font-extrabold sm:text-[34px]" style={{ color: C.brand }}>
            Dr. Srigireesh A R
          </h2>

          <div className="relative mt-4 flex flex-col gap-3 text-[15px] leading-[1.6] text-[#1f0a14]/85 sm:text-[17px] lg:pl-7">
            <span aria-hidden className="absolute top-0 left-0 hidden font-serif text-[34px] leading-none lg:block" style={{ color: C.brand }}>
              &ldquo;
            </span>
            {MESSAGE.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Mobile flow: introduction first, then the surgeon portrait. */}
          <figure className="m-0 mx-auto mt-6 flex w-full max-w-[380px] flex-col overflow-hidden rounded-[18px] border border-[#1f0a14]/10 bg-white lg:hidden">
            <div className="relative aspect-[4/5]">
              <Image
                src={CLOUDINARY_IMAGES.doctorSuit}
                alt="Dr. Srigireesh A R, Plastic Surgeon at Sirpi Aesthetics"
                fill
                className="object-cover object-top"
                sizes="90vw"
              />
            </div>
            <figcaption className="px-3 py-3 text-center text-[14px] font-semibold text-white sm:text-[15px]" style={{ backgroundColor: C.brand }}>
              Dr. Srigireesh A R â€” Certified Plastic Surgeon
            </figcaption>
          </figure>

          {/* the surgeon's experience, as two figures */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-left lg:pl-7">
            {DOCTOR_EXPERIENCE.map((item) => (
              <div key={item.label} className="rounded-xl border-l-4 px-4 py-3 text-white" style={{ backgroundColor: C.brand, borderColor: C.accent }}>
                <p className="text-[22px] leading-none font-bold sm:text-[26px]">{item.value}</p>
                <p className="mt-1.5 text-[12px] leading-[1.3] font-medium text-white/90 sm:text-[14px]">{item.label}</p>
              </div>
            ))}
          </div>

          {/* clinic registration, as a verifiable credential */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#6A113D]/20 bg-white px-4 py-3 text-left lg:ml-7">
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: C.brand }}>
              <svg viewBox="0 0 24 24" className="h-[55%] w-[55%] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
                <path d="m8.8 12.2 2.3 2.3 4.4-4.6" />
              </svg>
            </span>
            <p className="min-w-0 leading-[1.3]">
              <span className="block text-[12px] font-medium text-[#1f0a14]/70 sm:text-[13px]">{CEA_REGISTRATION.label}</span>
              <span className="mt-0.5 block text-[15px] font-bold tracking-[0.06em] break-all sm:text-[17px]" style={{ color: C.brand }}>
                {CEA_REGISTRATION.number}
              </span>
            </p>
          </div>

          <p className="mt-5 text-[16px] font-semibold sm:text-[18px] lg:pl-7" style={{ color: C.ink }}>
            {MESSAGE_CLOSE}
          </p>

          {/* CTAs: to the enquiry form, and call */}
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:pl-7">
            <a
              href="#enquire"
              className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-full px-8 text-[16px] font-bold text-white transition hover:brightness-95 sm:w-auto"
              style={{ backgroundColor: C.accent }}
            >
              Book Your Consultation
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => track("call_click", { section: "rhinoplasty-doctor" })}
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
      </div>
    </section>
  );
}
