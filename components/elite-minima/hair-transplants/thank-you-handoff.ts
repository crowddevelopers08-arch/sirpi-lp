import type { ThankYouVariant } from "./ThankYouScreen";

/*
  The form and /hair-transplant/thank-you are separate page loads, so the
  details the thank-you screen shows travel in sessionStorage. They are kept
  out of the URL on purpose: GTM and Google Ads record page URLs, and a name
  and phone number must not end up in analytics.
*/

export const THANK_YOU_PATH = "/hair-transplant/thank-you";
const KEY = "sirpi-ht-thank-you";

export type ThankYouData = { name: string; phone: string; variant: ThankYouVariant };

export function saveThankYou(data: ThankYouData) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // private mode / storage blocked — the page still shows a generic thank-you
  }
}

export function readThankYou(): ThankYouData | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<ThankYouData>;
    const variant: ThankYouVariant = data.variant === "outstation" || data.variant === "closed" ? data.variant : "booked";
    return { name: typeof data.name === "string" ? data.name : "", phone: typeof data.phone === "string" ? data.phone : "", variant };
  } catch {
    return null;
  }
}
