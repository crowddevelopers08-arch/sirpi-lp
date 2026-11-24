import type { Metadata } from "next";
import ThankYou from "@/components/rhinoplasty/thankyou";
import Navbared from "@/components/rhinoplasty/thank-navbar";

export const metadata: Metadata = {
  title: "Thank You | Rhinoplasty Consultation | Sirpi Aesthetics",
  description: "Your rhinoplasty consultation request has been received.",
  robots: { index: false, follow: false },
};

export default function RhinoplastyThankYouPage() {
  return (
    <>
      <Navbared />
      <ThankYou
        eyebrow="Rhinoplasty Enquiry Received"
        title="Thank you for reaching out."
        message="Your rhinoplasty consultation enquiry has been received. Our team will contact you shortly to discuss the next step."
      />
    </>
  );
}
