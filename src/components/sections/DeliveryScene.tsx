import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Animated "delivery & adjustments" illustration: the product is live (a "LIVE"
 * dot pulses), a small character gives a thumbs up, and an iteration loop keeps
 * spinning next to an adjustment slider whose knob slides back and forth — the
 * ongoing refinement after launch. Loops continuously so the card feels alive.
 * Plain SVG + GSAP, no WebGL.
 */
export default function DeliveryScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    ctxRef.current = gsap.context(() => {
      // Idle bob on the character.
      gsap.to("[data-char]", { y: -2.5, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // "LIVE" dot pulsing.
      gsap.to("[data-live]", {
        scale: 1.6,
        autoAlpha: 0.4,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Iteration marker orbiting the feedback loop.
      gsap.to("[data-loop]", { rotation: 360, svgOrigin: "110 130", duration: 3, ease: "none", repeat: -1 });

      // Adjustment knob sliding back and forth.
      gsap.to("[data-knob]", { x: 34, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, node);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 170"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* floor */}
      <line x1="20" y1="150" x2="220" y2="150" stroke={LINE} strokeWidth="2" />

      {/* character giving a thumbs up */}
      <g data-char>
        <rect x="25" y="104" width="22" height="32" rx="10" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="36" cy="92" r="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="41" cy="91" r="1.7" fill={ACCENT} />
        {/* raised arm + thumb */}
        <path d="M46 112 L54 96" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        <circle cx="55" cy="93" r="3" fill={ACCENT} />
      </g>

      {/* live browser window */}
      <rect x="70" y="28" width="138" height="82" rx="8" fill={SURFACE2} stroke={LINE} strokeWidth="2" />
      <circle cx="80" cy="38" r="2.5" fill={LINE} />
      <circle cx="88" cy="38" r="2.5" fill={LINE} />
      <circle cx="96" cy="38" r="2.5" fill={LINE} />

      {/* LIVE pill */}
      <rect x="168" y="32" width="32" height="12" rx="6" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <circle data-live cx="176" cy="38" r="2" fill={ACCENT} />
      <rect x="182" y="36" width="12" height="4" rx="2" fill={ACCENT} />
      <line x1="70" y1="46" x2="208" y2="46" stroke={LINE} strokeWidth="1.5" />

      {/* delivered UI (static) */}
      <rect x="84" y="54" width="110" height="24" rx="4" fill={LINE} />
      <circle cx="139" cy="66" r="5" fill="none" stroke={ACCENT} strokeWidth="2" />
      <rect x="84" y="86" width="90" height="4" rx="2" fill={MUTED} />
      <rect x="84" y="94" width="64" height="4" rx="2" fill={LINE} />
      <rect x="84" y="101" width="46" height="7" rx="3.5" fill={ACCENT} />

      {/* iteration feedback loop */}
      <circle cx="110" cy="130" r="13" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="3 4" />
      <g data-loop>
        <circle cx="110" cy="117" r="3.5" fill={ACCENT} />
      </g>

      {/* adjustment slider */}
      <line x1="150" y1="130" x2="196" y2="130" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
      <circle data-knob cx="156" cy="130" r="5" fill={SURFACE2} stroke={ACCENT} strokeWidth="2" />
    </svg>
  );
}
