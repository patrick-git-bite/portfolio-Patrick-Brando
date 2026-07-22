import { Calendar, Target } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { experience } from "../../lib/data";

export default function Experience() {
  const headerRef = useReveal<HTMLDivElement>({ y: 24 });
  const bulletsRef = useReveal<HTMLDivElement>({ y: 24, delay: 0.1 });
  const architectureRef = useReveal<HTMLDivElement>({ y: 24, delay: 0.15 });
  const stackRef = useReveal<HTMLDivElement>({ y: 24, delay: 0.2 });

  return (
    <section id="experience" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03. Experiência" title="Experiência profissional" />

        <div ref={headerRef} className="mb-10 flex flex-col gap-6 border border-line p-6 sm:flex-row sm:p-8">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-accent/40 text-accent">
            <Target className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-2xl text-paper">{experience.role}</h3>
            <p className="mt-1 text-lg text-muted">{experience.company}</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted">
              <Calendar className="h-3.5 w-3.5" /> {experience.period}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <span key={tag} className="border border-line px-3 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 leading-relaxed text-muted">{experience.summary}</p>
          </div>
        </div>

        <div ref={bulletsRef} className="mb-8 grid gap-6 sm:grid-cols-2">
          {experience.bullets.map((group) => (
            <div key={group.label} className="border border-line p-6">
              <h4 className="mb-4 flex items-center gap-2 font-display text-lg text-paper">
                <group.icon className="h-4 w-4 text-accent" />
                {group.label}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={architectureRef} className="mb-8 border border-line p-6 sm:p-8">
          <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">Arquitetura &amp; integrações</h4>
          <div className="grid gap-8 sm:grid-cols-2">
            {experience.architecture.map((group) => (
              <div key={group.label}>
                <h5 className="mb-3 flex items-center gap-2 text-sm text-paper">
                  <group.icon className="h-4 w-4 text-accent" />
                  {group.label}
                </h5>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div ref={stackRef} className="grid gap-6 border border-line p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {experience.stack.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-accent">{group.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="border border-line px-2 py-1 text-xs text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
