import type { Metadata } from "next";
import ThankYou from "@/components/rhinoplasty/thankyou";
import Navbared from "@/components/rhinoplasty/thank-navbar";

export const metadata: Metadata = {
  title: "Thank You | Rhinoplasty Consultation | Sirpi Aesthetics",
  description: "Your rhinoplasty consultation request has been received.",
  robots: { index: false, follow: false },
};

const RHINOPLASTY_FORM_CONVERSION = `gtag('event', 'conversion', {
  'send_to': 'AW-11106084367/ZB4VCL-0qr8dEI_M5a8p',
  'value': 1.0,
  'currency': 'INR'
});`;

export default function RhinoplastyThankYouPage() {
  return (
    <>
      <script id="rhinoplasty-form-conversion" dangerouslySetInnerHTML={{ __html: RHINOPLASTY_FORM_CONVERSION }} />
      <Navbared />
      <ThankYou
        eyebrow="Rhinoplasty Enquiry Received"
        title="Thank you for reaching out."
        message="Your rhinoplasty consultation enquiry has been received. Our team will contact you shortly to discuss the next step."
      />
    </>
  );
}
