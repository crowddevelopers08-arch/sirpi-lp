import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lato } from "next/font/google"
import "./globals.css"

// Lato is the sole typeface for the Sirpi Aesthetics site, exposed as --font-lato.
//
// Lato only ships 100/300/400/700/900 — it has no 500, 600 or 800. The design
// uses font-medium/semibold/extrabold, which the CSS font-matching algorithm
// resolves against the faces below as 500→400, 600→700, 800→900.
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
})

// Site-wide defaults; a page that sets its own title, description or OG block
// overrides these.
const TITLE = "Sirpi Aesthetics — Gynecomastia & Cosmetic Surgery Centre"
const DESCRIPTION =
  "Sirpi Aesthetics – Cosmetic Surgery Centre offers specialist-led gynecomastia correction, liposuction and body contouring. Book a private consultation."

// icon.png / apple-icon.png / opengraph-image.png / twitter-image.png live in
// this directory and are picked up by the App Router's file conventions.
export const metadata: Metadata = {
  // Needed so the OG/Twitter images resolve to absolute URLs. Override per
  // environment with NEXT_PUBLIC_SITE_URL.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://treatment.sirpicentre.com/"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Sirpi Aesthetics",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Sirpi Aesthetics — Cosmetic Surgery Centre",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  generator: "Nextjs15",
}

// Brand burgundy — tints the browser chrome on Android and the iOS status bar.
export const viewport: Viewport = {
  themeColor: "#6A113D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`antialiased ${lato.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WKPJD9FP');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) — Google Ads AW-11106084367.
            Conversions are fired from code, not from here:
              • Click to call  → components/elite-minima/track.ts (every call_click)
              • Lead / thank-you page → components/elite-minima/ThankYouPanel.tsx
            If GTM-WKPJD9FP is ever given these same Ads conversion tags, remove
            them from one side or each conversion will be counted twice. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11106084367" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-11106084367');

// Click-to-call conversion, verbatim from the Ads UI, for inline onclick use.
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-11106084367/rmZ3CNCfzJ0dEI_M5a8p',
      'value': 1.0,
      'currency': 'INR',
      'event_callback': callback
  });
  return false;
}
window.gtag = gtag;
window.gtag_report_conversion = gtag_report_conversion;`,
          }}
        />
        {/* End Google tag (gtag.js) */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKPJD9FP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}