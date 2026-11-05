// Copy for the Sirpi Aesthetics hair transplant lead form.
// Every question, option and conditional message lives here, so wording
// changes never touch the flow in HairTransplantQuestion.tsx.

export const BRAND_COLOURS = {
  brand: "#6A113D", // Sirpi burgundy — buttons, selected states
  brandDark: "#571032", // hover
  accent: "#ED575C", // Sirpi coral — the logo dots
  tint: "#FFF8FA", // bone — page ground
  ink: "#1f0a14", // text
} as const

export type QuestionId = "concern" | "budget" | "travel" | "travelReason" | "travelConsider" | "travelInfo" | "considering" | "barrier"

export interface Question {
  id: QuestionId
  /** Shown in the number badge — "3a" etc. for the conditional travel branch. */
  label: string
  title: string
  options: readonly string[]
}

export const QUESTIONS: Record<QuestionId, Question> = {
  concern: {
    id: "concern",
    label: "1",
    title: "What is your current hair loss concern?",
    options: [
      "Receding hairline",
      "Crown / vertex thinning",
      "Bald patches",
      "Overall hair thinning",
      "Advanced hair loss",
      "Not sure — I need an assessment",
    ],
  },
  budget: {
    id: "budget",
    label: "2",
    title: "What investment range are you considering for your hair transplant?",
    options: [
      "₹40 / Graft–₹45 / Graft",
      "₹45 / Graft–₹50 / Graft",
      "₹50 / Graft",
      "I would like to understand the cost after assessment",
    ],
  },
  travel: {
    id: "travel",
    label: "3",
    title: "Are you comfortable travelling to Coimbatore for your hair transplant consultation and treatment?",
    options: [
      "Yes, I am from Coimbatore",
      "I am nearby and can travel",
      "I cannot travel to Coimbatore for treatment",
    ],
  },
  travelReason: {
    id: "travelReason",
    label: "3a",
    title: "What is the main reason you are unable to travel to Coimbatore?",
    options: [
      "Coimbatore is too far from my location",
      "I am looking for treatment in my city",
      "I cannot take time off for travel",
      "I am only exploring options currently",
      "Other",
    ],
  },
  travelConsider: {
    id: "travelConsider",
    label: "3b",
    title: "Would you consider travelling to Coimbatore if the treatment is suitable for you?",
    options: ["Yes, I can consider travelling", "No, I need treatment closer to home"],
  },
  travelInfo: {
    id: "travelInfo",
    label: "3c",
    title: "Would you still like to receive information about hair transplant treatment for future consideration?",
    options: ["Yes, send me the information", "No, I am not interested"],
  },
  considering: {
    id: "considering",
    label: "4",
    title: "How long have you been considering a hair transplant?",
    options: ["Less than 3 months", "3–6 months", "6–12 months", "More than 1 year", "I recently started exploring it"],
  },
  barrier: {
    id: "barrier",
    label: "5",
    title: "What is currently stopping you from getting a hair transplant?",
    options: [
      "Concern about the cost",
      "Concern about the procedure",
      "Concern about recovery",
      "Unsure about the results",
      "Not sure if I am a suitable candidate",
      "Nothing — I am ready to discuss treatment",
    ],
  },
}

/** Option index on "travel" that opens the conditional branch. */
export const CANNOT_TRAVEL = 2
/** Option index on "travelInfo" that ends the form. */
export const NOT_INTERESTED = 1

/** Q5 follow-up — one message per answer, in the same order as its options. */
export const BARRIER_MESSAGES: readonly (readonly string[])[] = [
  [
    "A hair transplant is a significant investment, and the cost depends on your hair loss grade, donor area and the number of grafts required.",
    "At Sirpi Aesthetics, your treatment plan is assessed by Dr. Srigireesh, a certified Plastic Surgeon, so the recommended approach is based on your individual hair loss rather than a standard package.",
    "If you’re comfortable investing in a personalised treatment plan, you can continue to discuss your options with our team.",
  ],
  [
    "It’s completely reasonable to have questions before considering a hair transplant. A hair transplant is a surgical procedure, so understanding the technique, suitability, recovery and expected process is important before making a decision.",
    "At Sirpi Aesthetics, Dr. Srigireesh, a certified Plastic Surgeon, evaluates your hair loss and donor area before discussing the appropriate treatment approach.",
  ],
  [
    "Recovery is an important part of the hair transplant journey, and it can vary depending on the procedure and individual factors.",
    "At Sirpi Aesthetics, Dr. Srigireesh, a certified Plastic Surgeon, will guide you through the procedure, expected recovery and post-treatment care based on your individual case.",
    "Understanding the recovery process beforehand can help you make a more informed decision.",
  ],
  [
    "Hair transplant suitability and outcomes depend on factors such as your existing hair loss, donor hair availability, scalp condition and individual healing.",
    "Rather than assuming the same approach works for everyone, Dr. Srigireesh, a certified Plastic Surgeon, can assess your hair loss and explain what may be realistically achievable in your case.",
  ],
  [
    "Not everyone with hair loss requires the same treatment, and a hair transplant may not be suitable for every individual.",
    "At Sirpi Aesthetics, Dr. Srigireesh, a certified Plastic Surgeon, can assess your hair loss pattern, donor area and other relevant factors to determine whether a hair transplant may be appropriate for you.",
  ],
  [
    "If you’re ready to explore hair transplant treatment, the next step is understanding your individual hair loss and treatment requirements.",
    "At Sirpi Aesthetics, Dr. Srigireesh, a certified Plastic Surgeon, can assess your hair loss and discuss the appropriate treatment approach based on your individual case.",
  ],
]

/** Shown on every Q5 message screen, highlighted above the closing line. */
export const DOCTOR_EXPERIENCE = [
  { value: "5 Years", label: "Experience post MCh Plastic Surgery" },
  { value: "11 Years", label: "Experience post MBBS" },
] as const

/** Closes every Q5 message, as in the reference screen. */
export const MESSAGE_CLOSE = "Would you like to discuss this with our expert? 👉 If not, you may exit the form."

export const EXIT_MESSAGE =
  "If you’re not comfortable with the clinic location in Coimbatore, you may exit the form and choose not to proceed further."

/** Call-back windows inside clinic hours (Mon–Sat, 10 AM – 7 PM). */
export const CALL_SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
  "6:00 PM – 7:00 PM",
] as const
