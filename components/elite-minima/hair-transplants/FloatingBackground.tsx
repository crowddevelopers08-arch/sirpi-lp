import type { CSSProperties } from "react";

/*
  Floating background for the hair transplant form: the four Sirpi hair icons
  (public/sirp-icon-1..4.png), drifting slowly behind the content.

  The PNGs are line art on a transparent ground, so each one is used as a CSS
  mask over a solid fill — that is what lets the same file print in Sirpi
  burgundy or coral, whatever colour the artwork was drawn in.

  Everything is low-opacity so the questions stay readable, sits behind the
  screen (-z-10 inside the `isolate` <main>), and ignores the pointer.
  Positions are fixed numbers rather than Math.random() so the server and
  browser render the same thing. Reduced-motion visitors get the same picture,
  standing still.
*/

const BURGUNDY = "#6A113D";
const CORAL = "#ED575C";

/** 1 follicle + strand · 2 strand + upward arrows · 3 strand + plus · 4 regrowth spiral */
type IconNo = 1 | 2 | 3 | 4;

/** [icon, left %, top %, size px, colour, opacity, seconds, delay s, start rotation deg] */
const ICONS: [IconNo, number, number, number, string, number, number, number, number][] = [
  [2, 4, 62, 58, BURGUNDY, 0.12, 15, 0, -12],
  [1, 15, 26, 48, CORAL, 0.2, 12, -4, 10],
  [3, 37, 70, 44, BURGUNDY, 0.12, 13, -6, -6],
  [4, 52, 8, 48, CORAL, 0.16, 14, -2, 14],
  [1, 63, 84, 54, BURGUNDY, 0.12, 16, -9, -14],
  [3, 74, 38, 40, CORAL, 0.18, 11, -3, 8],
  [2, 86, 58, 62, BURGUNDY, 0.1, 17, -5, 6],
  [4, 92, 10, 44, CORAL, 0.18, 12, -7, -10],
  [3, 28, 46, 34, BURGUNDY, 0.1, 10, -1, 18],
  [4, 8, 88, 38, CORAL, 0.16, 14, -8, -4],
];

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes ht-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--r, 0deg)); }
          50%      { transform: translate3d(var(--dx, 10px), -22px, 0) rotate(calc(var(--r, 0deg) + 8deg)); }
        }
        .ht-float { animation: ht-float var(--t, 12s) ease-in-out var(--d, 0s) infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .ht-float { animation: none; } }
      `}</style>

      {ICONS.map(([icon, left, top, size, colour, opacity, t, d, r], i) => {
        const mask = `url(/sirp-icon-${icon}.png) center / contain no-repeat`;
        return (
          <span
            key={`i${i}`}
            className="ht-float absolute"
            style={
              {
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                backgroundColor: colour,
                opacity,
                mask,
                WebkitMask: mask,
                "--t": `${t}s`,
                "--d": `${d}s`,
                "--r": `${r}deg`,
                "--dx": `${i % 2 ? 14 : -14}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
