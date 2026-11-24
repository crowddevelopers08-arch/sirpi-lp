"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { BRAND_FULL, PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";
import { track } from "@/components/elite-minima/track";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

/*
  Rhinoplasty landing — header + hero with enquiry form.
  Layout replicates the reference: logo left / two pill buttons right; below,
  title, location pill, BEFORE / AFTER circles with tab labels, a stats line,
  and the enquiry card on the right. Colours, images and logo are Sirpi's.
*/

/* Sirpi palette */
const C = {
  brand: "#6A113D", // burgundy — pills, tabs, circle rings, headings
  brandDark: "#571032",
  accent: "#ED575C", // coral — the enquire button
  accentDark: "#D9474C",
  ground: "#F9E8EF", // blush — hero background (the reference's sand)
  card: "#FFF8FA", // bone — form card
  ink: "#1f0a14",
};

/* The rhinoplasty result card is one combined before/after image; Cloudinary
   crops each half to a square around the nose. */
const CLD = "https://res.cloudinary.com/ncyhumsk/image/upload";
const crop = (x: number) => `${CLD}/c_crop,x_${x},y_305,w_526,h_526/f_auto,q_auto,w_700/v1794999358/rhinoplasty.jpg`;
const BEFORE = crop(12);
const AFTER = crop(544);

const AGE_GROUPS = ["Below 18", "18 – 25", "26 – 35", "36 – 45", "46 and above"];
const STATS = ["200+ Clients", "500+ Surgeries", "4.9 Rating on Google"];
const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Before & After", href: "#before-after" },
  { label: "Why Sirpi", href: "#why-sirpi" },
  { label: "Enquire", href: "#enquire" },
];

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
  </svg>
);

/* ── Wavy-circle before / after ──────────────────────────────────────────
   Drawn in one SVG per photo (viewBox 300 × 300, centre 150,150):
     • the photo, clipped to a circle (r 112)
     • two wavy rings around it — a bold one in the label colour and a thin
       coral/burgundy one just outside, turning slowly in opposite directions
     • the label on a curved ribbon that follows the bottom of the ring, so the
       text reads as part of the circle
   ────────────────────────────────────────────────────────────────────────── */

/** Closed wavy circle: radius r, wave height amp, `waves` bumps around. */
function wavyRing(r: number, amp: number, waves: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 360; i += 2) {
    const t = (i * Math.PI) / 180;
    const rr = r + amp * Math.sin(waves * t);
    pts.push(`${(150 + rr * Math.cos(t)).toFixed(2)},${(150 + rr * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
const WAVE_R = 141; // the wave line's radius — the label ribbon sits right on it
const RING_OUTER = wavyRing(WAVE_R, 3.5, 22);

/** Arc centred over the top of the circle (centre 150,150), radius r, `len` units long, left → right. */
function topArc(len: number, r = WAVE_R) {
  const half = len / 2 / r;
  const dx = r * Math.sin(half);
  const y = (150 - r * Math.cos(half)).toFixed(1);
  return `M ${(150 - dx).toFixed(1)} ${y} A ${r} ${r} 0 0 1 ${(150 + dx).toFixed(1)} ${y}`;
}

function WaveCircle({ id, label, src, alt, tone }: { id: string; label: string; src: string; alt: string; tone: string; ring2?: string; spin?: 1 | -1 }) {
  // ribbon hugs the label: ~13 units per letter + side padding (the round caps add 15 each end)
  return (
    <figure className="m-0">
      <svg viewBox="0 0 300 300" role="img" aria-label={alt} className="block h-auto w-[min(39vw,180px)] sm:w-[300px] [overflow:visible] lg:w-auto lg:h-[min(17.2vw,37.6svh)]">
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle cx="150" cy="150" r="126" />
          </clipPath>
          {/* arc along the top of the wave line, left → right, for the label text */}
        </defs>

        {/* soft disc behind the photo */}
        <circle cx="150" cy="150" r="140" fill="#FFF8FA" stroke={tone} strokeOpacity="0.18" strokeWidth="2" />
        <circle cx="150" cy="150" r="132" fill="none" stroke={tone} strokeWidth="3" />
        <image href={src} x="24" y="24" width="252" height="252" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id}-clip)`} />

        {/* wavy ring (static) */}
        <rect x="91" y="8" width="118" height="34" rx="17" fill={tone} />
        <text x="150" y="30" fill="#fff" fontSize="15" fontWeight="900" letterSpacing="1.8" textAnchor="middle">
          {label.toUpperCase()}
        </text>
      </svg>
    </figure>
  );
}

/** Before → After: two wavy circles with an arrow between them. */
function BeforeAfterPair() {
  return (
    <div className="relative inline-flex items-center gap-2 sm:gap-4 lg:gap-[min(0.53vw,1.16svh)]">
      <WaveCircle id="rh-before" label="Before" tone={C.brand} ring2={C.accent} spin={1} src={BEFORE} alt="Nose profile before rhinoplasty at Sirpi Aesthetics" />
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white sm:h-11 sm:w-11 lg:h-[min(2.42vw,5.32svh)] lg:w-[min(2.42vw,5.32svh)]"
        style={{ backgroundColor: C.accent }}
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 fill-none stroke-current stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <WaveCircle id="rh-after" label="After" tone={C.accent} ring2={C.brand} spin={-1} src={AFTER} alt="Nose profile after rhinoplasty at Sirpi Aesthetics" />
    </div>
  );
}

export default function RhinoplastyHero() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", age: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [activeNav, setActiveNav] = useState(NAV_LINKS[0].href);

  // The global Lenis anchor handler can miscalculate an element that sits in
  // this responsive hero grid. Handle only `#enquire` links here, in capture
  // phase, so every rhinoplasty CTA lands directly at the form on any screen.
  useEffect(() => {
    const scrollToEnquiry = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href="#enquire"]');
      const target = document.getElementById("enquire");
      if (!anchor || !target) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      const headerHeight = document.querySelector("#top > header")?.getBoundingClientRect().height ?? 0;
      const destination = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 16);
      window.history.pushState(null, "", "#enquire");
      window.scrollTo({ top: destination, behavior: "smooth" });
    };

    document.addEventListener("click", scrollToEnquiry, true);
    return () => document.removeEventListener("click", scrollToEnquiry, true);
  }, []);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: k === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (values.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return setError("Please enter a valid email address.");
    if (!/^[6-9]\d{9}$/.test(values.phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!values.age) return setError("Please select your age group.");
    setError("");
    setSaving(true);
    try {
      // /api/submissions → Google Sheet ("Website Leads" tab) + TeleCRM
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "rhinoplasty forms",
          formName: "rhinoplasty-leads",
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone,
          concern: `Rhinoplasty enquiry | Age group: ${values.age}`,
          pageUrl: window.location.href,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !data?.success) throw new Error();
      track("lead_submit", { branch: "Sirpi Aesthetics — Rhinoplasty" });
      setDone(true);
      window.location.assign("/rhinoplasty/thank-you");
    } catch {
      setError(`That didn't go through. Please try again or call ${PHONE_DISPLAY}.`);
    } finally {
      setSaving(false);
    }
  }

  const label = "mb-1.5 block text-[17px] font-bold text-[#5b4450] sm:text-[18px] lg:mb-[min(0.32vw,0.69svh)] lg:text-[max(13px,min(0.95vw,2.08svh))]";
  const field =
    "h-11 w-full rounded-full border border-[#E8C5D3] bg-white px-5 text-[15px] text-[#1f0a14] outline-none transition focus:border-[#6A113D] lg:h-[min(2.31vw,5.09svh)]";

  return (
    <div className="font-[family-name:var(--font-lato)]">
      {/* ───────────── header ───────────── */}
      <header className="border-b border-[#F1DCE5] bg-white">
        <div className="flex items-center justify-between gap-3 px-4 py-3 max-[380px]:gap-2 max-[380px]:px-3 max-[380px]:py-2 sm:px-8 lg:h-[min(5.47vw,12.02svh)] lg:gap-[min(1.89vw,4.16svh)] lg:py-0 lg:px-[7%] xl:px-[11%]">
          <a href="/rhinoplasty" aria-label={`${BRAND_FULL} home`} className="shrink-0">
            <Image src={CLOUDINARY_IMAGES.logo} alt={BRAND_FULL} width={1029} height={402} priority className="h-12 w-auto rounded-lg max-[380px]:h-10 sm:h-16 lg:h-[min(3.79vw,8.32svh)]" />
          </a>

          {/* nav links (desktop): soft pink pill tray, the active link filled burgundy */}
          <nav aria-label="Page sections" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-[min(0.21vw,0.46svh)] rounded-full border border-[#F1DCE5] bg-[#FBF0F5] p-[min(0.26vw,0.58svh)]">
              {NAV_LINKS.map((l) => {
                const on = activeNav === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setActiveNav(l.href)}
                      aria-current={on ? "true" : undefined}
                      className={`inline-flex items-center rounded-full px-[min(1.05vw,2.31svh)] py-[min(0.47vw,1.04svh)] text-[max(14px,min(0.95vw,2.08svh))] font-semibold whitespace-nowrap transition-colors ${
                        on ? "text-white shadow-sm" : "text-[#4a2a3a] hover:bg-white hover:text-[#6A113D]"
                      }`}
                      style={on ? { backgroundColor: C.brand } : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-[min(0.84vw,1.85svh)]">
            <a
              href="#enquire"
              className="hidden h-11 items-center rounded-full px-6 text-[17px] font-semibold whitespace-nowrap text-white transition hover:opacity-90 sm:inline-flex lg:h-[min(2.52vw,5.55svh)] lg:px-[min(1.26vw,2.77svh)] lg:text-[max(14px,min(1.0vw,2.2svh))]"
              style={{ backgroundColor: C.brand }}
            >
              Book Appointment
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => track("call_click", { section: "rhinoplasty-header" })}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[15px] font-semibold whitespace-nowrap text-white transition hover:opacity-90 max-[380px]:h-9 max-[380px]:gap-1.5 max-[380px]:px-3 max-[380px]:text-[13px] sm:h-11 sm:px-6 sm:text-[17px] lg:h-[min(2.52vw,5.55svh)] lg:px-[min(1.26vw,2.77svh)] lg:text-[max(14px,min(1.0vw,2.2svh))]"
              style={{ backgroundColor: C.brand }}
            >
              <PhoneIcon className="h-[17px] w-[17px] lg:h-[min(1.0vw,2.2svh)] lg:w-[min(1.0vw,2.2svh)]" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      {/* ───────────── hero ───────────── */}
      <section className="relative isolate overflow-hidden lg:flex lg:min-h-[calc(100svh-min(5.47vw,12.02svh)-1px)] lg:items-center" style={{ backgroundColor: C.ground }}>
        {/* background decoration: soft solid shapes, dot patches and a faint wave — behind everything, never clickable */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* big soft discs */}
          <span className="absolute -top-[22%] -left-[10%] aspect-square w-[46vw] max-w-[760px] rounded-full bg-white/45" />
          <span className="absolute -right-[8%] -bottom-[30%] aspect-square w-[40vw] max-w-[660px] rounded-full" style={{ backgroundColor: "rgba(237,87,92,0.07)" }} />
          {/* thin rings */}
          <span className="absolute top-[8%] left-[44%] aspect-square w-[9vw] max-w-[160px] rounded-full border-2" style={{ borderColor: "rgba(106,17,61,0.10)" }} />
          <span className="absolute bottom-[10%] left-[3%] aspect-square w-[5vw] max-w-[90px] rounded-full border-2" style={{ borderColor: "rgba(237,87,92,0.18)" }} />
          {/* dot patches */}
          <svg className="absolute top-[6%] right-[3%] h-[120px] w-[160px] max-lg:hidden">
            <defs>
              <pattern id="rh-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="rgba(106,17,61,0.16)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rh-dots)" />
          </svg>
          <svg className="absolute bottom-[6%] left-[40%] h-[96px] w-[128px]">
            <rect width="100%" height="100%" fill="url(#rh-dots)" />
          </svg>
          {/* faint wave along the bottom, echoing the wavy circles */}
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute bottom-[3%] left-0 h-[40px] w-full">
            <path d="M0 30 Q 50 6 100 30 T 200 30 T 300 30 T 400 30 T 500 30 T 600 30 T 700 30 T 800 30 T 900 30 T 1000 30 T 1100 30 T 1200 30" fill="none" stroke="rgba(106,17,61,0.08)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="relative grid w-full grid-cols-[minmax(0,1fr)] gap-8 px-4 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_min(27.35vw,60.12svh)] lg:items-center lg:gap-5 lg:py-[min(1.58vw,3.47svh)] lg:px-[7%] xl:px-[11%]">
          {/* left: title, location, results, stats */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            {/* headline: plays in on page entry — the two questions rise in, then a coral swoosh draws under the key words */}
            <style>{`
              @keyframes rh-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
              @keyframes rh-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
              .rh-rise { opacity: 0; animation: rh-rise .7s cubic-bezier(.2,.7,.2,1) forwards; }
              .rh-draw { transform-origin: left center; transform: scaleX(0); animation: rh-draw .8s ease-out 1s forwards; }
              @media (prefers-reduced-motion: reduce) { .rh-rise { animation: none; opacity: 1; } .rh-draw { animation: none; transform: none; } }
            `}</style>
            <h1 className="text-[26px] leading-[1.22] sm:text-[32px] lg:text-[min(1.89vw,4.16svh)]">
              <span className="rh-rise block font-extrabold" style={{ color: C.brand, animationDelay: ".15s" }}>
                Unga mooku konaiyaa irukkaa?
              </span>
              <span className="rh-rise mt-1 block font-bold text-[#3d2230] lg:mt-[min(0.21vw,0.46svh)]" style={{ animationDelay: ".4s" }}>
                Illa, unga mooku dhaan unga face-laye periya{" "}
                <span className="relative inline-block font-extrabold whitespace-nowrap" style={{ color: C.accent }}>
                  insecurity-aa irukkaa?
                  {/* hand-drawn swoosh under the words */}
                  <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="rh-draw absolute -bottom-[0.28em] left-0 h-[0.32em] w-full overflow-visible">
                    <path d="M3 8 C 50 2, 120 2, 197 7" fill="none" stroke={C.accent} strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="mt-3 max-w-[720px] lg:max-w-[90%] text-[15px] leading-[1.55] text-[#5b4450] sm:text-[17px] lg:mt-[min(0.63vw,1.39svh)] lg:text-[max(13px,min(0.95vw,2.08svh))]">
              If you are concerned about your nose shape, size, profile or overall facial proportion, rhinoplasty may be an option worth discussing.
            </p>

            <p
              className="mt-6 inline-flex max-w-full items-center justify-center gap-x-2 rounded-full px-4 py-1.5 font-serif text-[15px] leading-[1.35] whitespace-nowrap text-white min-[400px]:text-[16px] sm:mt-11 sm:gap-x-3 sm:px-16 sm:text-[28px] lg:mt-[min(1.26vw,2.77svh)] lg:px-[min(3.37vw,7.40svh)] lg:py-[min(0.21vw,0.46svh)] lg:text-[min(1.47vw,3.24svh)]"
              style={{ backgroundColor: C.brand }}
            >
              <span>Location : Coimbatore</span>
            </p>

            <div id="results" className="mt-8 flex w-full scroll-mt-4 justify-center sm:mt-11 lg:justify-start lg:mt-[min(1.26vw,2.77svh)] ">
              <BeforeAfterPair />
            </div>

            <p id="why-sirpi" className="mt-6 flex scroll-mt-4 flex-col items-center justify-center gap-x-2 text-[17px] font-bold leading-[1.5] sm:mt-9 sm:flex-row sm:flex-wrap lg:justify-start sm:text-[22px] lg:mt-[min(1.05vw,2.31svh)] lg:text-[min(1.26vw,2.77svh)]" style={{ color: C.brand }}>
              {STATS.map((s, i) => (
                <span key={s} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="max-sm:hidden">|</span>}
                  {s}
                  {i === STATS.length - 1 && (
                    <span aria-label="5 star rating" className="ml-1 tracking-[0.05em]" style={{ color: "#F4B400" }}>
                      ★★★★★
                    </span>
                  )}
                </span>
              ))}
            </p>
            {/* <p className="mt-2 text-[12px] text-[#8a6a78] lg:mt-[min(0.21vw,0.46svh)]">Individual results vary.</p> */}
          </div>

          {/* right: enquiry card */}
          <div
            id="enquire"
            className="scroll-mt-24 rounded-[14px] border border-[#E8C5D3] px-6 pt-7 pb-6 sm:px-8 lg:scroll-mt-[120px] lg:px-[min(1.47vw,3.24svh)] lg:pt-[min(1.37vw,3.01svh)] lg:pb-[min(1.16vw,2.54svh)]"
            style={{ backgroundColor: C.card }}
          >
            {done ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full text-white" style={{ backgroundColor: C.brand }}>
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                </span>
                <h2 className="mt-5 text-[26px] font-bold" style={{ color: C.brand }}>Thank you, {values.name.trim()}!</h2>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#5b4450]">
                  We&rsquo;ve received your details. Our team will call you on <b className="text-[#1f0a14]">{values.phone}</b> shortly.
                </p>
              </div>
            ) : (
              <form id="top" onSubmit={submit} noValidate>
                <h2 className="px-1 text-[22px] leading-[1.3] font-bold sm:text-[26px] lg:text-[min(1.32vw,2.89svh)]" style={{ color: C.brand }}>
                  Looking for an Experienced Plastic Surgeon for Nose Reshape Surgery?
                </h2>
                <p className="mt-3 px-1 text-[14px] text-[#5b4450] sm:text-[15px] lg:mt-[min(1.05vw,2.31svh)] lg:text-[max(12px,min(0.79vw,1.73svh))]">Submit your details. We&rsquo;ll call you right back!</p>

                <div className="mt-5 space-y-[18px] px-1 lg:mt-[min(0.84vw,1.85svh)] lg:space-y-[min(0.74vw,1.62svh)]">
                  <label className="block">
                    <span className={label}>Name *</span>
                    <input className={field} type="text" autoComplete="name" value={values.name} onChange={set("name")} />
                  </label>
                  <label className="block">
                    <span className={label}>Email *</span>
                    <input className={field} type="email" autoComplete="email" value={values.email} onChange={set("email")} />
                  </label>
                  <label className="block">
                    <span className={label}>Phone Number *</span>
                    <input className={field} type="tel" inputMode="numeric" autoComplete="tel-national" value={values.phone} onChange={set("phone")} />
                  </label>
                  <label className="block">
                    <span className={label}>Age *</span>
                    <select
                      className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#E8C5D3] bg-white bg-[length:14px] bg-[right_18px_center] bg-no-repeat px-5 pr-11 text-[15px] text-[#1f0a14] outline-none transition focus:border-[#6A113D] lg:h-[min(2.31vw,5.09svh)]"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236A113D%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E\")" }}
                      value={values.age}
                      onChange={set("age")}
                    >
                      <option value="">Select an Age Group</option>
                      {AGE_GROUPS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {error && <p className="mt-4 px-1 text-[13px] font-medium text-[#A52D5B]" role="alert">{error}</p>}

                <button
                  type="submit"
                  disabled={saving}
                  className="mx-1 mt-9 h-[48px] w-[calc(100%-0.5rem)] cursor-pointer rounded-full text-[19px] font-bold lg:mt-[min(1.26vw,2.77svh)] lg:h-[min(2.52vw,5.55svh)] lg:text-[min(1.00vw,2.20svh)] text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
                  style={{ backgroundColor: C.accent }}
                >
                  {saving ? "Submitting…" : "Enquire Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
