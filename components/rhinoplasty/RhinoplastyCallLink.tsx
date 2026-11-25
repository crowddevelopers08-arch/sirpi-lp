"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { PHONE_TEL } from "@/components/elite-minima/config";
import { track } from "@/components/elite-minima/track";

type RhinoplastyCallLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  section: string;
};

/** A shared phone link so every rhinoplasty call CTA records its Google Ads conversion. */
export default function RhinoplastyCallLink({ children, section, onClick, ...props }: RhinoplastyCallLinkProps) {
  return (
    <a
      {...props}
      href={`tel:${PHONE_TEL}`}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) track("call_click", { section });
      }}
    >
      {children}
    </a>
  );
}
