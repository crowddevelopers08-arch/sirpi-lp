// Shared by the hair transplant form (client), the lead API and the admin
// dashboard. The wording itself lives in the form's own content file; this
// re-exports it so server code validates against the exact same options.
export {
  QUESTIONS,
  CANNOT_TRAVEL,
  NOT_INTERESTED,
  CALL_SLOTS,
  type QuestionId,
} from "@/components/elite-minima/hair-transplants/form-content";

export const OUTSTATION_CATEGORY = "Outstation – Not Ready to Travel but Interested";
export const STANDARD_CATEGORY = "Standard";
/** Said they cannot travel and are not interested — exit screen, name + phone only. */
export const NOT_INTERESTED_CATEGORY = "Not Interested";
