"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const photos = Array.from({ length: 7 }, (_, index) => `/bfaf-${index + 1}.jpg`)

/** Seconds for the strip to travel one full set of photos. */
const LOOP_SECONDS = 45

/**
 * Before & after, as a strip that moves on its own — and that a visitor can
 * also move by hand.
 *
 * The strip is a real horizontal scroller: an animation frame nudges its
 * scrollLeft forward, so the same element answers the mouse wheel, trackpad,
 * touch swipes and click-drag. The photos are rendered twice; whenever the
 * position passes one full set it is wrapped back by exactly that much, so it
 * loops forever in either direction with no visible jump.
 *
 * While the pointer is over it (or a finger is on it) the auto-move pauses and
 * the wheel scrolls the photos sideways; it resumes on leave. Visitors who ask
 * for reduced motion get the scroller without the auto-move.
 */
export default function GynBeforeAfter() {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let paused = false
    let raf = 0
    let last = performance.now()
    let carry = 0 // sub-pixel remainder, so slow speeds still move

    // One full set of photos = half the track (the track holds two sets).
    const setWidth = () => strip.scrollWidth / 2

    const wrap = () => {
      const w = setWidth()
      if (w <= 0) return
      if (strip.scrollLeft >= w) strip.scrollLeft -= w
      else if (strip.scrollLeft <= 0) strip.scrollLeft += w
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) // ignore long gaps (tab in background)
      last = now
      if (!paused && !reduced) {
        carry += (setWidth() / (LOOP_SECONDS * 1000)) * dt
        const step = Math.floor(carry)
        if (step > 0) {
          strip.scrollLeft += step
          carry -= step
        }
      }
      wrap()
      raf = requestAnimationFrame(tick)
    }

    // Off zero, so the very first backwards scroll wraps instead of sticking.
    strip.scrollLeft = 1
    raf = requestAnimationFrame(tick)

    const pause = () => (paused = true)
    const resume = () => {
      paused = false
      last = performance.now()
    }

    // Vertical wheel over the strip scrolls it sideways instead of the page.
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta === 0) return
      e.preventDefault()
      strip.scrollLeft += delta
    }

    // Click-and-drag for mouse users (touch already scrolls natively).
    let dragging = false
    let startX = 0
    let startLeft = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      dragging = true
      startX = e.clientX
      startLeft = strip.scrollLeft
      strip.setPointerCapture(e.pointerId)
      strip.style.cursor = "grabbing"
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      strip.scrollLeft = startLeft - (e.clientX - startX)
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      strip.releasePointerCapture(e.pointerId)
      strip.style.cursor = ""
    }

    strip.addEventListener("mouseenter", pause)
    strip.addEventListener("mouseleave", resume)
    strip.addEventListener("touchstart", pause, { passive: true })
    strip.addEventListener("touchend", resume)
    strip.addEventListener("wheel", onWheel, { passive: false })
    strip.addEventListener("pointerdown", onDown)
    strip.addEventListener("pointermove", onMove)
    strip.addEventListener("pointerup", onUp)
    strip.addEventListener("pointercancel", onUp)

    return () => {
      cancelAnimationFrame(raf)
      strip.removeEventListener("mouseenter", pause)
      strip.removeEventListener("mouseleave", resume)
      strip.removeEventListener("touchstart", pause)
      strip.removeEventListener("touchend", resume)
      strip.removeEventListener("wheel", onWheel)
      strip.removeEventListener("pointerdown", onDown)
      strip.removeEventListener("pointermove", onMove)
      strip.removeEventListener("pointerup", onUp)
      strip.removeEventListener("pointercancel", onUp)
    }
  }, [])

  return (
    <section id="before-after" aria-labelledby="before-after-heading" className="bg-white text-[var(--g-ink)]">
      <div className="mx-auto max-w-[1320px] px-5 pt-10 sm:px-8 sm:pt-16 lg:pt-10">
        <div className="text-center">
          <p className="g-eyebrow g-eyebrow--ink">Gynecomastia Gallery</p>
          <h2 id="before-after-heading" className="mt-5">
            Before &amp; After
          </h2>
        </div>
      </div>

      {/* Full-bleed strip, with the edges faded so photos glide in and out.
          `data-lenis-prevent` keeps the page's smooth-scroll from taking the
          wheel while the pointer is over the photos. */}
      <div
        ref={stripRef}
        data-lenis-prevent
        role="region"
        aria-label="Gynecomastia before and after photos"
        tabIndex={0}
        className="mt-8 cursor-grab select-none overflow-x-auto pb-10 [scrollbar-width:none] sm:mt-10 sm:pb-16 lg:pb-10 [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        {/* Spacing is padding on each photo, not `gap`, so the two sets are
            exactly equal and the wrap point lands with no jump. */}
        <div className="flex w-max">
          {[...photos, ...photos].map((src, index) => {
            const isCopy = index >= photos.length
            return (
              <div key={`${src}-${index}`} aria-hidden={isCopy || undefined} className="flex-none pr-4 sm:pr-5">
                <div className="relative aspect-square w-[78vw] max-w-[320px] overflow-hidden rounded-2xl border border-[var(--g-bone-line)] bg-white sm:w-[340px] sm:max-w-none lg:w-[400px]">
                  <Image
                    src={src}
                    alt={isCopy ? "" : `Gynecomastia before and after comparison ${index + 1}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 340px, 78vw"
                    className="pointer-events-none object-contain"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
