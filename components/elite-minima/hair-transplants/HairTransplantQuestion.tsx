"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import BrandLogo, { RevealStyles } from "./BrandLogo";
import FloatingBackground from "./FloatingBackground";
import ThankYouScreen, { type ThankYouVariant } from "./ThankYouScreen";
import { revealDelay } from "./reveal";
import { ADDRESS_FULL } from "../config";
import { track } from "../track";
import {
  BARRIER_MESSAGES,
  CALL_SLOTS,
  CANNOT_TRAVEL,
  EXIT_MESSAGE,
  DOCTOR_EXPERIENCE,
  MESSAGE_CLOSE,
  NOT_INTERESTED,
  QUESTIONS,
  type QuestionId,
} from "./form-content";

/*
  Flow (one screen at a time, Typeform-style):

    1 concern → 2 budget → 3 travel ─┬─ can travel ─────────────────────────────┐
                                     └─ cannot → 3a reason → 3b consider → 3c info ┤
                                                    3c "No, not interested" → exit  │
    4 considering → 5 barrier → message (per Q5 answer) → 6 name + phone ←──────────┘
    → 7 city → 8 preferred date & time → submit → thank you

  A "Yes" on 3c carries on through the form and the lead is filed under the
  Outstation – Not Ready to Travel but Interested source.
*/

type Phase = QuestionId | "message" | "contact" | "city" | "schedule" | "exit" | "thankyou";

const QUESTION_IDS = Object.keys(QUESTIONS) as QuestionId[];
const isQuestion = (phase: Phase): phase is QuestionId => (QUESTION_IDS as string[]).includes(phase);

const clinicGallery = [
  { src: "/clini01.JPG", alt: "Sirpi Aesthetics clinic, Coimbatore" },
  { src: "/hair-treatment-1.jpg", alt: "Dr. Srigireesh performing a hair transplant procedure at Sirpi Aesthetics" },
  { src: "/hair-treatment-2.jpg", alt: "Dr. Srigireesh treating a patient's scalp during a hair transplant at Sirpi Aesthetics" },
  { src: "/clinic-4.jpg", alt: "Treatment area at Sirpi Aesthetics" },
];
const resultsGallery = [
  { src: "/HT-PT-3.jpg", alt: "Hair transplant before and after, 3-year result, by Dr. Srigireesh at Sirpi Aesthetics" },
  { src: "/bfafs-2.png", alt: "Procedure room at Sirpi Aesthetics, Coimbatore" },
  { src: "/bfafs-3.png", alt: "Hair transplant before and after result by Dr. Srigireesh at Sirpi Aesthetics" },
  { src: "/HT-RESULTS-2.jpg", alt: "Dr. Srigireesh during a hair transplant procedure at Sirpi Aesthetics" },
];
const doctor = { src: "/DSC3351.jpg", alt: "Dr. Srigireesh A R, Plastic Surgeon at Sirpi Aesthetics" };
const doctorMessage = { src: "/dr-srigireesh-suit.jpg", alt: "Dr. Srigireesh A R, Plastic Surgeon at Sirpi Aesthetics" };
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`Sirpi Aesthetics, ${ADDRESS_FULL}`)}&output=embed`;

type Visual = "gallery" | "doctor" | "map" | "clinic" | "result";
const VISUAL: Partial<Record<Phase, Visual>> = {
  concern: "gallery",
  budget: "doctor",
  travel: "map",
  travelReason: "map",
  travelConsider: "map",
  travelInfo: "map",
  considering: "clinic",
  barrier: "result",
  message: "doctor",
};

/* Shared class strings — the original form's look, in Sirpi colours. */
const BTN =
  "reveal-in mt-[clamp(12px,3svh,28px)] h-[clamp(34px,5svh,44px)] min-w-[60px] cursor-pointer rounded-lg border-0 bg-[#6A113D] px-4 text-xl font-semibold text-white hover:bg-[#571032] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f0a14] disabled:cursor-wait disabled:opacity-60";
const TITLE = "reveal-in mb-[clamp(12px,3svh,30px)] p-0 text-[clamp(17px,min(1.76vw,3.5svh),30px)] leading-[1.3] tracking-[-.4px]";
const BADGE =
  "absolute top-[7px] -left-[31px] grid h-5 min-w-[17px] place-items-center rounded bg-[#6A113D] px-1 text-sm font-bold text-white [@media(max-width:440px)]:top-1 [@media(max-width:440px)]:-left-7";
const FIELD_LABEL = "mb-1.5 block text-[clamp(12px,1vw,15px)] text-[#1f0a14]/70";
const FIELD =
  "w-full border-0 border-b border-[#1f0a14]/25 bg-transparent pb-2 text-[clamp(14px,1.4vw,19px)] text-[#1f0a14] outline-none placeholder:text-[#1f0a14]/36 focus:border-[#6A113D]";
const PANEL =
  "reveal-in relative w-full min-h-0 justify-self-center overflow-hidden border border-[#1f0a14]/10 [@media(max-width:700px)]:h-full [@media(max-width:700px)]:max-h-[30svh] [@media(max-width:700px)]:max-w-[360px] [@media(max-width:700px)]:aspect-auto";

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function HairTransplantQuestion() {
  const [history, setHistory] = useState<Phase[]>(["concern"]);
  const [answers, setAnswers] = useState<Record<QuestionId, number>>(
    () => Object.fromEntries(QUESTION_IDS.map((id) => [id, 0])) as Record<QuestionId, number>,
  );
  const [contact, setContact] = useState({ name: "", phone: "", city: "", date: "", slot: "" });
  const [variant, setVariant] = useState<ThankYouVariant>("booked");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const phase = history[history.length - 1];
  const question = isQuestion(phase) ? QUESTIONS[phase] : null;
  const cannotTravel = answers.travel === CANNOT_TRAVEL;
  const outstation = cannotTravel && answers.travelInfo !== NOT_INTERESTED;

  const go = (next: Phase) => {
    setFieldError("");
    setHistory((h) => [...h, next]);
  };
  const back = () => {
    setFieldError("");
    setSaveError("");
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  };

  /** Where each question leads, given its answer. */
  function nextAfter(id: QuestionId): Phase {
    switch (id) {
      case "concern": return "budget";
      case "budget": return "travel";
      case "travel": return answers.travel === CANNOT_TRAVEL ? "travelReason" : "considering";
      case "travelReason": return "travelConsider";
      case "travelConsider": return "travelInfo";
      case "travelInfo": return answers.travelInfo === NOT_INTERESTED ? "exit" : "considering";
      case "considering": return "barrier";
      case "barrier": return "message";
    }
  }
  const advanceQuestion = () => {
    if (question) go(nextAfter(question.id));
  };

  function setAnswer(id: QuestionId, value: number) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  // A–F keys pick an option, as in the original form.
  useEffect(() => {
    if (!question) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const index = "abcdef".indexOf(event.key.toLowerCase());
      if (event.key.length !== 1 || index < 0 || index >= question.options.length) return;
      setAnswer(question.id, index);
      inputs.current[index]?.focus();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [question]);

  function resetAll() {
    setHistory(["concern"]);
    setAnswers(Object.fromEntries(QUESTION_IDS.map((id) => [id, 0])) as Record<QuestionId, number>);
    setContact({ name: "", phone: "", city: "", date: "", slot: "" });
    setSaveError("");
    setFieldError("");
  }

  const setField = (field: keyof typeof contact, value: string) => setContact((c) => ({ ...c, [field]: value }));

  function handleContact(event: FormEvent) {
    event.preventDefault();
    if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\D/g, "").slice(-10))) {
      setFieldError("Please enter a valid 10-digit mobile number.");
      return;
    }
    go("city");
  }

  function handleCity(event: FormEvent) {
    event.preventDefault();
    go("schedule");
  }

  /**
   * Saved to the Postgres database and sent on to TeleCRM by
   * app/hair-transplant/api/leads (lib/leads.ts), which re-checks every answer
   * against the same option lists before storing it. Returns "" on success,
   * otherwise the message to show.
   */
  function postLead(): Promise<string> {
    return fetch("/hair-transplant/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name.trim(),
        phone: contact.phone.replace(/\D/g, "").slice(-10),
        city: contact.city.trim(),
        answers,
        callDate: contact.date,
        callSlot: contact.slot,
        pageUrl: window.location.href,
      }),
    }).then(
      async (response) => {
        const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
        return response.ok && data?.ok ? "" : data?.error ?? "Something went wrong. Please try again or call us.";
      },
      () => "Network error. Please check your connection and try again.",
    );
  }

  /** "No, I am not interested" — the exit screen still takes a name and number. */
  async function handleExit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\D/g, "").slice(-10))) {
      setFieldError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setFieldError("");
    setSaving(true);
    setSaveError("");
    const error = await postLead();
    setSaving(false);
    if (error) {
      setSaveError(error);
      return;
    }
    track("lead_submit", { branch: "Sirpi Aesthetics — Hair Transplant", notInterested: true });
    setVariant("closed");
    go("thankyou");
  }

  async function handleSchedule(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    if (contact.date && new Date(`${contact.date}T00:00:00`).getDay() === 0) {
      setFieldError("The clinic is closed on Sundays — please choose Monday to Saturday.");
      return;
    }
    setFieldError("");
    setSaving(true);
    setSaveError("");

    const error = await postLead();

    setSaving(false);
    if (error) {
      setSaveError(error);
      return;
    }
    track("lead_submit", { branch: "Sirpi Aesthetics — Hair Transplant", outstation });
    setVariant(outstation ? "outstation" : "booked");
    go("thankyou");
  }

  /* ── End-of-form screens ─────────────────────────────────────────────── */

  if (phase === "thankyou") {
    return <ThankYouScreen name={contact.name} phone={contact.phone} variant={variant} onHome={resetAll} />;
  }

  const nav = (
    <nav
      className="fixed right-[7px] bottom-3 flex gap-0.5 [&_button]:grid [&_button]:h-[35px] [&_button]:w-[34px] [&_button]:cursor-pointer [&_button]:place-items-center [&_button]:border-0 [&_button]:bg-[#6A113D] [&_button]:p-1.5 [&_button]:text-white [&_button:first-child]:rounded-l-[9px] [&_button:last-child]:rounded-r-[9px] [&_button:disabled]:cursor-default [&_button:disabled]:bg-[#6A113D]/25 [&_button:disabled]:text-white [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#1f0a14] [&_svg]:w-[23px] [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-2 [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
      aria-label="Question navigation"
    >
      <button type="button" onClick={back} disabled={history.length === 1} aria-label="Previous question">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 15 7-7 7 7" /></svg>
      </button>
      <button type="button" onClick={advanceQuestion} disabled={!question} aria-label="Next question">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 9 7 7 7-7" /></svg>
      </button>
    </nav>
  );

  if (phase === "exit") {
    return (
      <main key="exit" className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#FFF8FA] px-[7vw] py-24 text-[#1f0a14] font-[family-name:var(--font-space-grotesk)]">
        <RevealStyles />
        <FloatingBackground />
        <BrandLogo />
        <div className="relative max-w-[620px]">
          <span className="absolute top-0 -left-7 font-serif text-[34px] leading-none text-[#6A113D]" aria-hidden="true">&ldquo;</span>
          <p className="reveal-in text-[clamp(18px,2.2vw,32px)] leading-[1.35] tracking-[-.3px]" style={revealDelay(0)}>{EXIT_MESSAGE}</p>
          <form onSubmit={handleExit} className="mt-[clamp(18px,3.5svh,32px)] max-w-[446px]">
            <p className="reveal-in mb-[clamp(12px,2.4svh,22px)] text-[clamp(13px,min(1.25vw,2.5svh),18px)] leading-[1.45] text-[#1f0a14]/75" style={revealDelay(1)}>
              Before you go, please leave your name and number in case you&rsquo;d like information later.
            </p>
            <div className="flex flex-col gap-[clamp(14px,2.6svh,26px)]">
              <label className="reveal-in block" style={revealDelay(2)}>
                <span className={FIELD_LABEL}>Name*</span>
                <input className={FIELD} type="text" placeholder="Your full name" required autoComplete="name" value={contact.name} onChange={(e) => setField("name", e.target.value)} />
              </label>
              <label className="reveal-in block" style={revealDelay(3)}>
                <span className={FIELD_LABEL}>Phone number*</span>
                <div className="flex items-center gap-2 border-b border-[#1f0a14]/25 pb-2 focus-within:border-[#6A113D]">
                  <span className="shrink-0 text-[clamp(14px,1.4vw,19px)] text-[#1f0a14]/70" aria-hidden="true">🇮🇳 +91</span>
                  <span className="h-4 w-px shrink-0 bg-[#1f0a14]/20" aria-hidden="true" />
                  <input className="min-w-0 flex-1 border-0 bg-transparent text-[clamp(14px,1.4vw,19px)] text-[#1f0a14] outline-none placeholder:text-[#1f0a14]/36" type="tel" inputMode="numeric" placeholder="98765 43210" required autoComplete="tel-national" value={contact.phone} onChange={(e) => setField("phone", e.target.value)} />
                </div>
              </label>
            </div>
            {fieldError && <p className="mt-3 text-sm font-medium text-[#6A113D]" role="alert">{fieldError}</p>}
            <button
              type="submit"
              disabled={saving}
              className="reveal-in mt-[clamp(20px,4svh,36px)] h-[46px] cursor-pointer rounded-lg border-0 bg-[#6A113D] px-6 text-lg font-bold text-white hover:bg-[#571032] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f0a14] disabled:cursor-wait disabled:opacity-60"
              style={revealDelay(4)}
            >
              {saving ? "Submitting…" : "Submit"}
            </button>
            {saveError && <p className="mt-3 text-sm font-medium text-[#6A113D]" role="alert">{saveError}</p>}
          </form>
        </div>
        {nav}
      </main>
    );
  }

  /* ── Visual panel (right column) ─────────────────────────────────────── */

  const visual = VISUAL[phase];
  const panel =
    visual === "gallery" ? (
      <div className={`${PANEL} aspect-[3/2] max-w-[calc((100svh-164px)*1.5)]`} style={revealDelay(8)}>
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-0.5 bg-white">
          {clinicGallery.map((image) => (
            <div key={image.src} className="relative min-h-0 min-w-0 overflow-hidden">
              <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="(max-width: 700px) 41vw, 22vw" />
            </div>
          ))}
        </div>
      </div>
    ) : visual === "doctor" ? (
      <figure className={`${PANEL} flex aspect-[4/5] max-w-[calc((100svh-164px)*0.8)] flex-col bg-white`} style={revealDelay(8)}>
        <div className="relative min-h-0 flex-1">
          <Image src={phase === "message" ? doctorMessage.src : doctor.src} alt={doctor.alt} fill priority className="object-cover object-top" sizes="(max-width: 700px) 82vw, 35vw" />
        </div>
        <figcaption className="shrink-0 bg-[#6A113D] px-3 py-[clamp(6px,1.4svh,12px)] text-center text-[clamp(11px,1vw,15px)] font-semibold text-white">
          Dr. Srigireesh A R — Certified Plastic Surgeon
        </figcaption>
      </figure>
    ) : visual === "map" ? (
      <div className={`${PANEL} flex aspect-[8/5] max-w-[calc((100svh-164px)*1.6)] flex-col bg-white`} style={revealDelay(8)}>
        <div className="shrink-0 px-4 py-[clamp(8px,1.8svh,16px)] text-center">
          <h2 className="text-[clamp(18px,2.2vw,32px)] leading-[1.1] font-extrabold tracking-tight text-[#6A113D]">PEELAMEDU, COIMBATORE</h2>
        </div>
        <iframe className="min-h-0 w-full flex-1 border-0" src={mapUrl} title="Map of Sirpi Aesthetics, Coimbatore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    ) : visual === "result" ? (
      // object-contain: the photo is a side-by-side pair, so neither half may be cropped.
      <figure className={`${PANEL} m-0 flex aspect-[4/3] max-w-[calc((100svh-164px)*1.33)] flex-col bg-white`} style={revealDelay(8)}>
        <div className="relative min-h-0 flex-1">
          <Image src="/bfafs-1.JPG" alt="Hair transplant before and after result at Sirpi Aesthetics" fill priority className="object-contain" sizes="(max-width: 700px) 82vw, 43vw" />
        </div>
        <figcaption className="shrink-0 bg-[#6A113D] px-3 py-[clamp(6px,1.4svh,12px)] text-center text-[clamp(11px,1vw,15px)] font-semibold text-white">
          Before &amp; after — individual results may vary
        </figcaption>
      </figure>
    ) : visual === "clinic" ? (
      // Square panel of square cells, at every width, so the before/after cards
      // keep their "BEFORE / AFTER" labels instead of being cropped.
      <div className="reveal-in relative grid aspect-square w-full max-w-[calc(100svh-164px)] min-h-0 grid-cols-2 grid-rows-2 gap-2 justify-self-center [@media(max-width:700px)]:max-w-[30svh]" style={revealDelay(8)}>
        {resultsGallery.map((image) => (
          <div key={image.src} className="relative min-h-0 min-w-0 overflow-hidden rounded-lg border border-[#1f0a14]/10 bg-white">
            <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="(max-width: 700px) 15svh, 22vw" />
          </div>
        ))}
      </div>
    ) : null;

  /* ── Screen body ─────────────────────────────────────────────────────── */

  let body: React.ReactNode;

  if (question) {
    const selected = answers[question.id];
    body = (
      <>
        <form className="relative min-w-0 w-full" onSubmit={(event) => { event.preventDefault(); advanceQuestion(); }}>
          <span className={BADGE} aria-label={`Question ${question.label}`}>{question.label}</span>
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={TITLE} style={revealDelay(0)}>{question.title}</legend>
            <div className="flex w-full max-w-[542px] flex-col gap-1.5 [@media(max-width:900px)]:max-w-none">
              {question.options.map((option, i) => (
                <label
                  key={option}
                  className={`reveal-in relative flex min-h-[clamp(34px,5.8svh,49px)] cursor-pointer items-center gap-2 rounded-[10px] border border-[#1f0a14]/8 px-2.5 py-[clamp(4px,1svh,8px)] text-[clamp(13px,min(1.25vw,2.5svh),20px)] leading-[1.3] tracking-[-.3px] transition-[background,border-color] duration-150 hover:bg-[#6A113D]/6 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#6A113D]/30 ${selected === i ? "bg-[#6A113D]/5 outline-2 -outline-offset-1 outline-[#6A113D]" : "bg-[#1f0a14]/3"}`}
                  style={revealDelay(1 + i)}
                >
                  <input
                    className="absolute size-px opacity-0"
                    ref={(element) => { inputs.current[i] = element; }}
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={selected === i}
                    required
                    onChange={() => setAnswer(question.id, i)}
                  />
                  <span className={`grid h-[26px] flex-[0_0_25px] place-items-center rounded-[3px] border text-[13px] font-semibold tracking-normal ${selected === i ? "border-[#6A113D] bg-[#6A113D] text-white" : "border-[#1f0a14]/20 bg-white"}`} aria-hidden="true">
                    {"ABCDEF"[i]}
                  </span>
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button className={BTN} style={revealDelay(1 + question.options.length)} type="submit">OK</button>
          {question.id === "concern" && (
            <p className="reveal-in mt-[clamp(10px,2svh,18px)] max-w-[542px] text-[clamp(11px,min(.9vw,1.8svh),14px)] leading-[1.4] text-[#1f0a14]/50" style={revealDelay(2 + question.options.length)}>
              Results vary by individual. Suitability and graft requirement are confirmed after consultation.
            </p>
          )}
        </form>
        {panel}
      </>
    );
  } else if (phase === "message") {
    const paragraphs = BARRIER_MESSAGES[answers.barrier] ?? BARRIER_MESSAGES[BARRIER_MESSAGES.length - 1];
    body = (
      <>
        <div className="relative min-w-0 w-full">
          <span className="absolute top-0 -left-[27px] font-serif text-[34px] leading-none text-[#6A113D] [@media(max-width:440px)]:-left-6" aria-hidden="true">&ldquo;</span>
          <div className="flex max-w-[542px] flex-col gap-[clamp(10px,2svh,18px)] text-[clamp(13px,min(1.25vw,2.5svh),20px)] leading-[1.5] tracking-[-.3px] text-[#1f0a14]/85">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="reveal-in" style={revealDelay(i)}>{paragraph}</p>
            ))}
            {/* The surgeon's experience, set apart from the prose as two figures. */}
            <div className="reveal-in grid grid-cols-2 gap-2.5" style={revealDelay(paragraphs.length)}>
              {DOCTOR_EXPERIENCE.map((item) => (
                <div key={item.label} className="rounded-xl border-l-4 border-[#ED575C] bg-[#6A113D] px-[clamp(10px,1.1vw,16px)] py-[clamp(8px,1.5svh,14px)] text-white">
                  <p className="text-[clamp(18px,min(1.8vw,3.4svh),28px)] leading-none font-bold tracking-[-.3px]">{item.value}</p>
                  <p className="mt-1.5 text-[clamp(11px,min(.95vw,1.9svh),14px)] leading-[1.3] font-medium tracking-normal text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="reveal-in font-semibold text-[#1f0a14]" style={revealDelay(paragraphs.length + 1)}>{MESSAGE_CLOSE}</p>
          </div>
          <button className={BTN} style={revealDelay(paragraphs.length + 2)} type="button" onClick={() => go("contact")}>Continue</button>
        </div>
        {panel}
      </>
    );
  } else if (phase === "contact") {
    body = (
      <div className="col-span-2 flex w-full items-center justify-center [@media(max-width:700px)]:col-span-1">
        <form className="relative w-full max-w-[480px]" onSubmit={handleContact} noValidate={false}>
          <span className={BADGE} aria-label="Question 6">6</span>
          <p className={TITLE} style={revealDelay(0)}>Please enter your proper contact number so our team can reach you.*</p>
          <div className="flex w-full max-w-[446px] flex-col gap-[clamp(14px,2.6svh,26px)] [@media(max-width:900px)]:max-w-none">
            <label className="reveal-in block" style={revealDelay(1)}>
              <span className={FIELD_LABEL}>Name*</span>
              <input className={FIELD} type="text" placeholder="Your full name" required autoComplete="name" value={contact.name} onChange={(e) => setField("name", e.target.value)} />
            </label>
            <label className="reveal-in block" style={revealDelay(2)}>
              <span className={FIELD_LABEL}>Phone number*</span>
              <div className="flex items-center gap-2 border-b border-[#1f0a14]/25 pb-2 focus-within:border-[#6A113D]">
                <span className="shrink-0 text-[clamp(14px,1.4vw,19px)] text-[#1f0a14]/70" aria-hidden="true">🇮🇳 +91</span>
                <span className="h-4 w-px shrink-0 bg-[#1f0a14]/20" aria-hidden="true" />
                <input className="min-w-0 flex-1 border-0 bg-transparent text-[clamp(14px,1.4vw,19px)] text-[#1f0a14] outline-none placeholder:text-[#1f0a14]/36" type="tel" inputMode="numeric" placeholder="98765 43210" required autoComplete="tel-national" value={contact.phone} onChange={(e) => setField("phone", e.target.value)} />
              </div>
            </label>
          </div>
          {fieldError && <p className="mt-3 text-sm font-medium text-[#6A113D]" role="alert">{fieldError}</p>}
          <button className={BTN} style={revealDelay(3)} type="submit">OK</button>
        </form>
      </div>
    );
  } else if (phase === "city") {
    body = (
      <div className="col-span-2 flex w-full items-center justify-center [@media(max-width:700px)]:col-span-1">
        <form className="relative w-full max-w-[480px]" onSubmit={handleCity}>
          <span className={BADGE} aria-label="Question 7">7</span>
          <p className={TITLE} style={revealDelay(0)}>What city are you currently located in?*</p>
          <label className="reveal-in block max-w-[446px]" style={revealDelay(1)}>
            <span className={FIELD_LABEL}>City*</span>
            <input className={FIELD} type="text" placeholder="e.g. Coimbatore" required autoComplete="address-level2" value={contact.city} onChange={(e) => setField("city", e.target.value)} />
          </label>
          <button className={BTN} style={revealDelay(2)} type="submit">OK</button>
        </form>
      </div>
    );
  } else {
    // schedule
    body = (
      <div className="col-span-2 flex w-full items-center justify-center [@media(max-width:700px)]:col-span-1">
        <form className="relative w-full max-w-[480px]" onSubmit={handleSchedule}>
          <span className={BADGE} aria-label="Question 8">8</span>
          <p className={TITLE} style={revealDelay(0)}>When would you prefer to speak with our team?*</p>
          <div className="flex w-full max-w-[446px] flex-col gap-[clamp(14px,2.6svh,26px)] [@media(max-width:900px)]:max-w-none">
            <label className="reveal-in block" style={revealDelay(1)}>
              <span className={FIELD_LABEL}>Preferred date* (Mon–Sat)</span>
              <input className={FIELD} type="date" required min={todayISO()} value={contact.date} onChange={(e) => setField("date", e.target.value)} />
            </label>
            <label className="reveal-in block" style={revealDelay(2)}>
              <span className={FIELD_LABEL}>Preferred time*</span>
              <select className={`${FIELD} cursor-pointer`} required value={contact.slot} onChange={(e) => setField("slot", e.target.value)}>
                <option value="" disabled>Select a time</option>
                {CALL_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </label>
          </div>
          {fieldError && <p className="mt-3 text-sm font-medium text-[#6A113D]" role="alert">{fieldError}</p>}
          <button className={BTN} style={revealDelay(3)} type="submit" disabled={saving}>{saving ? "Submitting…" : "Submit"}</button>
          {saveError && <p className="mt-3 text-sm font-medium text-[#6A113D]" role="alert">{saveError}</p>}
        </form>
      </div>
    );
  }

  return (
    <main key={phase} className="relative isolate h-svh overflow-hidden bg-[#FFF8FA] text-[#1f0a14] font-[family-name:var(--font-space-grotesk)]">
      <RevealStyles />
        <FloatingBackground />
      <BrandLogo />
      <div className="grid h-full min-h-0 grid-cols-2 items-center gap-x-[8vw] overflow-y-auto px-[8vw] pt-[clamp(64px,12svh,100px)] pb-[clamp(44px,7svh,64px)] [@media(max-width:700px)]:grid-cols-1 [@media(max-width:700px)]:grid-rows-[auto_minmax(0,1fr)] [@media(max-width:700px)]:gap-4 [@media(max-width:700px)]:px-[9vw]">
        {body}
      </div>
      {nav}
    </main>
  );
}
