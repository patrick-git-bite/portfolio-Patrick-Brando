import { Calendar, ExternalLink } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { certifications } from "../../lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Education() {
  const degreeRef = useReveal<HTMLDivElement>({ y: 24 });
  const certsRef = useReveal<HTMLDivElement>({ y: 24, delay: 0.1 });

  return (
    <section id="education" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02. Formação" title="Jornada de aprendizado" />

        <div ref={degreeRef} className="mb-12 flex flex-col gap-4 border border-line p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-accent/40 text-accent">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-xl text-paper sm:text-2xl">
              Graduação em Análise e Desenvolvimento de Sistemas
            </h3>
            <p className="mt-1 text-muted">Uniftec • Analista/Desenvolvedor</p>
            <span className="mt-3 inline-block border border-accent/30 px-3 py-1 font-mono text-xs text-accent">
              Out 2024 - Mar 2027 • Em andamento
            </span>
            <p className="mt-4 leading-relaxed text-muted">
              Tecnologia da informação, habilidades analíticas, desenvolvimento de sistemas, gestão de projetos e
              análise de requisitos.
            </p>
          </div>
        </div>

        <div ref={certsRef} className="border border-line">
          <div className="border-b border-line px-6 py-4 sm:px-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Licenças &amp; certificados</h3>
          </div>
          <Accordion type="single" collapsible className="px-6 sm:px-8">
            {certifications.map((cert) => (
              <AccordionItem key={cert.title} value={cert.title} className="border-line">
                <AccordionTrigger className="gap-4 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left">
                    <cert.icon className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                    <div>
                      <p className="text-paper">{cert.title}</p>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-9">
                    <p className="leading-relaxed text-muted">{cert.description}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cert.skillGroups.map((group) => (
                        <div key={group.label}>
                          <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-accent">
                            {group.label}
                          </p>
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
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                      >
                        Ver credencial <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
