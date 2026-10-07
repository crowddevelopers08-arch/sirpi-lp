// Lightweight analytics helper.
// Pushes to dataLayer and forwards Lead / Contact events to Meta Pixel when
// fbq is present.

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
  }
}

export function track(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(Object.assign({ event: name }, data || {}))
  if (typeof window.fbq === "function") {
    if (name === "lead_submit") window.fbq("track", "Lead")
    if (name === "call_click" || name === "whatsapp_click") window.fbq("track", "Contact")
  }
}
