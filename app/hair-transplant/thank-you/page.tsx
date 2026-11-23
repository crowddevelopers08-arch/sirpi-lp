import type { Metadata } from "next";
import Script from "next/script";
import ThankYouView from "@/components/elite-minima/hair-transplants/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You | Sirpi Aesthetics",
  description: "Your hair transplant consultation request has been received.",
  // a confirmation page has nothing for search results, and shouldn't be reachable without submitting
  robots: { index: false, follow: false },
};

export default function HairTransplantThankYouPage() {
  return (
    <>
      {/* Event snippet for HT Form conversion page — Google Ads, verbatim.
          Fires on every load of this page, as Google's snippet does (that is
          also what Tag Assistant checks). `gtag` is defined by the Google tag
          in app/layout.tsx, which loads before this runs. */}
      <Script id="ht-form-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', {
    'send_to': 'AW-11106084367/sRNFCJ6P370dEI_M5a8p',
    'value': 1.0,
    'currency': 'INR'
});`}
      </Script>
      <ThankYouView />
    </>
  );
}
