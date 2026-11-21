"use client";

import { useEffect, useState } from "react";
import ThankYouScreen from "./ThankYouScreen";
import { readThankYou, saveThankYou, type ThankYouData } from "./thank-you-handoff";

/** How long to wait for the Meta Pixel (it loads through GTM, after the page). */
const PIXEL_WAIT_MS = 10000;

/** /hair-transplant/thank-you — the same thank-you screen, filled from the form's hand-off. */
export default function ThankYouView() {
  const [data, setData] = useState<ThankYouData | null>(null);

  // sessionStorage only exists in the browser, so it is read after the first render.
  useEffect(() => {
    const saved = readThankYou();
    setData(saved ?? { name: "", phone: "", variant: "booked" });

    // Meta Pixel: fbq('track', 'Lead') — once per real submission.
    // No hand-off (someone opened the URL directly) → no Lead.
    // Already sent (page refreshed) → not sent again.
    if (!saved || saved.leadSent) return;

    let timer = 0;
    const started = Date.now();
    const fire = () => {
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
        saveThankYou({ ...saved, leadSent: true });
        return;
      }
      // the Pixel may still be loading via GTM — keep checking for a while
      if (Date.now() - started < PIXEL_WAIT_MS) timer = window.setTimeout(fire, 250);
    };
    fire();
    return () => window.clearTimeout(timer);
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
