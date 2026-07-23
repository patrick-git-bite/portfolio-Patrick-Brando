import { useCallback, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface MarqueeProps {
  items: string[];
}

/**
 * Infinite horizontal scrolling band. The track renders two copies of the
 * items back to back and animates xPercent to -50, looping seamlessly.
 */
export default function Marquee({ items }: MarqueeProps) {
  const cleanupRef = useRef<() => void>();

  const trackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        cleanupRef.current?.();
        cleanupRef.current = undefined;
        return;
      }
      const tween = gsap.to(node, {
        xPercent: -50,
        duration: items.length * 2.5,
        ease: "none",
        repeat: -1,
      });
      cleanupRef.current = () => tween.kill();
    },
    [items.length],
  );

  const content = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line py-6">
      <div ref={trackRef} className="flex w-max gap-10">
        {content.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted"
          >
            {item}
            <span aria-hidden="true" className="text-accent">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
