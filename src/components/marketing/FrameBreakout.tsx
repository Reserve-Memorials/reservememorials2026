"use client";

import { useEffect } from "react";

export function FrameBreakout() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.top || window.top === window.self) return;
    try {
      window.top.location.href =
        window.location.pathname + window.location.search;
    } catch {
      // top is cross-origin and refused; nothing safe to do from here
    }
  }, []);

  return null;
}
