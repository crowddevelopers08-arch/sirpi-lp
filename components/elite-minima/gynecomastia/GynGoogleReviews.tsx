"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

const reviews = [
  {
    name: "Shafeeq Shafeeq",
    text: `I came for the gynecomastia surgery in Sirpi. I felt very good about the procedure and cares . Now I’m completing 6 weeks after surgery . I have no pain feel very confident. Thank you Dr.srigireesh and Team`,
  },
  {
    name: "jones anton",
    text: `Before one and half a month I undergone gynecomastia surgery in sirpi cosmetics. Till the surgery date as of now no complications is there. Dr.Srigireesh has clear all the doubts of gynecomastia and explain the process of surgery very well.`,
  },
  {
    name: "rama shankari",
    text: `Excellent centre. Gifted hands. Affordable cosmetic procedures like liposuction for gynaecomastia done here. Genuine doctor explained everything in detail. Very satisfied with online followup consultation. Thank you doctor.`,
  },
//   {
//     name: "Gnana Ambika",
//     text: `My Journey of Rebirth – With Sirpi Aesthetics and Dr. Srigireesh

// At 40, after two children born ten years apart, I had lost a part of myself. Years of motherhood left me with a saggy breast, a big tummy, and the scars of body shaming. No matter how strong I appeared, deep down I felt unseen and broken. Every shopping trip reminded me of that pain — from once wearing medium sizes to now searching for XL.

// That’s when I found Sirpi Aesthetics, led by Dr. Srigireesh, a truly gifted and compassionate Cosmetic Surgeon in Coimbatore. I was terrified — even a single IV or IM injection used to frighten me. But the doctor’s calm assurance, his patience, and his gentle confidence gave me the courage to say yes to a change I had only dreamed of.

// My Mommy Makeover surgery took nearly 10 hours, but it changed my life forever. When I saw myself after recovery, tears rolled down my face. For the first time in years, I saw a woman who was happy, confident, and free.

// Every person at Sirpi Aesthetics became part of this transformation: The staff nurses were so courteous and kind. The lymphatic therapist, Mrs. Rabia, guided me through five careful sessions that helped my body heal beautifully.

// The boutique-style center made me feel at home, helping me recover faster and with so much comfort.
// I received personalized attention, filled with warmth and care.

// The most emotional part of this journey was my husband’s unwavering support. He wasn’t just my partner — he was my strength. He never judged my wish to feel beautiful again; instead, he encouraged me, calmed my fears, and reminded me of my worth. When I doubted myself, he believed in me. His love made this transformation complete.

// Now, when I walk into Lifestyle, I no longer reach for XL — I confidently pick medium-sized dresses. My teen daughter now jokingly calls me “Sissy” — and every time she says it, I smile with pride.

// Today, I not only look 10 years younger — I feel 10 years lighter, freer, and stronger. My physical ability, energy, and confidence have all returned in ways I never imagined.

// Thank you, Dr. Srigireesh and Sirpi Aesthetics, for sculpting not just my body, but also my spirit. You gave me back the woman I thought I had lost.`,
//   },
]

/** Reviews are pasted as Google shows them, so names arrive in any case. */
const toTitle = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")

/** Below this many characters the clamped text already shows in full. */
const CLAMP_CHARS = 220

export default function GynGoogleReviews() {
  const [carouselRef, carousel] = useEmblaCarousel({ align: "start", loop: false })
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [snaps, setSnaps] = useState<number[]>([])
  const [current, setCurrent] = useState(0)

  // Arrows and dots follow the carousel: they disable at the ends, and the
  // whole control row disappears when every card already fits on screen.
  useEffect(() => {
    if (!carousel) return
    const sync = () => {
      setCanPrev(carousel.canScrollPrev())
      setCanNext(carousel.canScrollNext())
      setSnaps(carousel.scrollSnapList())
      setCurrent(carousel.selectedScrollSnap())
    }
    sync()
    carousel.on("select", sync)
    carousel.on("reInit", sync)
    return () => {
      carousel.off("select", sync)
      carousel.off("reInit", sync)
    }
  }, [carousel])

  const scrollable = canPrev || canNext

  const arrowClass =
    "flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[var(--g-accent-deep)] disabled:pointer-events-none disabled:opacity-35"

  return (
    <section
      id="reviews"
      aria-labelledby="google-reviews-heading"
      className="relative isolate overflow-hidden bg-[var(--g-accent-deep)] text-[var(--g-ink)]"
      style={{ backgroundImage: "url('/clinic-1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#270817]/80 via-[#270817]/60 to-[#270817]/80" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-15">
        <div className="text-center text-white">
          <p className="g-eyebrow justify-center" style={{ color: "#FFFFFF" }}>
            Patient Experiences
          </p>
          <h2 id="google-reviews-heading" className="mt-5" style={{ color: "#FFFFFF" }}>
            Google Reviews
          </h2>
          <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-[0.9rem] text-white/80">
            <FcGoogle className="h-5 w-5 flex-none" aria-hidden />
            Shared by patients on our Google Business profile
          </p>
        </div>

        <div
          ref={carouselRef}
          id="google-review-row"
          className="mt-10 overflow-hidden"
          role="region"
          aria-label="Patient review carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              if (event.key === "ArrowLeft") carousel?.scrollPrev()
              else carousel?.scrollNext()
            }
          }}
        >
          {/* Cards stretch to the tallest one in view, so a row always ends on
              one line however long each review is. */}
          <div className="-ml-5 flex touch-pan-y">
            {reviews.map((review, index) => {
              const name = toTitle(review.name)
              const isExpanded = !!expanded[review.name]
              const isLong = review.text.length > CLAMP_CHARS
              const textId = `google-review-text-${index}`
              return (
                <div
                  key={review.name}
                  className="flex min-w-0 flex-[0_0_100%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${reviews.length}`}
                >
                  <article className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.6)] sm:p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5" aria-label="5 out of 5 stars" role="img">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star key={starIndex} aria-hidden className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                      <Quote aria-hidden className="h-7 w-7 text-[var(--g-bone-line)]" />
                    </div>

                    <div
                      className={`mt-4 flex-1 ${isExpanded ? "max-h-[260px] overflow-y-auto overscroll-contain pr-1" : ""}`}
                      tabIndex={isExpanded ? 0 : undefined}
                      aria-label={isExpanded ? `Full review by ${name}` : undefined}
                      data-lenis-prevent={isExpanded ? true : undefined}
                    >
                      <p
                        id={textId}
                        className={`whitespace-pre-line text-[0.95rem] leading-relaxed text-neutral-700 ${isExpanded || !isLong ? "" : "line-clamp-6"}`}
                      >
                        {review.text}
                      </p>
                    </div>

                    {isLong && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={textId}
                        aria-label={`${isExpanded ? "Hide" : "Read more of"} ${name}'s review`}
                        onClick={() => setExpanded((previous) => ({ ...previous, [review.name]: !previous[review.name] }))}
                        className="mt-3 self-start text-[0.85rem] font-bold text-[var(--g-accent-deep)] underline-offset-4 hover:underline"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}

                    {/* Reviewer, as a footer — the quote reads first, the name signs it. */}
                    <div className="mt-6 flex items-center gap-3 border-t border-[var(--g-bone-line)] pt-5">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--g-accent-deep)] text-[0.85rem] font-bold text-white"
                      >
                        {name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.95rem] font-bold leading-snug text-black">{name}</p>
                        <p className="mt-0.5 text-[0.78rem] text-neutral-500">Google review</p>
                      </div>
                      <FcGoogle className="h-6 w-6 shrink-0" aria-label="Google" role="img" />
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        {/* Controls under the row, only when there is something to scroll to. */}
        {scrollable && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous reviews"
              aria-controls="google-review-row"
              disabled={!canPrev}
              onClick={() => carousel?.scrollPrev()}
              className={arrowClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <div className="flex items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  onClick={() => carousel?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next reviews"
              aria-controls="google-review-row"
              disabled={!canNext}
              onClick={() => carousel?.scrollNext()}
              className={arrowClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
