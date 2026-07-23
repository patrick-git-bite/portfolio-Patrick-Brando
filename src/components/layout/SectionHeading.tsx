import { useCallback } from "react";
import { gsap } from "../../lib/gsap";
import { useReveal } from "../../hooks/useReveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ index, title, description, align = "left" }: SectionHeadingProps) {
  const revealRef = useReveal<HTMLDivElement>({ y: 24 });

  const titleRef = useCallback((node: HTMLHeadingElement | null) => {
    if (!node) return;
    const words = node.querySelectorAll("[data-word]");
    gsap.fromTo(
      words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const words = title.split(" ");

  return (
    <div ref={revealRef} className={`mb-16 ${align === "center" ? "mx-auto max-w-2xl text-center" : ""}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{index}</p>
      <h2 ref={titleRef} className="font-display text-clamp-h2 leading-[1.05] text-paper">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <span data-word className="inline-block">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}
