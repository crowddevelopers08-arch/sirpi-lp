// Lightweight analytics helper.
// Pushes to dataLayer (GTM), forwards Lead / Contact events to Meta Pixel when
// fbq is present, and reports the Google Ads conversions when gtag is present.

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    /** Google's own snippet, defined in app/layout.tsx for inline onclick use. */
    gtag_report_conversion?: (url?: string) => boolean
  }
}

/** Google Ads conversions (account AW-11106084367), from the Ads UI. */
export const ADS_CONVERSIONS = {
  /** "Click to call" — also in the layout's gtag_report_conversion. */
  call: "AW-11106084367/rmZ3CNCfzJ0dEI_M5a8p",
  /** "Gyneacomastia LP conversion page" — the thank-you page. */
  lead: "AW-11106084367/kAnECPOk1J0dEI_M5a8p",
} as const

/** Fire one Google Ads conversion, if the tag has loaded. */
export function adsConversion(sendTo: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", "conversion", { send_to: sendTo, value: 1.0, currency: "INR" })
}

export function track(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(Object.assign({ event: name }, data || {}))
  if (typeof window.fbq === "function") {
    if (name === "lead_submit") window.fbq("track", "Lead")
    if (name === "call_click" || name === "whatsapp_click") window.fbq("track", "Contact")
  }
  // Every phone link on the site reports call_click, so hanging the Ads
  // conversion here covers all of them without an onclick on each one.
  //
  // No event_callback and no preventDefault, unlike Google's snippet: a `tel:`
  // link hands off to the dialler without unloading the page, so there is
  // nothing to wait for — and swallowing the click would stop the call.
  if (name === "call_click") adsConversion(ADS_CONVERSIONS.call)
}
