"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 72;
const SCROLL_DELTA = 8;

/**
 * Returns true when the header should be visible (top of page or scrolling up).
 */
export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + SCROLL_DELTA) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - SCROLL_DELTA) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isVisible;
}
