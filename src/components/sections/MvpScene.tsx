import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Animated "MVP" illustration: a product screen assembles itself block by block
 * (wireframe gaining shape), a "v1" badge pops in, and a little rocket launches
 * — the first shippable version taking off. Loops continuously so the card
 * feels alive. Plain SVG + GSAP, no WebGL.
 */
export default function MvpScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    ctxRef.current = gsap.context(() => {
      // Gentle idle float on the whole window.
      gsap.to("[data-float]", { y: -3, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });

      tl.set("[data-ui]", { autoAlpha: 0, y: 10, scale: 0.95, transformOrigin: "50% 50%" })
        .set("[data-badge]", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" })
        .set("[data-rocket]", { autoAlpha: 0, y: 0 });

      // Blocks assemble one by one.
      tl.to("[data-ui]", { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.16, ease: "back.out(1.6)" }, 0.15);

      // "v1" badge pops.
      tl.to("[data-badge]", { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.6)" }, "+=0.1");

      // Rocket launches.
      tl.to("[data-rocket]", { autoAlpha: 1, duration: 0.15 }, "<")
        .to("[data-rocket]", { y: -46, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, "<0.05");
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
      <g data-float>
        {/* app window */}
        <rect x="54" y="24" width="132" height="120" rx="8" fill={SURFACE2} stroke={LINE} strokeWidth="2" />
        <circle cx="64" cy="34" r="2.5" fill={LINE} />
        <circle cx="72" cy="34" r="2.5" fill={LINE} />
        <circle cx="80" cy="34" r="2.5" fill={LINE} />
        <line x1="54" y1="42" x2="186" y2="42" stroke={LINE} strokeWidth="1.5" />

        {/* hero block */}
        <g data-ui>
          <rect x="64" y="50" width="112" height="30" rx="4" fill={LINE} />
          <circle cx="120" cy="65" r="6" fill="none" stroke={ACCENT} strokeWidth="2" />
          <path d="M118 62 L124 65 L118 68 Z" fill={ACCENT} />
        </g>

        {/* text lines */}
        <rect data-ui x="64" y="88" width="96" height="5" rx="2.5" fill={MUTED} />
        <rect data-ui x="64" y="98" width="72" height="5" rx="2.5" fill={LINE} />

        {/* card row */}
        <rect data-ui x="64" y="110" width="52" height="18" rx="3" fill={LINE} />
        <rect data-ui x="124" y="110" width="52" height="18" rx="3" fill={LINE} />

        {/* button */}
        <rect data-ui x="64" y="132" width="64" height="9" rx="4.5" fill={ACCENT} />

        {/* v1 badge */}
        <g data-badge>
          <circle cx="178" cy="32" r="13" fill={SURFACE2} stroke={ACCENT} strokeWidth="2" />
          <text
            x="178"
            y="36"
            textAnchor="middle"
            fill={ACCENT}
            fontFamily="'JetBrains Mono', monospace"
            fontSize="11"
            fontWeight="700"
          >
            v1
          </text>
        </g>
      </g>

      {/* launching rocket */}
      <g data-rocket>
        <path d="M150 118 Q154 108 158 118 L158 126 L150 126 Z" fill={SURFACE2} stroke={PAPER} strokeWidth="1.5" />
        <circle cx="154" cy="118" r="1.8" fill={ACCENT} />
        <path d="M151 126 L154 132 L157 126 Z" fill={ACCENT} />
      </g>
    </svg>
  );
}
