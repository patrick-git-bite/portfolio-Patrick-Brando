import { useState } from "react";
import { Eye, Github, Lock } from "lucide-react";
import { toast } from "sonner";
import { attachReveal, useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { projects } from "../../lib/data";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const headingRef = useReveal<HTMLDivElement>({ y: 24 });

  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;

  return (
    <section id="projects" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div ref={headingRef}>
          <SectionHeading
            index="05. Projetos"
            title="Projetos em destaque"
            description="Projetos da faculdade, do trabalho e por conta própria. Cada um é uma estrela no meu mapa: umas brilham como supernovas, outras são a poeira que acabou formando as próximas."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured && (
            <div
              ref={(node) => attachReveal(node, { y: 24 })}
              className="group border border-line p-6 transition-colors hover:border-accent/50 md:col-span-2 md:p-10"
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 bg-accent" /> {featured.tagline}
              </div>
              <h3 className="mt-4 font-display text-2xl text-paper sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 max-w-2xl text-muted">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <span key={tag} className="border border-line px-2 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedId(featured.id)}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-xs text-ink"
                >
                  <Eye className="h-3.5 w-3.5" /> Ver detalhes
                </button>
                {featured.private && (
                  <button
                    onClick={() => toast.info("Projeto desenvolvido para empresa específica")}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs text-muted hover:border-accent hover:text-accent"
                  >
                    <Lock className="h-3.5 w-3.5" /> Código privado
                  </button>
                )}
              </div>
            </div>
          )}

          {rest.map((project, index) => (
            <div
              key={project.id}
              ref={(node) => attachReveal(node, { y: 24, delay: index * 0.05 })}
              className="flex flex-col border border-line p-6 transition-colors hover:border-accent/50"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{project.tagline}</p>
              <h3 className="mt-3 font-display text-xl text-paper">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-line px-2 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSelectedId(project.id)}
                  data-cursor="hover"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-line px-4 py-2 font-mono text-xs text-paper hover:border-accent hover:text-accent"
                >
                  <Eye className="h-3.5 w-3.5" /> Detalhes
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-line px-4 py-2 font-mono text-xs text-paper hover:border-accent hover:text-accent"
                  >
                    <Github className="h-3.5 w-3.5" /> Código
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onOpenChange={(open) => !open && setSelectedId(null)} />
    </section>
  );
}
