import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

/**
 * Minimal custom cursor: a dot that follows instantly and a ring that trails
 * with easing, growing on interactive elements. Mounted/torn down via ref
 * callback (no useEffect) and skipped entirely on touch devices.
 */
export default function Cursor() {
  const cleanupRef = useRef<() => void>();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.style.cursor = "none";

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof HTMLElement && target.closest("a, button, [data-cursor='hover']");

    const handleOver = (e: PointerEvent) => {
      if (isInteractive(e.target)) gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.35, ease: "power3.out" });
    };
    const handleOut = (e: PointerEvent) => {
      if (isInteractive(e.target)) gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    window.addEventListener("pointerout", handleOut);

    cleanupRef.current = () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerout", handleOut);
    };
  }, []);

  return (
    <div ref={rootRef} className="contents">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 md:block"
      />
    </div>
  );
}
