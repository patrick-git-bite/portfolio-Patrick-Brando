import { useCallback } from "react";
import { gsap } from "../../lib/gsap";
import { attachReveal, useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { timelineData } from "../../lib/data";

const statusStyles: Record<string, string> = {
  Concluído: "border-accent/40 text-accent",
  "Em andamento": "border-paper/30 text-paper",
  Previsto: "border-line text-muted",
};

export default function Journey() {
  const headingRef = useReveal<HTMLDivElement>({ y: 24 });

  const lineRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const fill = node.querySelector<HTMLDivElement>("[data-line-fill]");
    if (!fill) return;
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      },
    );
  }, []);

  return (
    <section id="timeline" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div ref={headingRef}>
          <SectionHeading
            index="04. Jornada"
            title="Da descoberta à conquista"
            description="Uma linha do tempo honesta: o que já foi feito e o que ainda está por vir."
          />
        </div>

        <div ref={lineRef} className="relative pl-10">
          <div className="absolute left-3 top-1 bottom-1 w-px bg-line" />
          <div data-line-fill className="absolute left-3 top-1 bottom-1 w-px origin-top bg-accent" />

          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <div
                key={`${item.year}-${item.title}`}
                ref={(node) => attachReveal(node, { y: 24, delay: index * 0.03 })}
                className="relative"
              >
                <div className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-2xl text-paper">{item.year}</span>
                  <span className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 flex items-center gap-2 font-display text-lg text-paper">
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.title}
                </h3>
                <p className="mt-1 text-muted">{item.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent/60" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
