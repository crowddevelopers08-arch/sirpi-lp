import type { Metadata } from "next";
import ThankYouView from "@/components/elite-minima/hair-transplants/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You | Sirpi Aesthetics",
  description: "Your hair transplant consultation request has been received.",
  // a confirmation page has nothing for search results, and shouldn't be reachable without submitting
  robots: { index: false, follow: false },
};

/*
  Event snippet for HT Form conversion page — Google Ads, verbatim.

  A plain <script> (not next/script): it is written straight into this page's
  server HTML, so it runs while the page loads and is visible in the page
  source, which is what Google Ads / Tag Assistant look for. next/script with
  "afterInteractive" only injected it after hydration, from the RSC payload, and
  the troubleshooter reported it as not detected.

  `gtag` is defined by the Google tag in <head> (app/layout.tsx), which runs
  before this body script.
*/
const HT_FORM_CONVERSION = `gtag('event', 'conversion', {
    'send_to': 'AW-11106084367/sRNFCJ6P370dEI_M5a8p',
    'value': 1.0,
    'currency': 'INR'
});`;

export default function HairTransplantThankYouPage() {
  return (
    <>
      <script id="ht-form-conversion" dangerouslySetInnerHTML={{ __html: HT_FORM_CONVERSION }} />
      <ThankYouView />
    </>
  );
}
