"use client"

import { useRef, useState } from "react"
import { ArrowRight, Lock } from "lucide-react"
import { track } from "../track"
import { PHONES } from "../config"
import { GYN_BRANCH } from "./content"

const LEAD_ENDPOINT = "/api/submissions"

/** Shown in the sheet's Source column and as the TeleCRM "Form Name" note. */
const LEAD_SOURCE = "Gynecomastia Lead Form"

/** What the visitor thinks they need — the sheet's Concern column. */
const CONCERNS = [
  "Gynecomastia — not sure of the cause",
  "Excess chest fat",
  "Firm glandular tissue",
  "Puffy / protruding nipples",
  "Revision or second opinion",
] as const

/**
 * The booking form, as a set of underlined fields on the dark ground.
 *
 * Deliberately not the other pages' form: no card, no rounded filled inputs,
 * just underlined fields. Fewer moving parts, and it matches the page's
 * rule-and-baseline geometry instead of fighting it.
 */
export default function GynLeadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setSubmitting(true)
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    // Only the fields the visitor filled in, plus the page they sent it from.
    const payload = {
      source: LEAD_SOURCE,
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
      city: raw.address,
      concern: raw.concern,
      pageUrl: window.location.href,
    }

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null
      if (!res.ok || !data?.success) throw new Error(`Request failed with ${res.status}`)

      track("lead_submit", { branch: GYN_BRANCH, treatment: raw.concern })
      window.location.href = "/thank-you"
    } catch {
      setSubmitting(false)
      alert(`That did not go through. Please call ${PHONES.map((phone) => phone.display).join(" or ")} instead.`)
    }
  }

  return (
    <form id="book" ref={formRef} onSubmit={onSubmit} noValidate className="g-form @container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 @min-[540px]:grid-cols-2">
        <Field label="Name" htmlFor="gyn-name">
          <input id="gyn-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="g-field" />
        </Field>

        <Field label="Phone number" htmlFor="gyn-phone">
          <input
            id="gyn-phone"
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className="g-field"
          />
        </Field>

        <Field label="Email" htmlFor="gyn-email">
          <input id="gyn-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="g-field" />
        </Field>

        <Field label="Area / city" htmlFor="gyn-address">
          <input
            id="gyn-address"
            name="address"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="e.g. Peelamedu, Coimbatore"
            className="g-field"
          />
        </Field>

        <Field label="What describes your concern?" htmlFor="gyn-concern" full>
          <select id="gyn-concern" name="concern" required defaultValue="" className="g-field">
            <option value="" disabled>
              Select your concern
            </option>
            {CONCERNS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 @min-[540px]:flex-row @min-[540px]:items-center">
        <button type="submit" disabled={submitting} className="g-btn g-btn-solid group/btn w-full @min-[540px]:w-auto">
          {submitting ? "Sending…" : "Request a consultation"}
          {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />}
        </button>

        <p className="flex items-start gap-2 text-[0.76rem] leading-snug text-[var(--g-dim)]">
          <Lock className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--g-text)]" aria-hidden />
          Your details stay private and confidential.
        </p>
      </div>
    </form>
  )
}

/** Label above a baseline. `full` spans both columns of the field grid. */
function Field({
  label,
  htmlFor,
  children,
  full = false,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={`min-w-0 ${full ? "@min-[540px]:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="block text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[var(--g-dim)]">
        {label}
      </label>
      {children}
    </div>
  )
}
