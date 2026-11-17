
import Footer from "@/components/generic-lp/footer";
import CareHero from "@/components/generic-lp/care-hero";
import ConditionsCarousel from "@/components/generic-lp/conditions-carousel";
import DoctorExpertise from "@/components/generic-lp/doctor-expertise";
import LeadPopup from "@/components/generic-lp/lead-popup";
import Navbar from "@/components/generic-lp/navbar";
import ResultsGallery from "@/components/generic-lp/results-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cosmetic & Plastic Surgery in Coimbatore | Sirpi Aesthetics",
  description: "Gynecomastia correction, hair transplant, liposuction and body contouring at Sirpi Aesthetics, Peelamedu, Coimbatore — with Dr. Srigireesh A R, certified Plastic Surgeon.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <CareHero />
      <ConditionsCarousel />
      <ResultsGallery />
      <DoctorExpertise />
      <Footer />
      <LeadPopup />
    </>
  );
}
