"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const photos = Array.from({ length: 12 }, (_, index) =>
  `/clinic-${index + 1}.${index < 8 ? "jpg" : "JPG"}`,
)

export default function GynGallery() {
  const [carouselRef, carousel] = useEmblaCarousel({ loop: true, align: "start" })

  return (
    <section
      id="clinic"
      aria-labelledby="clinic-gallery-heading"
      className="bg-[var(--g-bone)] text-[var(--g-ink)]"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 sm:py-16 lg:py-10">
        <div className="text-center">
          <p className="g-eyebrow g-eyebrow--ink">Sirpi Aesthetics</p>
          <h2 id="clinic-gallery-heading" className="mt-5">Our Clinic Gallery</h2>
        </div>

        <div className="mt-8 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:mt-10 sm:gap-4">
          <button
            type="button"
            aria-label="Previous clinic photos"
            aria-controls="clinic-gallery-gallery"
            onClick={() => carousel?.scrollPrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--g-bone-line)] bg-white text-[var(--g-accent-deep)] transition-colors hover:bg-[var(--g-accent-deep)] hover:text-white sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>

          <div
            id="clinic-gallery-gallery"
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Clinic photos"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault()
                if (event.key === "ArrowLeft") carousel?.scrollPrev()
                else carousel?.scrollNext()
              }
            }}
            className="overflow-hidden"
          >
            <div className="-ml-4 flex touch-pan-y">
              {photos.map((src, index) => (
                <div
                  key={src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${photos.length}`}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--g-bone-line)] bg-white">
                    <Image
                      src={src}
                      alt={`Sirpi Aesthetics clinic photo ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next clinic photos"
            aria-controls="clinic-gallery-gallery"
            onClick={() => carousel?.scrollNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--g-bone-line)] bg-white text-[var(--g-accent-deep)] transition-colors hover:bg-[var(--g-accent-deep)] hover:text-white sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
