"use client";

/**
 * Today's date in India time, e.g. "April 16, 2026".
 *
 * The page itself is pre-built, so the date is worked out in the visitor's
 * browser. The server copy is the build date; `suppressHydrationWarning`
 * lets the browser replace it with today's date without a React warning.
 */
export default function TodayDate() {
  const today = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return <span suppressHydrationWarning>{today}</span>;
}
