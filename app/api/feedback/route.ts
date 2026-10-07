import { NextRequest, NextResponse } from "next/server"
import { sendFeedbackToTeleCRM } from "@/lib/telecrm"
import { sendFeedbackToGoogleSheet } from "@/lib/sheets"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Client feedback from /client-feedback. Like /api/leads, nothing is persisted
// locally — TeleCRM and the Google Sheet are the system of record.

/** Same rule the booking form enforces client-side, applied again server-side. */
function isValidIndianPhone(raw: string) {
  const cleaned = raw.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "")
  return /^[6-9]\d{9}$/.test(cleaned)
}

function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim())
}

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { name = "", email = "", phone = "", suggestions = "", pageUrl = "" } = body

  // Star score from /review. 0 means they reached this page without rating.
  const parsedRating = Number(body.rating)
  const rating = Number.isInteger(parsedRating) && parsedRating >= 1 && parsedRating <= 5 ? parsedRating : 0

  if (!name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (!isValidIndianPhone(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit Indian mobile number." },
      { status: 400 },
    )
  }
  if (!suggestions.trim()) {
    return NextResponse.json({ error: "Please share your suggestions." }, { status: 400 })
  }

  const feedback = { name, email, phone, suggestions, pageUrl, rating }

  // Both destinations in parallel; each is independently best-effort.
  const [crmOutcome, sheetOutcome] = await Promise.allSettled([
    sendFeedbackToTeleCRM(feedback),
    sendFeedbackToGoogleSheet(feedback),
  ])

  let telecrmSynced = false
  if (crmOutcome.status === "fulfilled") {
    telecrmSynced = crmOutcome.value.synced
  } else {
    console.error("TeleCRM feedback sync failed:", crmOutcome.reason)
  }

  let sheetSynced = false
  if (sheetOutcome.status === "fulfilled") {
    sheetSynced = sheetOutcome.value.synced
  } else {
    console.error("Google Sheets feedback sync failed:", sheetOutcome.reason)
  }

  // Captured as long as it reached at least one destination.
  const captured = telecrmSynced || sheetSynced

  return NextResponse.json(
    {
      success: captured,
      telecrmSynced,
      sheetSynced,
      message: captured
        ? telecrmSynced && sheetSynced
          ? "Feedback delivered to TeleCRM and Google Sheets"
          : "Feedback captured; one integration failed"
        : "Feedback could not be delivered to any destination",
    },
    { status: captured ? 201 : 502 },
  )
}
