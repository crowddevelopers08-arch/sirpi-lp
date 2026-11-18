const CLOUDINARY = "https://res.cloudinary.com/ncyhumsk/image/upload"

/**
 * Public clinic media delivered from Cloudinary. Keep image references here so
 * pages do not depend on duplicate copies in /public.
 */
export const CLOUDINARY_IMAGES = {
  logo: `${CLOUDINARY}/v1794999289/CIRCLE-STICKER-LOGO.png`,
  srigireeshLogo: `${CLOUDINARY}/v1794999305/Srigireesh-logo.png`,
  websitePhoto: `${CLOUDINARY}/v1794999305/Website-photos-2024-01-29.webp`,
  doctor: `${CLOUDINARY}/v1794999292/DSC3351.jpg`,
  doctorSuit: `${CLOUDINARY}/v1794999292/dr-srigireesh-suit.jpg`,
  clinic: [
    `${CLOUDINARY}/v1794999291/clinic-1.jpg`, `${CLOUDINARY}/v1794999290/clinic-2.jpg`,
    `${CLOUDINARY}/v1794999291/clinic-3.jpg`, `${CLOUDINARY}/v1794999293/clinic-4.jpg`,
    `${CLOUDINARY}/v1794999291/clinic-5.jpg`, `${CLOUDINARY}/v1794999301/clinic-6.jpg`,
    `${CLOUDINARY}/v1794999292/clinic-7.jpg`, `${CLOUDINARY}/v1794999291/clinic-8.jpg`,
    `${CLOUDINARY}/v1794999990/clinic-9.jpg`, `${CLOUDINARY}/v1794999987/clinic-10.jpg`,
    `${CLOUDINARY}/v1794999985/clinic-11.jpg`, `${CLOUDINARY}/v1794999983/clinic-12.jpg`,
  ],
  gallery: {
    gynecomastia: `${CLOUDINARY}/v1794999356/gynecomastia.jpg`,
    hairTransplant: `${CLOUDINARY}/v1794999357/hair-transplant.jpg`,
    liposuction: `${CLOUDINARY}/v1794999357/liposuction.jpg`,
    tummyTuck: `${CLOUDINARY}/v1794999359/tummy-tuck.jpg`,
    mommyMakeover: `${CLOUDINARY}/v1794999358/mommy-makeover.jpg`,
    rhinoplasty: `${CLOUDINARY}/v1794999358/rhinoplasty.jpg`,
    liquidRhinoplasty: `${CLOUDINARY}/v1794999357/liquid-rhinoplasty.jpg`,
    faceProcedures: `${CLOUDINARY}/v1794999356/face-procedures.jpg`,
  },
  beforeAfter: [
    `${CLOUDINARY}/v1794999287/bfaf-1.jpg`, `${CLOUDINARY}/v1794999289/bfaf-2.jpg`,
    `${CLOUDINARY}/v1794999288/bfaf-3.jpg`, `${CLOUDINARY}/v1794999287/bfaf-4.jpg`,
    `${CLOUDINARY}/v1794999287/bfaf-5.jpg`, `${CLOUDINARY}/v1794999288/bfaf-6.jpg`,
    `${CLOUDINARY}/v1794999288/bfaf-7.jpg`,
  ],
  faq: [
    `${CLOUDINARY}/v1794999293/faq-1.jpg`, `${CLOUDINARY}/v1794999301/faq-2.jpg`, `${CLOUDINARY}/v1794999300/faq-3.jpg`,
  ],
  hair: {
    hero: `${CLOUDINARY}/v1794999300/hair-treatment-2.jpg`,
    treatment1: `${CLOUDINARY}/v1794999300/hair-treatment-1.jpg`,
    treatment3: `${CLOUDINARY}/v1794999300/hair-treatment-3.jpg`,
    clinic: `${CLOUDINARY}/v1794999289/clini01.jpg`,
    patient3Year: `${CLOUDINARY}/v1794999300/HT-PT-3.jpg`,
    results: `${CLOUDINARY}/v1794999301/HT-RESULTS-2.jpg`,
    beforeAfter1: `${CLOUDINARY}/v1794999288/bfafs-1.jpg`,
    beforeAfter2: `${CLOUDINARY}/v1794999289/bfafs-2.png`,
    beforeAfter3: `${CLOUDINARY}/v1794999289/bfafs-3.png`,
  },
  treatment: {
    option1: `${CLOUDINARY}/v1794999303/option-1.jpg`,
    option2: `${CLOUDINARY}/v1794999304/option-2.jpg`,
    liposuction: `${CLOUDINARY}/v1794999300/front2-13.jpg`,
    bodyContouring: `${CLOUDINARY}/v1794999286/11-Large.jpg`,
    images1: `${CLOUDINARY}/v1794999301/images-1.webp`,
    images2: `${CLOUDINARY}/v1794999301/images-2.webp`,
    images3: `${CLOUDINARY}/v1794999301/images-3.jpg`,
    images4: `${CLOUDINARY}/v1794999301/images-4.jpg`,
    images6: `${CLOUDINARY}/v1794999303/images-6.png`,
    images7: `${CLOUDINARY}/v1794999304/images-7.png`,
  },
  icons: [
    `${CLOUDINARY}/v1794999304/sirp-icon-1.png`, `${CLOUDINARY}/v1794999304/sirp-icon-2.png`,
    `${CLOUDINARY}/v1794999304/sirp-icon-3.png`, `${CLOUDINARY}/v1794999305/sirp-icon-4.png`,
  ],
} as const
