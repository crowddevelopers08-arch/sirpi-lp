"use client";

import { useEffect, useState } from "react";
import ThankYouScreen from "./ThankYouScreen";
import { readThankYou, saveThankYou, type ThankYouData } from "./thank-you-handoff";
import { ADS_CONVERSIONS } from "../track";

/** How long to wait for a tag that loads after the page (the Meta Pixel comes through GTM). */
const TAG_WAIT_MS = 10000;

/**
 * Calls `send` once `ready()` is true, checking every 250ms for up to
 * TAG_WAIT_MS. Returns a cleanup that stops the checking.
 */
function whenReady(ready: () => boolean, send: () => void) {
  let timer = 0;
  const started = Date.now();
  const attempt = () => {
    if (ready()) return send();
    if (Date.now() - started < TAG_WAIT_MS) timer = window.setTimeout(attempt, 250);
  };
  attempt();
  return () => window.clearTimeout(timer);
}

/** /hair-transplant/thank-you — the same thank-you screen, filled from the form's hand-off. */
export default function ThankYouView() {
  const [data, setData] = useState<ThankYouData | null>(null);

  // sessionStorage only exists in the browser, so it is read after the first render.
  useEffect(() => {
    const saved = readThankYou();
    setData(saved ?? { name: "", phone: "", variant: "booked" });

    // Conversions fire once per real submission:
    //   no hand-off (URL opened directly) → nothing fires
    //   already sent (page refreshed)     → not sent again
    if (!saved) return;
    let state = { ...saved };
    const mark = (patch: Partial<ThankYouData>) => {
      state = { ...state, ...patch };
      saveThankYou(state);
    };
    const stops: (() => void)[] = [];

    // Google Ads — "HT Form conversion page"
    if (!saved.adsSent) {
      stops.push(
        whenReady(
          () => typeof window.gtag === "function",
          () => {
            window.gtag!("event", "conversion", { send_to: ADS_CONVERSIONS.hairLead, value: 1.0, currency: "INR" });
            mark({ adsSent: true });
          },
        ),
      );
    }

    // Meta Pixel — fbq('track', 'Lead')
    if (!saved.leadSent) {
      stops.push(
        whenReady(
          () => typeof window.fbq === "function",
          () => {
            window.fbq!("track", "Lead");
            mark({ leadSent: true });
          },
        ),
      );
    }

    return () => stops.forEach((stop) => stop());
  }, []);

  // Same bone ground as the screen, so there is no white flash before it appears.
  if (!data) return <main className="min-h-svh bg-[#FFF8FA]" />;

  return (
    <ThankYouScreen
      name={data.name}
      phone={data.phone}
      variant={data.variant}
      onHome={() => window.location.assign("/hair-transplant")}
    />
  );
}
