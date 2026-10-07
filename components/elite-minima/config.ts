// Sirpi Aesthetics contact details supplied by the clinic.

export const BRAND = "Sirpi Aesthetics"
export const BRAND_FULL = "Sirpi Aesthetics - Cosmetic Surgery Centre"
export const BRANCH = "Sirpi Aesthetics, Coimbatore"

/** Primary line — the only number shown in the navbar, and the tel: target for
    single-button call CTAs. */
export const PHONE_DISPLAY = "+91 89259 76636"
export const PHONE_TEL = "+918925976636"

/** Second line — listed beside the primary everywhere except the navbar. */
export const PHONE_ALT_DISPLAY = "+91 89259 76636"
export const PHONE_ALT_TEL = "+918925976636"

/** Both lines in display order, for the places that list them together. */
export const PHONES = [
  { display: PHONE_DISPLAY, tel: PHONE_TEL },
] as const

export const WHATSAPP_DISPLAY = "+91 89259 76636"
export const WHATSAPP_URL = "https://wa.me/918925976636"

export const EMAIL = "sirpiaesthetics@gmail.com"

export const INSTAGRAM_URL = "https://www.instagram.com/eliteminima/"
export const FACEBOOK_URL = "https://www.facebook.com/people/Eliteminima/61578080883956/"

export const ADDRESS_SHORT = "Peelamedu, Coimbatore"
export const ADDRESS_FULL =
  "1335-G&F, Avinashi Rd, near SMS HOTELS, Peelamedu, Coimbatore, Tamil Nadu 641004"

export const HOURS = "Mon-Sat: 10:00 AM to 7:00 PM"

/** Proctology specialist for this page. */
export const DOCTOR = {
  name: "Dr. Lohit Sai K",
  title: "General, Minimally Invasive & Laparoscopic Surgeon",
  qualifications: "M.B.B.S, M.S. (General Surgery), DNB, F.MAS, D.MAS, M.MAS, FALS, FISCP, FAIS, FIAGES",
  highlight: "Renowned for advanced laparoscopic, laser proctological, and abdominal reconstructive procedures.",
  expertise: [
    "Piles Treatment",
    "Laser Piles Treatment",
    "Fissure Treatment",
    "Fistula Treatment",
    "Minimally Invasive Procedures",
  ],
} as const

/** Google Maps embed query — the clinic's registered address. */
export const MAP_QUERY = "Sirpi Aesthetics - Cosmetic Surgery Centre, 1335-G&F, Avinashi Rd, Peelamedu, Coimbatore 641004"
export const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Sirpi Aesthetics - Cosmetic Surgery Centre, 1335-G&F, Avinashi Rd, Peelamedu, Coimbatore 641004")

/* ── Image assets ──────────────────────────────────────────────────────────
   Everything listed here is served from Cloudinary; to swap one, upload it and
   update the URL below. The one exception on the site is the gynecomastia
   treatment-options panel, whose liposuction and contouring options read four
   files straight out of /public — see the constants above OPTIONS in
   gynecomastia/content.ts.                                                 */
const CDN = "https://res.cloudinary.com/k4ojpvgo/image/upload"

export const IMAGES = {
  /** Full brand lockup — mark plus wordmark. Header, footer, standalone pages. */
  logoLockup: "/CIRCLE-STICKER-LOGO.png",
  /** Mark only, no wordmark. Used where horizontal space is tight. */
  logoMark: "/CIRCLE-STICKER-LOGO.png",
  /** Square clinic logo, for avatars and share targets. */
  logoSquare: "/CIRCLE-STICKER-LOGO.png",
  /** Hero still (photo) and its illustrated alternative. */
  hero: `${CDN}/v1785733387/hero_qbuuvr.jpg`,
  heroIllustration: `${CDN}/v1785733388/hero_hv8qyi.png`,
  /** Dr. Lohit Sai K portrait. */
  doctor: `${CDN}/v1785733389/lok_wllfis.jpg`,
  /** Clinical images for the treatment-options cards. */
  pilesCausesAndSymptoms: `${CDN}/v1785733389/Piles-Causes-And-Symptoms_wrfg5l.webp`,
  pilesDiagram: `${CDN}/v1785733388/piles_jfvzeb.jpg`,
  pilesModel: `${CDN}/v1785733387/images_dwygdd.jpg`,
  clinicianWithModel: `${CDN}/v1785733388/432110982_qvlkpb.jpg`,

  /* ── General page (/general) ─────────────────────────────────────────────
     Its own pathway images and specialist portraits. Uploaded later than the
     set above, hence the different version segment — the two batches are
     unrelated and neither version is shared. */
  /** Theatre photograph on the "why choose us" section. */
  surgicalTeam: `${CDN}/v1786100968/why_xzukid.png`,
  /** Circumcision pathway. */
  staplerCircumcision: `${CDN}/v1786100965/Stapler_gqf39o.png`,
  laserCircumcision: `${CDN}/v1786100967/Lasercir_jbcqcq.png`,
  /** Gynecomastia pathway. */
  liposuction: `${CDN}/v1786100962/lipo_yxltnv.jpg`,
  glandExcision: `${CDN}/v1786100963/gland_i0gdp0.png`,
  chestContouring: `${CDN}/v1786100961/AdvancedChestContouring_lqaon2.png`,
  /* The three specialist portraits are one matched set: same pale green studio
     backdrop, same white coat. Keep any replacement to that setup or the row
     stops reading as a set. */
  drLohitSai: `${CDN}/v1786100959/drloki_abje1c.png`,
  drMadan: `${CDN}/v1786100960/drmadan_lfz2nl.png`,
  drVijayalakshmi: `${CDN}/v1786100962/drVijayalakshmi_mdfnk9.png`,
} as const

/**
 * Insert a Cloudinary delivery transform into one of the URLs above.
 *
 * next/image runs `unoptimized` (see next.config.mjs), so the browser is handed
 * whatever URL it is given — a 1536px portrait dropped into a 56px avatar gets
 * downscaled 27× in one step and comes out soft. Handing the resize to
 * Cloudinary instead returns an image at the size it will actually be drawn,
 * and gravity keeps the crop where it belongs.
 *
 *   cldTransform(IMAGES.drMadan, "c_fill,g_face,w_224,h_224,q_auto")
 *
 * Ask for roughly twice the CSS size so the result still holds up on a 2×
 * screen. Non-Cloudinary URLs pass through untouched.
 */
export function cldTransform(url: string, transform: string): string {
  return url.replace("/image/upload/", `/image/upload/${transform}/`)
}

/** Hero media. The hero now shows a still image; swap this URL to change it. */
export const HERO_IMAGE = IMAGES.hero

/* ── Review funnel (/review → Google or /client-feedback) ──────────────────
   REPLACE GOOGLE_REVIEW_URL before launch: Google Business Profile →
   "Ask for reviews" → copy the g.page link. Until it is replaced the review
   page falls back to a Maps search for the clinic, so the button still lands
   somewhere useful instead of 404-ing.                                      */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CVvv0ToOxi7OEBM/review"

export const GOOGLE_REVIEW_FALLBACK_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(MAP_QUERY)

/** True while GOOGLE_REVIEW_URL is still the untouched placeholder. */
export const REVIEW_LINK_IS_PLACEHOLDER = GOOGLE_REVIEW_URL.includes("REPLACE_WITH")

export const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.378479053196!2d76.9980609!3d11.022855900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8598554613869%3A0x37c53c72d41c91f2!2sSirpi%20Aesthetics%20-%20Cosmetic%20Surgery%20Centre!5e1!3m2!1sen!2sin!4v1791276979554!5m2!1sen!2sin"
