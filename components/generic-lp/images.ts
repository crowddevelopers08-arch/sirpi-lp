import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

/* Images for the general landing page (/general), delivered from Cloudinary. */

export const IMG = {
  // treatments carousel
  gynecomastia: CLOUDINARY_IMAGES.treatment.option1,
  hairTransplant: CLOUDINARY_IMAGES.hair.treatment1,
  liposuction: CLOUDINARY_IMAGES.treatment.liposuction,
  bodyContouring: CLOUDINARY_IMAGES.treatment.bodyContouring,
  skinTightening: CLOUDINARY_IMAGES.treatment.option2,

  // hero + doctor
  hero: CLOUDINARY_IMAGES.doctor, // clear professional portrait of Dr. Srigireesh
  heroDetailTop: CLOUDINARY_IMAGES.clinic[0], // Sirpi Aesthetics exterior
  heroDetailBottom: CLOUDINARY_IMAGES.clinic[4], // surgical theatre
  doctor: CLOUDINARY_IMAGES.doctor,

  // logo (white wordmark on its own burgundy ground)
  logo: CLOUDINARY_IMAGES.logo,
} as const;
