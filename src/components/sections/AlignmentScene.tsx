import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Animated "alignment" illustration: two characters face a shared board while
 * a checklist gets ticked off item by item (boxes turn accent, checkmarks pop
 * in), and dashed "line of sight" links connect each character to the board —
 * everyone looking at the same thing. Loops continuously so the card feels
 * alive. Plain SVG + GSAP, no WebGL.
 */
export default function AlignmentScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    ctxRef.current = gsap.context(() => {
      // Idle bob on both characters.
      gsap.to("[data-char]", {
        y: -2.5,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Shared line-of-sight links pulsing toward the board.
      gsap.to("[data-look]", {
        strokeDashoffset: -18,
        duration: 1.4,
        ease: "none",
        repeat: -1,
      });

      // Checklist being ticked off one item at a time, then resetting.
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9 });
      [0, 1, 2].forEach((i) => {
        tl.to(
          `[data-check='${i}']`,
          { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(3)", transformOrigin: "50% 50%" },
          i * 0.55,
        ).to(`[data-box='${i}']`, { stroke: ACCENT, duration: 0.2 }, i * 0.55);
      });
      tl.to({}, { duration: 0.6 })
        .set("[data-check]", { scale: 0, autoAlpha: 0 })
        .set("[data-box]", { stroke: MUTED });
    }, node);
  }, []);

  const rows = [56, 72, 88];

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
      <line x1="20" y1="140" x2="220" y2="140" stroke={LINE} strokeWidth="2" />

      {/* line-of-sight links */}
      <path data-look d="M44 92 Q60 78 78 66" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 5" />
      <path data-look d="M196 92 Q180 78 162 66" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 5" />

      {/* shared board */}
      <rect x="78" y="30" width="84" height="70" rx="6" fill={SURFACE2} stroke={LINE} strokeWidth="2" />
      <circle cx="88" cy="40" r="2.5" fill={ACCENT} />
      <line x1="78" y1="48" x2="162" y2="48" stroke={LINE} strokeWidth="2" />

      {/* checklist rows */}
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            data-box={i}
            x="88"
            y={y - 6}
            width="12"
            height="12"
            rx="2"
            fill="none"
            stroke={MUTED}
            strokeWidth="2"
          />
          <path
            data-check={i}
            d={`M90.5 ${y} L93.5 ${y + 3} L98 ${y - 3}`}
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          <rect x="108" y={y - 2.5} width="42" height="5" rx="2.5" fill={LINE} />
        </g>
      ))}

      {/* character A (left) */}
      <g data-char>
        <rect x="24" y="104" width="22" height="32" rx="10" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="35" cy="92" r="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="40" cy="91" r="1.7" fill={ACCENT} />
      </g>

      {/* character B (right) */}
      <g data-char>
        <rect x="194" y="104" width="22" height="32" rx="10" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="205" cy="92" r="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="200" cy="91" r="1.7" fill={ACCENT} />
      </g>
    </svg>
  );
}
