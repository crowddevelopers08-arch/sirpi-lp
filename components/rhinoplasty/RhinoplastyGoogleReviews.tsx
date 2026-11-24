"use client";

import { ExternalLink, Quote, Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const reviews = [
  {
    name: "Afrin S",
    url: "https://www.google.com/maps/contrib/102194751207856932588/reviews?hl=en-GB",
    text: "I’m really happy with my rhinoplasty experience. From the initial consultation to the surgery and follow-up appointments, the doctor and staff were very supportive and professional. My concerns were listened to carefully, and I felt comfortable throughout the process. I’m very pleased with how my nose is healing and with the overall result. Thank you to the entire team for taking such good care of me. Highly recommended!",
  },
  {
    name: "Jeya Raj",
    url: "https://www.google.com/maps/contrib/102854741568194958916/reviews?hl=en-GB",
    text: "Recently, I had plastic surgery on my right wrist due to tendon and nerve damage. I am now seeing excellent results and can write, drive, and do regular work. Thank you for the exceptional care during my hand reconstruction. Being able to use my right hand again means the world to me. Your skill as a surgeon and your kindness throughout the process made a scary situation much easier to handle. I am so grateful for the results. Thank you very much to Dr. A.R. Srigireesh sir and his team.",
  },
  {
    name: "Siva Murugan",
    url: "https://www.google.com/maps/contrib/104209753624374145074/reviews?hl=en-IN",
    text: "Thank you for giving a very comfortable experience. The best plastic surgeon and aesthetic centre in Coimbatore. All the very best for the future.",
  },
] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function RhinoplastyGoogleReviews() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="reviews" aria-labelledby="rhinoplasty-reviews-title" className="relative isolate overflow-hidden bg-[#5A0D35] py-9 font-[family-name:var(--font-lato)] sm:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,#4A082B_0%,#6A113D_48%,#8E244F_100%)]" />
        <span className="absolute -top-44 -right-24 h-[420px] w-[420px] rounded-full bg-[#ED575C]/25 blur-3xl" />
        <span className="absolute -bottom-52 -left-32 h-[460px] w-[460px] rounded-full border-[56px] border-white/[0.06]" />
        <span className="absolute top-12 right-[12%] h-28 w-28 rounded-full border border-white/[0.12]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-[5%] xl:px-[6%]">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] text-white uppercase sm:text-[13px]">
            <FcGoogle className="h-4 w-4" aria-hidden /> Google Reviews
          </span>
          <h2 id="rhinoplasty-reviews-title" className="mt-2 text-[28px] leading-[1.2] font-extrabold text-white sm:text-[38px]">
            Trusted by our <span className="text-[#FFB2A4]">patients</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80 sm:text-[16px]">Real experiences shared on Google by patients of Sirpi Aesthetics.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {reviews.map((review) => {
            const isExpanded = expanded === review.name;
            const isLong = review.text.length > 220;

            return (
              <article key={review.name} className="flex min-h-[330px] flex-col rounded-[22px] border border-[#E9C9D7] bg-white p-5 transition-colors hover:border-[#DFA1B8] sm:p-6 lg:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars" role="img">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" aria-hidden />
                    ))}
                  </div>
                  <Quote className="h-7 w-7 shrink-0 text-[#EFD5E0]" aria-hidden />
                </div>

                <div className="mt-4 flex-1">
                  <p className={`text-[15px] leading-[1.65] text-[#513946] ${isExpanded || !isLong ? "" : "line-clamp-6"}`}>{review.text}</p>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : review.name)}
                      aria-expanded={isExpanded}
                      className="mt-3 text-[14px] font-bold text-[#6A113D] underline underline-offset-4 transition hover:text-[#ED575C]"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-[#F1DCE5] pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#6A113D] text-[13px] font-bold text-white" aria-hidden>
                    {initials(review.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <a href={review.url} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 truncate text-[15px] font-bold text-[#25101b] transition hover:text-[#ED575C]">
                      <span className="truncate">{review.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    </a>
                    <p className="mt-0.5 text-[12px] text-[#856d78]">Google review</p>
                  </div>
                  <FcGoogle className="h-6 w-6 shrink-0" aria-label="Google" role="img" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
