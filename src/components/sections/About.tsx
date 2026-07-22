import { useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { skillCategories } from "../../lib/data";

export default function About() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const textRef = useReveal<HTMLDivElement>({ x: -24, y: 0 });
  const skillsRef = useReveal<HTMLDivElement>({ x: 24, y: 0 });

  const activeSkills = skillCategories.find((category) => category.id === activeTab)?.skills ?? [];

  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01. Sobre" title="Quem escreve o código" />

        <div className="grid gap-12 md:grid-cols-2">
          <div ref={textRef} className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Sou desenvolvedor Full-Stack no <strong className="text-paper">DataCrazy CRM</strong>. Trabalho na sustentação, tanto em features novas quanto em resolução de bugs.
            </p>
            <p>
              Uso <strong className="text-paper">Ubuntu</strong> desde que comecei a programar, tenho conhecimento em várias distribuições de Linux, não só de programação mas também em kernels voltados a servidores.
            </p>
            <p>
              Tenho certificações <strong className="text-paper">Google Cloud</strong> em dados e infraestrutura, e
              curso <strong className="text-paper">Análise e Desenvolvimento de Sistemas</strong> na Uniftec.
            </p>
          </div>

          <div ref={skillsRef}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Stack &amp; competências</h3>

            <div className="mb-6 flex flex-wrap gap-2">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  data-cursor="hover"
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                    activeTab === category.id
                      ? "border-accent text-accent"
                      : "border-line text-muted hover:border-paper/40 hover:text-paper"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {activeSkills.map((skill) => (
                <div key={skill.name} className="border border-line p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <skill.icon className="h-4 w-4 text-accent" />
                      <span className="text-sm text-paper">{skill.name}</span>
                    </div>
                    <span className="font-mono text-xs text-muted">{skill.level}</span>
                  </div>
                  <div className="mt-2 h-px w-full bg-line">
                    <div className="h-px bg-accent transition-all duration-700" style={{ width: skill.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
