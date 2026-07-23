import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ACCENT = "#c8ff4d";
const PAPER = "#f3f1ea";
const SURFACE2 = "#1c1c20";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Animated "briefing" illustration: two little characters facing each other
 * having a conversation. Speech bubbles pop in alternately, idea sparks drift
 * up between them, and a dashed link pulses back and forth — all looping
 * continuously (idle animation) so the card feels alive regardless of scroll.
 * Built with plain SVG + GSAP; no WebGL, so it renders everywhere.
 */
export default function BriefingScene() {
  const ctxRef = useRef<gsap.Context | null>(null);

  const ref = useCallback((node: SVGSVGElement | null) => {
    if (!node) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      return;
    }

    ctxRef.current = gsap.context(() => {
      // Gentle idle bob on both characters.
      gsap.to("[data-char]", {
        y: -3,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });

      // Back-and-forth conversation: bubble A, then bubble B, looping.
      const talk = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
      talk
        .set("[data-bubble='a']", { transformOrigin: "0% 100%" })
        .set("[data-bubble='b']", { transformOrigin: "100% 100%" })
        .fromTo(
          "[data-bubble='a']",
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2.5)" },
        )
        .to("[data-bubble='a']", { autoAlpha: 0, duration: 0.3 }, "+=0.9")
        .fromTo(
          "[data-bubble='b']",
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2.5)" },
          "-=0.05",
        )
        .to("[data-bubble='b']", { autoAlpha: 0, duration: 0.3 }, "+=0.9");

      // Idea sparks floating up.
      gsap.fromTo(
        "[data-spark]",
        { y: 6, autoAlpha: 0, scale: 0.6 },
        {
          y: -12,
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.45,
        },
      );

      // Dashed exchange line pulsing between them.
      gsap.to("[data-link]", {
        strokeDashoffset: -24,
        duration: 1.6,
        ease: "none",
        repeat: -1,
      });
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
      <line x1="24" y1="142" x2="216" y2="142" stroke={LINE} strokeWidth="2" />

      {/* dashed exchange link */}
      <path
        data-link
        d="M74 92 Q120 60 166 92"
        stroke={MUTED}
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />

      {/* idea sparks */}
      <circle data-spark cx="108" cy="70" r="3" fill={ACCENT} />
      <circle data-spark cx="120" cy="62" r="2.4" fill={PAPER} />
      <circle data-spark cx="132" cy="70" r="3" fill={ACCENT} />
      <circle data-spark cx="120" cy="78" r="2.2" fill={ACCENT} />

      {/* character A (left) */}
      <g data-char>
        <rect x="48" y="104" width="24" height="32" rx="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="60" cy="90" r="12" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="65" cy="89" r="1.8" fill={ACCENT} />
      </g>

      {/* character B (right) */}
      <g data-char>
        <rect x="168" y="104" width="24" height="32" rx="11" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="180" cy="90" r="12" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <circle cx="175" cy="89" r="1.8" fill={ACCENT} />
      </g>

      {/* speech bubble A */}
      <g data-bubble="a">
        <rect x="30" y="40" width="52" height="30" rx="9" fill={SURFACE2} stroke={ACCENT} strokeWidth="2" />
        <path d="M52 69 L62 69 L54 82 Z" fill={SURFACE2} stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="45" cy="55" r="3" fill={ACCENT} />
        <circle cx="56" cy="55" r="3" fill={ACCENT} />
        <circle cx="67" cy="55" r="3" fill={ACCENT} />
      </g>

      {/* speech bubble B */}
      <g data-bubble="b">
        <rect x="158" y="40" width="52" height="30" rx="9" fill={SURFACE2} stroke={PAPER} strokeWidth="2" />
        <path d="M178 69 L188 69 L186 82 Z" fill={SURFACE2} stroke={PAPER} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="173" cy="55" r="3" fill={PAPER} />
        <circle cx="184" cy="55" r="3" fill={PAPER} />
        <circle cx="195" cy="55" r="3" fill={PAPER} />
      </g>
    </svg>
  );
}
