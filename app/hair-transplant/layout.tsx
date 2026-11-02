import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

/*
  Sirpi Aesthetics — hair transplant section.

  No <html>/<body> here: the site's root layout (app/layout.tsx) already
  renders them, and a second pair nested inside would be invalid. That root
  layout also supplies the Sirpi favicon (app/icon.png, app/apple-icon.png)
  and the share image, so this section inherits both.

  Type is Space Grotesk, for this section only. It is a variable font, so no
  weight list is needed — every weight from 300 to 700 is available.
*/
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hair Transplant in Coimbatore | Sirpi Aesthetics",
  description:
    "Hair transplant consultation at Sirpi Aesthetics, Peelamedu, Coimbatore — assessed by Dr. Srigireesh A R, certified Plastic Surgeon.",
};

export default function HairTransplantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} min-h-full flex flex-col`}
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontOpticalSizing: "auto", fontStyle: "normal" }}
    >
      {children}
    </div>
  );
}
