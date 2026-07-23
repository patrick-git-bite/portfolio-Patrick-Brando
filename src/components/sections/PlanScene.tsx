import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

// Code lines: each is an array of [x, width, color] segments that look like
// tokens (keywords in accent, identifiers in paper, the rest muted).
const codeLines: Array<Array<[number, number, string]>> = [
  [
    [34, 18, ACCENT],
    [56, 30, PAPER],
    [90, 14, MUTED],
  ],
  [
    [42, 12, ACCENT],
    [58, 40, PAPER],
  ],
  [
    [42, 20, MUTED],
    [66, 16, ACCENT],
    [86, 26, PAPER],
  ],
  [
    [50, 44, PAPER],
    [98, 18, MUTED],
  ],
  [
    [42, 14, ACCENT],
    [60, 34, PAPER],
  ],
  [[34, 10, MUTED]],
];

/**
 * Animated "development plan" illustration: a roadmap of connected nodes draws
 * itself in sequence (a marker travels the path, lighting each node), while a
 * code panel below types in several lines token by token. Two looping GSAP
 * timelines keep it alive. Plain SVG + GSAP, no WebGL.
 */
export default function PlanScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    ctxRef.current = gsap.context(() => {
      // Roadmap: light nodes + draw connectors + move the marker in sequence.
      const rm = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      rm.set("[data-node]", { stroke: MUTED })
        .set("[data-connector]", { scaleX: 0, transformOrigin: "0% 50%" })
        .set("[data-marker]", { x: 0 });

      const markerX = [0, 56, 112, 168];
      [0, 1, 2, 3].forEach((i) => {
        const t = i * 0.6;
        rm.to(`[data-node='${i}']`, { stroke: ACCENT, duration: 0.2 }, t);
        if (i < 3) {
          rm.to(`[data-connector='${i}']`, { scaleX: 1, duration: 0.4, ease: "power1.inOut" }, t + 0.2).to(
            "[data-marker]",
            { x: markerX[i + 1], duration: 0.4, ease: "power1.inOut" },
            t + 0.2,
          );
        }
      });

      // Code panel: type in the lines token by token.
      const code = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      code
        .set("[data-code-line]", { scaleX: 0, transformOrigin: "0% 50%" })
        .to("[data-code-line]", { scaleX: 1, duration: 0.3, stagger: 0.22, ease: "power1.out" }, 0.2);

      // Blinking caret.
      gsap.to("[data-caret]", { autoAlpha: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
    }, node);
  }, []);

  const nodeCenters = [36, 92, 148, 204];

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 170"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* roadmap connectors */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          data-connector={i}
          x={nodeCenters[i] + 10}
          y="29"
          width={nodeCenters[i + 1] - nodeCenters[i] - 20}
          height="2"
          fill={ACCENT}
        />
      ))}

      {/* roadmap nodes */}
      {nodeCenters.map((cx, i) => (
        <rect
          key={cx}
          data-node={i}
          x={cx - 10}
          y="20"
          width="20"
          height="20"
          rx="4"
          fill={SURFACE2}
          stroke={MUTED}
          strokeWidth="2"
        />
      ))}

      {/* roadmap marker */}
      <circle data-marker cx="36" cy="30" r="3.5" fill={ACCENT} />

      {/* code panel */}
      <rect x="24" y="52" width="192" height="94" rx="6" fill={SURFACE2} stroke={LINE} strokeWidth="2" />
      <circle cx="34" cy="63" r="2.5" fill={LINE} />
      <circle cx="42" cy="63" r="2.5" fill={LINE} />
      <circle cx="50" cy="63" r="2.5" fill={LINE} />
      <line x1="24" y1="72" x2="216" y2="72" stroke={LINE} strokeWidth="1.5" />

      {/* code lines */}
      {codeLines.map((segments, i) => {
        const y = 82 + i * 10;
        return (
          <g key={i} data-code-line>
            {segments.map(([x, w, color], j) => (
              <rect key={j} x={x} y={y - 2.5} width={w} height="5" rx="2.5" fill={color} />
            ))}
          </g>
        );
      })}

      {/* blinking caret */}
      <rect data-caret x="98" y="130" width="5" height="6" rx="1" fill={ACCENT} />
    </svg>
  );
}
