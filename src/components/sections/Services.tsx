import { Coffee, Heart } from "lucide-react";
import { attachReveal, useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";
import { services } from "../../lib/data";

interface ServicesProps {
  onNavigate: (id: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const ctaRef = useReveal<HTMLDivElement>({ y: 24 });

  return (
    <section id="services" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07. Serviços"
          title="Como posso ajudar"
          description="Ainda sou estudante, então cobro preços justos e sou direto sobre o que consigo entregar."
        />

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(node) => attachReveal(node, { y: 24, delay: index * 0.04 })}
              className="group bg-ink p-6 transition-colors hover:bg-surface"
            >
              <service.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-xl text-paper">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {service.features.map((feature) => (
                  <span key={feature} className="border border-line px-2 py-1 text-xs text-muted">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-10 border border-line p-8 text-center sm:p-10">
          <h3 className="font-display text-2xl text-paper">Tem um projeto em mente?</h3>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
            Me conta o que você precisa e eu vejo o que dá pra fazer. Preço combinado antes de começar.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate("contact")}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 font-mono text-sm text-ink transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" />
              Vamos conversar
            </button>
            <button
              onClick={() => {
                const subject = encodeURIComponent("Orçamento Gratuito - Projeto");
                const body = encodeURIComponent(
                  "Olá Patrick! Gostaria de solicitar um orçamento gratuito para o seguinte projeto:\n\n" +
                    "Tipo de projeto: \nDescrição breve: \nPúblico-alvo: \nPrazo desejado: \nOrçamento disponível: \n\nAguardo seu retorno!",
                );
                window.location.href = `mailto:patrickbrando18102003@gmail.com?subject=${subject}&body=${body}`;
              }}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <Coffee className="h-4 w-4" />
              Orçamento gratuito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
