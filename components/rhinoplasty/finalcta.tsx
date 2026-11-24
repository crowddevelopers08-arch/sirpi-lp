import { PHONE_DISPLAY, PHONE_TEL } from "@/components/elite-minima/config";

function ProfileIllustration() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden>
      <circle cx="220" cy="182" r="138" fill="#F9E8EF" />
      <circle cx="220" cy="182" r="104" fill="none" stroke="#E8C5D3" strokeDasharray="4 7" />
      <path d="M165 35c25 44 17 103 27 142 8 29 37 55 58 83 9 12 6 23-9 25-18 2-30 7-34 17-4 9 8 15 8 25 0 12-8 17-1 26 7 8 4 18-8 25" fill="none" stroke="#6A113D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="m190 176 70 109" fill="none" stroke="#ED575C" strokeDasharray="6 7" strokeWidth="2" />
      <circle cx="190" cy="176" r="5" fill="#ED575C" />
      <circle cx="260" cy="285" r="5" fill="#ED575C" />
      <text x="274" y="224" fill="#6A113D" fontSize="13" fontWeight="700">Profile balance</text>
    </svg>
  );
}

export default function RhinoplastyConsultation() {
  return (
    <section id="consultation" aria-labelledby="rhinoplasty-consultation-title" className="relative overflow-hidden bg-[#FFF8FA] py-8 font-[family-name:var(--font-lato)] sm:py-10">
      <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-[#ED575C]/10" />
      <div aria-hidden className="absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-[#6A113D]/[0.06]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-6 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)] lg:gap-x-12 lg:gap-y-5 lg:px-[7%]">
        <div className="order-1 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <span className="inline-flex rounded-full bg-[#F9E8EF] px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] text-[#6A113D] uppercase sm:text-[13px]">Your next step</span>
          <h2 id="rhinoplasty-consultation-title" className="mt-2 text-[28px] leading-[1.18] font-extrabold text-[#6A113D] sm:text-[38px]">
            Start with an <span className="text-[#ED575C]">expert assessment.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.65] text-[#5b4450] sm:text-[17px] lg:mx-0">
            Discuss your concerns, understand suitable options, and make an informed decision with a certified Plastic Surgeon.
          </p>
        </div>
        <div className="order-2 mx-auto w-full max-w-[340px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none">
          <div className="aspect-[10/9] rounded-[24px] border border-[#E8C5D3] bg-white p-3">
            <ProfileIllustration />
          </div>
        </div>
        <div className="order-3 flex flex-col justify-center gap-3 sm:flex-row lg:col-start-1 lg:row-start-2 lg:justify-start">
          <a href="#enquire" className="inline-flex h-12 items-center justify-center rounded-full bg-[#ED575C] px-7 text-[16px] font-bold text-white transition hover:brightness-95">Book Your Consultation</a>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#6A113D]/20 bg-white px-7 text-[16px] font-bold text-[#6A113D] transition hover:border-[#6A113D]">Call {PHONE_DISPLAY}</a>
        </div>
      </div>
    </section>
  );
}
