"use client";

import { useEffect, useState } from "react";
import ThankYouScreen from "./ThankYouScreen";
import { readThankYou, type ThankYouData } from "./thank-you-handoff";

/** /hair-transplant/thank-you — the same thank-you screen, filled from the form's hand-off. */
export default function ThankYouView() {
  const [data, setData] = useState<ThankYouData | null>(null);

  // sessionStorage only exists in the browser, so it is read after the first render.
  useEffect(() => {
    setData(readThankYou() ?? { name: "", phone: "", variant: "booked" });
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
