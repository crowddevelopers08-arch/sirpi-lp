'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMG } from "@/components/generic-lp/images";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Treatments", href: "#treatments" },
  { label: "Results", href: "#results" },
  { label: "Doctor", href: "#specialists" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          ? "bg-[#FFF8FA]/95  backdrop-blur-xl"
          : "bg-[#FFF8FA]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ED575C] to-transparent opacity-60"
      />

      <div className="relative mx-auto flex min-h-[82px] max-w-7xl items-center justify-between gap-4 py-2 px-4 sm:px-6 lg:px-8">
        <Link href="/general" className="flex shrink-0 items-center" aria-label="Sirpi Aesthetics home">
          <Image
            src={IMG.logo}
            alt="Sirpi Aesthetics"
            width={1029}
            height={402}
            priority
            className="h-12 w-auto rounded-lg sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#6A113D]/12 bg-white/70 px-2 py-2 lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeLink === label;
            return (
              <a
                key={label}
                href={href}
                onClick={() => setActiveLink(label)}
                className={`rounded-full px-5 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  isActive ? "bg-[#F9E8EF] text-[#A52D5B]" : "text-[#5b4450] hover:bg-[#FFF8FA] hover:text-[#6A113D]"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <a
            href="#contact"
            className="flex h-[52px] items-center justify-between gap-5 rounded-full bg-[#6A113D] pl-7 pr-[7px] text-[15px] font-bold text-white transition hover:brightness-110"
          >
            <span className="whitespace-nowrap">Book Now</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#571032]">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>

        <a
          href="#contact"
          className="flex h-11 items-center justify-between gap-3 rounded-full bg-[#6A113D] pl-5 pr-[5px] text-[13px] font-bold text-white max-[411px]:hidden lg:hidden"
        >
          <span className="whitespace-nowrap">Book Now</span>
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#571032]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>

        {/* <=411px: menu toggle (div role=button, not <button>, so the global button:hover rule doesn't repaint it) */}
        <div
          role="button"
          tabIndex={0}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setMenuOpen((o) => !o)}
          className="hidden h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-[#6A113D]/25 bg-white text-[#6A113D] outline-none max-[411px]:grid"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </div>
      </div>

      <nav className="relative flex items-center justify-center gap-2 border-t border-[#6A113D]/10 px-4 py-2 max-[411px]:hidden lg:hidden">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = activeLink === label;
          return (
            <a
              key={label}
              href={href}
              onClick={() => setActiveLink(label)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
                isActive ? "bg-[#F9E8EF] text-[#A52D5B]" : "text-[#5b4450]"
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {/* <=411px dropdown: links + Book Now */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-[#6A113D]/10 bg-[#FFF8FA] transition-all duration-300 min-[412px]:hidden ${
          menuOpen ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-4 py-4">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeLink === label;
            return (
              <a
                key={label}
                href={href}
                onClick={() => {
                  setActiveLink(label);
                  setMenuOpen(false);
                }}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] ${
                  isActive ? "bg-[#F9E8EF] text-[#A52D5B]" : "bg-white text-[#5b4450]"
                }`}
              >
                <span>{label}</span>
                <span className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-[#ED575C]" : "bg-[#6A113D]/35"}`} />
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 flex h-12 items-center justify-between rounded-full bg-[#6A113D] pl-6 pr-[6px] text-[14px] font-bold text-white"
          >
            <span className="whitespace-nowrap">Book Now</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#571032]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
