"use client"

import { useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

const reviews = [
  {
    name: "N Chithu",
    text: `I am very happy and satisfied with the surgery done here. The doctor Mr. Sri greesh is very friendly and approachable, so I never felt any hesitation while discussing my concerns. All the services and care provided were excellent.

It felt just like someone from our own family was taking care of us, so there was no fear or confusion at any stage. I had my tummy tuck surgery here and was discharged exactly on the 3rd day after the procedure.

Now it has been 14 days since the surgery, and I feel about 70% recovered. Thank you to the doctor and the entire team for the wonderful care and support.`,
  },
  {
    name: "Jeya Raj",
    text: `Recently, I had plastic surgery on my right wrist due to tendon and nerve damage. I am now seeing excellent results and can write, drive, and do regular work. Thank you for the exceptional care during my hand reconstruction. Being able to use my right hand again means the world to me. Your skill as a surgeon and your kindness throughout the process made a scary situation much easier to handle. I am so grateful for the results." Thank you very much for Dr. A.R Srigrieesh sir and his team..`,
  },
  {
    name: "Raja Sarran",
    text: `I had a very good experience with Dr. Srigireesh Sir and team…they were so friendly that they explained me everything and the procedures were done with atmost care and everything was explained to me in prior and Im seeing good results and the staffs were so kind and accessible at all times`,
  },
  {
    name: "Gnana Ambika",
    text: `My Journey of Rebirth – With Sirpi Aesthetics and Dr. Srigireesh

At 40, after two children born ten years apart, I had lost a part of myself. Years of motherhood left me with a saggy breast, a big tummy, and the scars of body shaming. No matter how strong I appeared, deep down I felt unseen and broken. Every shopping trip reminded me of that pain — from once wearing medium sizes to now searching for XL.

That’s when I found Sirpi Aesthetics, led by Dr. Srigireesh, a truly gifted and compassionate Cosmetic Surgeon in Coimbatore. I was terrified — even a single IV or IM injection used to frighten me. But the doctor’s calm assurance, his patience, and his gentle confidence gave me the courage to say yes to a change I had only dreamed of.

My Mommy Makeover surgery took nearly 10 hours, but it changed my life forever. When I saw myself after recovery, tears rolled down my face. For the first time in years, I saw a woman who was happy, confident, and free.

Every person at Sirpi Aesthetics became part of this transformation: The staff nurses were so courteous and kind. The lymphatic therapist, Mrs. Rabia, guided me through five careful sessions that helped my body heal beautifully.

The boutique-style center made me feel at home, helping me recover faster and with so much comfort.
I received personalized attention, filled with warmth and care.

The most emotional part of this journey was my husband’s unwavering support. He wasn’t just my partner — he was my strength. He never judged my wish to feel beautiful again; instead, he encouraged me, calmed my fears, and reminded me of my worth. When I doubted myself, he believed in me. His love made this transformation complete.

Now, when I walk into Lifestyle, I no longer reach for XL — I confidently pick medium-sized dresses. My teen daughter now jokingly calls me “Sissy” — and every time she says it, I smile with pride.

Today, I not only look 10 years younger — I feel 10 years lighter, freer, and stronger. My physical ability, energy, and confidence have all returned in ways I never imagined.

Thank you, Dr. Srigireesh and Sirpi Aesthetics, for sculpting not just my body, but also my spirit. You gave me back the woman I thought I had lost.`,
  },
]

export default function GynGoogleReviews() {
  const [carouselRef, carousel] = useEmblaCarousel({ align: "start", loop: false })
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <section id="reviews" aria-labelledby="google-reviews-heading" className="relative isolate overflow-hidden bg-[var(--g-accent-deep)] text-[var(--g-ink)]" style={{ backgroundImage: "url('/clinic-1.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#270817]/70 via-[#270817]/45 to-[#270817]/65" />
      </div>
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-20 lg:py-20">
        <div className="text-center text-white">
          <p className="g-eyebrow" style={{ color: "#FFFFFF" }}>Patient Experiences</p>
          <h2 id="google-reviews-heading" className="mt-5">Google Reviews</h2>
        </div>

        <div className="mt-8 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:mt-10 sm:gap-4">
          <button type="button" aria-label="Previous reviews" aria-controls="google-review-row" onClick={() => carousel?.scrollPrev()} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--g-bone-line)] bg-white text-[var(--g-accent-deep)] transition-colors hover:bg-[var(--g-accent-deep)] hover:text-white">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div ref={carouselRef} id="google-review-row" className="overflow-hidden" role="region" aria-label="Patient review carousel" aria-roledescription="carousel" tabIndex={0} onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              if (event.key === "ArrowLeft") carousel?.scrollPrev()
              else carousel?.scrollNext()
            }
          }}>
            <div className="-ml-4 flex touch-pan-y">
              {reviews.map((review, index) => {
                const isExpanded = !!expanded[review.name]
                const textId = `google-review-text-${index}`
                return (
                  <div key={review.name} className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] xl:flex-[0_0_25%]" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${reviews.length}`}>
                    <article className="flex h-[380px] flex-col rounded-2xl border border-[var(--g-bone-line)] bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-3 border-b border-[var(--g-bone-line)] pb-4">
                        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--g-bone-2)] text-sm font-bold text-[var(--g-accent-deep)]">
                          {review.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.95rem] font-bold leading-snug">{review.name}</p>
                          <p className="mt-1 text-xs text-neutral-500">Google review</p>
                        </div>
                        <FcGoogle className="h-6 w-6 shrink-0" aria-label="Google" role="img" />
                      </div>
                      <div className="mt-4 flex shrink-0 gap-1" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star key={starIndex} aria-hidden className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote aria-hidden className="mb-3 mt-3 h-5 w-5 shrink-0 text-[var(--g-accent-deep)]" />
                      <div className={`min-h-0 flex-1 ${isExpanded ? "overflow-y-auto overscroll-contain" : "overflow-hidden"}`} tabIndex={isExpanded ? 0 : undefined} aria-label={isExpanded ? `Full review by ${review.name}` : undefined} data-lenis-prevent={isExpanded ? true : undefined}>
                        <p id={textId} className={`whitespace-pre-line text-[0.95rem] leading-relaxed ${isExpanded ? "" : "line-clamp-6"}`}>{review.text}</p>
                      </div>
                      <button type="button" aria-expanded={isExpanded} aria-controls={textId} aria-label={`${isExpanded ? "Hide" : "Read more of"} ${review.name}'s review`} onClick={() => setExpanded((previous) => ({ ...previous, [review.name]: !previous[review.name] }))} className="mt-4 self-start text-sm font-bold text-[var(--g-accent-deep)] underline-offset-4 hover:underline">
                        {isExpanded ? "Hide" : "Read more"}
                      </button>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>

          <button type="button" aria-label="Next reviews" aria-controls="google-review-row" onClick={() => carousel?.scrollNext()} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--g-bone-line)] bg-white text-[var(--g-accent-deep)] transition-colors hover:bg-[var(--g-accent-deep)] hover:text-white">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
