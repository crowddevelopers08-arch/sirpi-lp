import type { Metadata } from "next";
import ThankYouView from "@/components/elite-minima/hair-transplants/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You | Sirpi Aesthetics",
  description: "Your hair transplant consultation request has been received.",
  // a confirmation page has nothing for search results, and shouldn't be reachable without submitting
  robots: { index: false, follow: false },
};

export default function HairTransplantThankYouPage() {
  return <ThankYouView />;
}
