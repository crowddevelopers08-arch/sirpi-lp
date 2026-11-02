import "server-only";
import { prisma } from "./prisma";
import { CALL_SLOTS, CANNOT_TRAVEL, NOT_INTERESTED, NOT_INTERESTED_CATEGORY, OUTSTATION_CATEGORY, QUESTIONS, STANDARD_CATEGORY, type QuestionId } from "./form-options";

export type LeadInput = {
  name: string;
  phone: string;
  city: string;
  pageUrl: string;
  /** Index of the chosen option for each question id. */
  answers: Partial<Record<QuestionId, number>>;
  callDate: string;
  callSlot: string;
};

// TeleCRM wants the number with a country code; the form only collects Indian numbers.
function telecrmPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

type SavedLead = {
  name: string; phone: string; city: string; pageUrl: string;
  hairLoss: string; budget: string; travel: string;
  travelReason: string | null; travelConsider: string | null; travelInfo: string | null;
  considering: string | null; barrier: string | null; callDate: string | null; callSlot: string | null;
  category: string;
};

// The lead is already saved in our database, so a TeleCRM failure is logged and never shown to the visitor.
async function sendToTelecrm(lead: SavedLead) {
  const url = process.env.TELECRM_API_URL;
  const key = process.env.TELECRM_API_KEY;
  if (!url || !key) { console.error("TeleCRM is not configured: set TELECRM_API_URL and TELECRM_API_KEY"); return; }
  // One note per field (each shows as its own row on the lead timeline) plus a one-line summary.
  const notes: [string, string][] = [
    ["Source", "Sirpi Aesthetics hair transplant"],
    ["Category", lead.category],
    ["Name", lead.name],
    ["Phone", telecrmPhone(lead.phone)],
    ["City", lead.city || "Not asked"],
    ["Hair loss concern", lead.hairLoss],
    ["Investment range", lead.budget],
    ["Travel to Coimbatore", lead.travel],
    ...(lead.travelReason ? [
      ["Reason unable to travel", lead.travelReason],
      ["Would consider travelling", lead.travelConsider ?? ""],
      ["Wants information", lead.travelInfo ?? ""],
    ] as [string, string][] : []),
    ...(lead.considering ? [
      ["Considering for", lead.considering],
      ["Stopping them", lead.barrier ?? ""],
      ["Preferred call", `${lead.callDate ?? "Any day"}, ${lead.callSlot ?? "Any time"}`],
    ] as [string, string][] : []),
    ["Page URL", lead.pageUrl || "Unknown"],
  ];
  const actions = [
    { type: "SYSTEM_NOTE", text: `Details: ${notes.map(([label, value]) => `${label}: ${value}`).join(" | ")}` },
    ...notes.map(([label, value]) => ({ type: "SYSTEM_NOTE", text: `${label}: ${value}` })),
  ];
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ fields: { name: lead.name, phone: telecrmPhone(lead.phone) }, actions }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error("TeleCRM rejected lead", response.status, await response.text().catch(() => ""));
  } catch (error) {
    console.error("Failed to send lead to TeleCRM", error);
  }
}

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

/** The option text for `id`, or null when the index is missing or out of range. */
function option(answers: LeadInput["answers"] | undefined, id: QuestionId) {
  const index = answers?.[id];
  return Number.isInteger(index) ? QUESTIONS[id].options[index as number] ?? null : null;
}

// Anyone can POST to the API, so validate everything before saving.
export async function createLead(input: Partial<LeadInput> | null): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const name = clean(input?.name, 120);
  const phone = clean(input?.phone, 20);
  const city = clean(input?.city, 120);
  const pageUrl = clean(input?.pageUrl, 500);
  const callDate = clean(input?.callDate, 10);
  const callSlot = clean(input?.callSlot, 40);
  const digits = phone.replace(/\D/g, "");
  const answers = input?.answers;

  if (!name) return { ok: false, status: 400, error: "Please enter your name." };
  if (digits.length < 10 || digits.length > 13 || !/^[+\d\s()-]+$/.test(phone)) return { ok: false, status: 400, error: "Please enter a valid phone number." };
  if (callDate && !/^\d{4}-\d{2}-\d{2}$/.test(callDate)) return { ok: false, status: 400, error: "Please choose a valid date." };
  if (callSlot && !(CALL_SLOTS as readonly string[]).includes(callSlot)) return { ok: false, status: 400, error: "Please choose a valid time." };

  const hairLoss = option(answers, "concern");
  const budget = option(answers, "budget");
  const travel = option(answers, "travel");
  if (!hairLoss || !budget || !travel) return { ok: false, status: 400, error: "Please answer all the questions." };

  // The travel follow-ups only exist when they said they cannot travel.
  const cannotTravel = answers?.travel === CANNOT_TRAVEL;
  const travelReason = cannotTravel ? option(answers, "travelReason") : null;
  const travelConsider = cannotTravel ? option(answers, "travelConsider") : null;
  const travelInfo = cannotTravel ? option(answers, "travelInfo") : null;
  if (cannotTravel && (!travelReason || !travelConsider || !travelInfo)) return { ok: false, status: 400, error: "Please answer all the questions." };

  // "No, I am not interested" leaves at the exit screen with only a name and
  // number - no Q4/Q5, city or call time. Everyone else answers all of it.
  const notInterested = cannotTravel && answers?.travelInfo === NOT_INTERESTED;
  const considering = notInterested ? null : option(answers, "considering");
  const barrier = notInterested ? null : option(answers, "barrier");
  if (!notInterested) {
    if (!considering || !barrier) return { ok: false, status: 400, error: "Please answer all the questions." };
    if (!city) return { ok: false, status: 400, error: "Please enter your city." };
  }

  if (!process.env.DATABASE_URL) {
    console.error("Hair transplant lead not saved: DATABASE_URL is not set");
    return { ok: false, status: 503, error: "We couldn't save your details right now. Please call us and we'll book you in." };
  }

  const lead: SavedLead = {
    name, phone, city, pageUrl,
    hairLoss, budget, travel, travelReason, travelConsider, travelInfo, considering, barrier,
    callDate: notInterested ? null : callDate || null,
    callSlot: notInterested ? null : callSlot || null,
    category: notInterested ? NOT_INTERESTED_CATEGORY : cannotTravel ? OUTSTATION_CATEGORY : STANDARD_CATEGORY,
  };

  try {
    await prisma.lead.create({ data: { ...lead, pageUrl: pageUrl || null, locationComfortable: !cannotTravel } });
    await sendToTelecrm(lead);
    return { ok: true };
  } catch (error) {
    console.error("Failed to save lead", error);
    return { ok: false, status: 500, error: "Something went wrong. Please try again or call us." };
  }
}
