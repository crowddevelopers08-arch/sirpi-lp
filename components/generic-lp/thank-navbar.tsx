'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMG } from "@/components/generic-lp/images";
import { PHONE_TEL } from "@/components/elite-minima/config";

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`;

export default function Navbared() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#A52D5B]/15 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF8FA]/90 shadow-[0_18px_50px_rgba(31,10,20,0.12)] backdrop-blur-xl"
          : "bg-[#FFF8FA]/75 backdrop-blur-md"
      }`}
    >
      {/* Grain effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: GRAIN,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Top gradient line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ED575C] to-transparent opacity-60"
      />

      {/* Main container */}
      <div className="relative mx-auto flex min-h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/general" className="flex items-center" aria-label="Sirpi Aesthetics home">
          <Image src={IMG.logo} alt="Sirpi Aesthetics" width={1029} height={402} priority className="h-11 w-auto rounded-lg sm:h-12" />
        </Link>

        {/* CTA Button */}
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex h-11 items-center justify-between gap-3 rounded-full bg-[#6A113D] pl-5 pr-[5px] text-[13px] font-bold text-white no-underline shadow-[0_8px_22px_rgba(106,17,61,0.25)] transition hover:bg-[#571032]"
        >
          <span className="whitespace-nowrap">Call Now</span>
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#ED575C]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
            </svg>
          </span>
        </a>

      </div>
    </header>
  );
}