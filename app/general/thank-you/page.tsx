import type { Metadata } from "next";

import Footer from "@/components/generic-lp/footer";
import ThankYou from "@/components/generic-lp/thankyou";
import Navbared from "@/components/generic-lp/thank-navbar";

export const metadata: Metadata = {
  title: "Thank You | Sirpi Aesthetics",
  description: "Confirmation page for consultation and enquiry submissions.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Navbared />
      <ThankYou />
      <Footer />
    </>
  );
}
