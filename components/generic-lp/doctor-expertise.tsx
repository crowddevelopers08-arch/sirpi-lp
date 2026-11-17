import Image from "next/image";
import { IMG } from "@/components/generic-lp/images";

/* Same credentials as the gynecomastia and hair transplant pages. */
const DOCTOR = {
  name: "Dr. Srigireesh A R",
  qualification: "MBBS, MS, MCh & DrNB (Plastic Surgery)",
  designation: "Plastic & Cosmetic Surgeon",
  registration: "TNMC Reg. No. 106297",
  experience: "11+ Years",
};

const FACTS = [
  {
    label: "Qualification",
    value: DOCTOR.qualification,
    icon: <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 9.5v3.2c0 1.6 2.7 3.3 6 3.3s6-1.7 6-3.3v-3.2l-6 3-6-3Z" />,
  },
  {
    label: "Designation",
    value: DOCTOR.designation,
    icon: <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 12c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5Z" />,
  },
  {
    label: "Registration",
    value: DOCTOR.registration,
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Zm-1.2 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />,
  },
  {
    label: "Experience",
    value: `${DOCTOR.experience} post MBBS`,
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l4 2.3-1 1.7-5-2.9V7h2Z" />,
  },
];

export default function DoctorExpertise() {
  return (
    <section
      id="specialists"
      className="relative w-full overflow-hidden bg-[#6A113D] bg-[linear-gradient(135deg,#7A234D_0%,#6A113D_45%,#571032_100%)] py-10 font-[family-name:var(--font-lato)] sm:py-20 lg:py-10"
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#ED575C]/[0.14]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-y-6 px-4 sm:px-8 lg:grid-cols-2 lg:gap-x-[4vw] lg:gap-y-0 lg:px-[11.1%]">
        {/* ---------- doctor photo ---------- */}
        <div className="relative order-3 mx-auto mt-4 h-[440px] w-full max-w-[440px] sm:h-[540px] lg:order-none lg:mt-0 lg:h-[34vw] lg:max-h-[640px] lg:min-h-[500px] lg:max-w-none">
          <div className="absolute inset-x-[3%] bottom-0 top-[3%] rounded-t-[999px] border-2 border-[#F6A9AC]/70" />
          <div className="absolute inset-x-[8%] bottom-0 top-[8%] overflow-hidden rounded-t-[999px] bg-white/10">
            <Image
              src={IMG.doctor}
              alt={`${DOCTOR.name}, ${DOCTOR.designation}`}
              fill
              sizes="(min-width:1024px) 34vw, 90vw"
              className="object-cover object-top"
            />
          </div>

          {/* floating chips */}
          <div className="absolute right-0 top-[47%] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 sm:right-[-2%] sm:top-[12%]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6A113D] text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                {FACTS[3].icon}
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-[20px] font-black text-[#1f0a14]">{DOCTOR.experience}</div>
              <div className="text-[12px] font-bold text-[#5b4450]">Experience</div>
            </div>
          </div>

          <div className="absolute bottom-[14%] left-0 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 sm:left-[-2%]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ED575C] text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                {FACTS[0].icon}
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-[16px] font-black text-[#1f0a14]">MCh &amp; DrNB</div>
              <div className="text-[12px] font-bold text-[#5b4450]">Plastic Surgery</div>
            </div>
          </div>
        </div>

        {/* ---------- text ---------- */}
        <div className="max-lg:contents lg:flex lg:flex-col lg:items-start">
          <div className="order-1 inline-flex items-center gap-2 justify-self-start rounded-full border border-white/25 bg-white py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-[#6A113D] lg:order-none">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6A113D] text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
              </svg>
            </span>
            Doctor Expertise
          </div>

          <h2 className="order-2 mt-0 text-[26px] font-black leading-[1.22] tracking-[-0.015em] text-white sm:text-[34px] lg:order-none lg:mt-5 lg:text-[max(28px,2.3vw)]">
            Planned and performed by{" "}
            <span className="bg-gradient-to-r from-white to-[#F6A9AC] bg-clip-text text-transparent">a certified Plastic Surgeon</span>
          </h2>

          {/* doctor card */}
          <div className="order-4 mt-2 w-full max-w-[560px] rounded-[22px] border border-white/10 bg-white p-6 sm:p-7 lg:order-none lg:mt-7">
            <div className="flex items-center gap-4">
              <span className="h-12 w-1.5 rounded-full bg-gradient-to-b from-[#6A113D] to-[#ED575C]" />
              <div>
                <div className="text-[19px] font-black leading-tight text-[#1f0a14] sm:text-[22px]">{DOCTOR.name}</div>
                <div className="mt-1 text-[13px] font-medium text-[#5b4450]">
                  {DOCTOR.designation} &middot; Sirpi Aesthetics, Coimbatore
                </div>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-gradient-to-r from-[#6A113D]/30 via-[#6A113D]/10 to-transparent" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-2xl bg-[#FFF8FA] px-4 py-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#6A113D]/10 text-[#6A113D]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      {f.icon}
                    </svg>
                  </span>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a6a78]">{f.label}</div>
                    <div className="text-[14px] font-bold leading-tight text-[#1f0a14]">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
