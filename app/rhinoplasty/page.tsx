import type { Metadata } from "next";
import RhinoplastyHero from "@/components/rhinoplasty/RhinoplastyHero";
import RhinoplastyBeforeAfter from "@/components/rhinoplasty/RhinoplastyBeforeAfter";
import RhinoplastyDoctor from "@/components/rhinoplasty/RhinoplastyDoctor";
import PatientVideoCarousel from "@/components/rhinoplasty/patient-video-carousel";
import RhinoplastyGoogleReviews from "@/components/rhinoplasty/RhinoplastyGoogleReviews";
import RhinoplastyConsultation from "@/components/rhinoplasty/finalcta";
import Footer from "@/components/rhinoplasty/footer";

export const metadata: Metadata = {
  title: "Rhinoplasty (Nose Job) in Coimbatore | Sirpi Aesthetics",
  description:
    "Nose reshaping surgery at Sirpi Aesthetics, Peelamedu, Coimbatore — assessed and performed by Dr. Srigireesh A R, certified Plastic Surgeon. Submit your details and we'll call you back.",
};

export default function RhinoplastyPage() {
  return (
    <>
      <RhinoplastyHero />
      <RhinoplastyBeforeAfter />
      <RhinoplastyDoctor />
      {/* <PatientVideoCarousel /> */}
      <RhinoplastyGoogleReviews />
      <RhinoplastyConsultation />
      <Footer />
    </>
  );
}
