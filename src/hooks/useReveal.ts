import { useCallback } from "react";
import { gsap } from "../lib/gsap";

interface RevealOptions {
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  start?: string;
  stagger?: number;
}

/**
 * Plain (non-hook) function that wires up a GSAP/ScrollTrigger reveal on a
 * DOM node. Safe to call from inside .map() callbacks / ref props, unlike
 * a hook which cannot be called conditionally or in a loop.
 */
export function attachReveal<T extends HTMLElement>(node: T | null, options: RevealOptions = {}) {
  if (!node) return;
  const { y = 32, x = 0, delay = 0, duration = 0.9, start = "top 85%" } = options;
  const targets = node.hasAttribute("data-reveal-group") ? Array.from(node.children) : [node];

  gsap.fromTo(
    targets,
    { autoAlpha: 0, y, x },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      stagger: options.stagger ?? 0.08,
      scrollTrigger: {
        trigger: node,
        start,
        toggleActions: "play none none reverse",
      },
    },
  );
}

/**
 * Ref-callback based GSAP/ScrollTrigger reveal. Replaces the old
 * framer-motion `whileInView` fade-ins with a single reusable primitive.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  return useCallback(
    (node: T | null) => attachReveal(node, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
