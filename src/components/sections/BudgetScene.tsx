import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Animated "budget & scope" illustration: a proposal document fills in line by
 * line, the total counts up to the final price, and an approval stamp slams
 * down with a little shake — while a small character presents it. Loops
 * continuously so the card feels alive. Plain SVG + GSAP, no WebGL.
 */
export default function BudgetScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    const totalEl = node.querySelector<SVGTextElement>("[data-total]");

    ctxRef.current = gsap.context(() => {
      // Idle bob on the presenter.
      gsap.to("[data-char]", { y: -2.5, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const counter = { val: 0 };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Reset to empty state at the start of every loop.
      tl.set("[data-item]", { autoAlpha: 0, x: -8 })
        .set("[data-stamp]", { autoAlpha: 0, scale: 2.4, rotate: -44, transformOrigin: "50% 50%" })
        .call(() => {
          if (totalEl) totalEl.textContent = "R$ 0";
        });

      // Line items appear one by one.
      tl.to("[data-item]", { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.2, ease: "power2.out" }, 0.15);

      // Total counts up.
      tl.to(
        counter,
        {
          val: 4800,
          duration: 0.9,
          ease: "power1.out",
          onUpdate: () => {
            if (totalEl) totalEl.textContent = "R$ " + Math.round(counter.val).toLocaleString("pt-BR");
          },
        },
        0.85,
      );

      // Approval stamp slams down, then a tiny shake to settle.
      tl.to("[data-stamp]", { autoAlpha: 1, scale: 1, rotate: -15, duration: 0.4, ease: "back.out(2.2)" }, 1.75)
        .to("[data-stamp]", { x: "+=2", duration: 0.08, yoyo: true, repeat: 3, ease: "power1.inOut" }, 2.1);
    }, node);
  }, []);

  const rows = [66, 80, 94];

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

      {/* presenter character */}
      <g data-char>
        <rect x="30" y="108" width="22" height="30" rx="10" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="41" cy="96" r="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="46" cy="95" r="1.7" fill={ACCENT} />
        {/* pointing arm */}
        <path d="M52 116 L74 106" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* proposal document */}
      <rect x="90" y="24" width="112" height="120" rx="6" fill={SURFACE2} stroke={LINE} strokeWidth="2" />

      {/* title + tag */}
      <rect x="104" y="36" width="58" height="6" rx="3" fill={PAPER} />
      <rect x="104" y="48" width="20" height="7" rx="2" fill={ACCENT} />

      {/* line items */}
      {rows.map((y, i) => (
        <g key={y} data-item>
          <rect x="104" y={y - 2.5} width="50" height="5" rx="2.5" fill={LINE} />
          <rect x="164" y={y - 2.5} width="24" height="5" rx="2.5" fill={MUTED} />
        </g>
      ))}

      {/* divider */}
      <line x1="104" y1="108" x2="188" y2="108" stroke={LINE} strokeWidth="2" />

      {/* total */}
      <rect x="104" y="117" width="30" height="5" rx="2.5" fill={MUTED} />
      <text
        data-total
        x="188"
        y="124"
        textAnchor="end"
        fill={ACCENT}
        fontFamily="'JetBrains Mono', monospace"
        fontSize="13"
        fontWeight="700"
      >
        R$ 0
      </text>

      {/* approval stamp */}
      <g data-stamp>
        <circle cx="128" cy="82" r="18" fill="none" stroke={ACCENT} strokeWidth="3" />
        <path
          d="M120 82 L126 88 L137 76"
          stroke={ACCENT}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
