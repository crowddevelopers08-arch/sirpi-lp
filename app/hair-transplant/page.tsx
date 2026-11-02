import type { Metadata } from "next";
import HairTransplantQuestion from "@/components/elite-minima/hair-transplants/HairTransplantQuestion";
import IntroLoader from "@/components/elite-minima/hair-transplants/IntroLoader";

export const metadata: Metadata = {
  title: "Hair Transplant in Coimbatore | Sirpi Aesthetics",
  description:
    "Check your hair transplant options at Sirpi Aesthetics, Coimbatore. Answer a few quick questions and our team will call you to discuss an assessment with Dr. Srigireesh, Plastic Surgeon.",
};

export default function HairTransplantPage() {
  return (
    <>
      {/* Intro sits over the form for the first few seconds, then removes itself. */}
      <IntroLoader />
      <HairTransplantQuestion />
    </>
  );
}
