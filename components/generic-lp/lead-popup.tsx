"use client";

import { useCallback, useEffect, useState } from "react";
import { track } from "@/components/elite-minima/track";


type Values = { name: string; phone: string; city: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", city: "" };

const Icon = {
  user: <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5Z" />,
  phone: (
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
  ),
  pin: <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />,
};

function Field({
  label,
  icon,
  error,
  prefix,
  ...input
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  prefix?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b4f5c]">{label}</span>
      <span
        className={`relative flex h-[52px] items-center rounded-2xl border bg-[#FFF8FA] transition focus-within:bg-white focus-within:ring-2 ${
          error ? "border-[#ED575C] focus-within:ring-[#ED575C]/30" : "border-[#6A113D]/20 focus-within:border-[#6A113D] focus-within:ring-[#6A113D]/25"
        }`}
      >
        <svg viewBox="0 0 24 24" className="ml-4 h-[18px] w-[18px] shrink-0 text-[#6A113D]" fill="currentColor" aria-hidden>
          {icon}
        </svg>
        {prefix && <span className="ml-3 border-r border-[#6A113D]/20 pr-3 text-[15px] font-medium text-[#5b4450]">{prefix}</span>}
        <input
          {...input}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[15px] font-medium text-[#1f0a14] outline-none placeholder:font-normal placeholder:text-[#b39aa6]"
        />
      </span>
      {error && <span className="mt-1.5 block text-[12.5px] font-medium text-[#A52D5B]">{error}</span>}
    </label>
  );
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // for the enter animation
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const openPopup = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);

  const closePopup = useCallback(() => {
    setShown(false);
    window.setTimeout(() => setOpen(false), 220);
  }, []);

  /* any <a href="#contact"> opens the popup; also a custom event */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href="#contact"]');
      if (!a) return;
      e.preventDefault();
      openPopup();
    };
    const onOpen = () => openPopup();
    document.addEventListener("click", onClick);
    window.addEventListener("open-lead-popup", onOpen);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("open-lead-popup", onOpen);
    };
  }, [openPopup]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => document.getElementById("lead-name")?.focus(), 250);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, closePopup]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = k === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const submit = async () => {
    if (submitting) return;
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (values.city.trim().length < 2) next.city = "Please enter your city";
    setErrors(next);
    setApiError("");
    if (Object.keys(next).length) return;

    setSubmitting(true);
    let redirected = false;
    try {
      // /api/submissions saves to the Google Sheet and sends the lead to TeleCRM.
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "General Landing Page",
          name: values.name.trim(),
          phone: values.phone,
          city: values.city.trim(),
          concern: "General consultation enquiry",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        track("lead_submit", { branch: "Sirpi Aesthetics — General", section: "general-popup" });
        // full page load (not a client-side route change) so the thank-you page loads fresh
        redirected = true;
        window.location.assign("/general/thank-you");
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      if (!redirected) setSubmitting(false); // stay disabled while the page reloads
    }
  };

  if (!open) return null;

  return (
    <div
      className={`font-[family-name:var(--font-lato)] fixed inset-0 z-[100] flex items-center justify-center bg-[#2a0716]/60 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => e.target === e.currentTarget && closePopup()}
      role="dialog"
      aria-modal="true"
      aria-label="Submit your details"
    >
      <div
        className={`relative max-h-[96vh] w-full max-w-[440px] overflow-y-auto rounded-[28px] bg-white  transition-all duration-300 ${
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#6A113D] via-[#7A234D] to-[#A52D5B] px-6 pb-7 pt-7 text-white sm:px-8">
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <span aria-hidden className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#ED575C]/25" />

          {/* div role=button (not <button>) so the global button:hover rule doesn't repaint it */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Close"
            onClick={closePopup}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && closePopup()}
            className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/20 text-white outline-none transition hover:bg-white/35"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </div>

          <div className="relative inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-3 text-[10.5px] font-bold uppercase tracking-[0.12em]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[#6A113D]">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor">
                <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
              </svg>
            </span>
            Sirpi Aesthetics · Coimbatore
          </div>
          <div className={`relative mt-3 text-[26px] font-bold leading-tight tracking-[-0.01em]`}>Submit Your Details</div>
          <div className="relative mt-1.5 text-[14px] text-white/85">Our team will call you back shortly.</div>
        </div>

        {/* form */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-4 px-6 pb-7 pt-6 sm:px-8"
        >
          <Field
            label="Name"
            icon={Icon.user}
            id="lead-name"
            name="name"
            value={values.name}
            onChange={set("name")}
            placeholder="Enter your name"
            autoComplete="name"
            error={errors.name}
          />
          <Field
            label="Phone Number"
            icon={Icon.phone}
            prefix="+91"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={set("phone")}
            placeholder="10-digit mobile number"
            autoComplete="tel-national"
            error={errors.phone}
          />
          <Field
            label="City"
            icon={Icon.pin}
            name="city"
            value={values.city}
            onChange={set("city")}
            placeholder="Enter your city"
            autoComplete="address-level2"
            error={errors.city}
          />

          {apiError && <div className="rounded-xl bg-[#FDEEEE] px-4 py-2.5 text-[13px] font-medium text-[#A52D5B]">{apiError}</div>}

          {/* hidden submit so Enter works; visible control is a div (global button:hover rule) */}
          <input type="submit" className="hidden" />
          <div
            role="button"
            tabIndex={0}
            aria-disabled={submitting}
            onClick={submit}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && submit()}
            className={`flex h-[54px] w-full cursor-pointer select-none items-center justify-between rounded-full bg-[#6A113D] pl-7 pr-[7px] text-[15px] font-bold text-white outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#6A113D]/50 ${
              submitting ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <span>{submitting ? "Submitting..." : "Submit"}</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#571032]">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>

          <div className="text-center text-[12px] text-[#8a6a78]">Your details are safe with us.</div>
        </form>
      </div>
    </div>
  );
}
