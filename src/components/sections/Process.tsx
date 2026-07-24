import { useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { MessageSquare, Users, Wallet, ListChecks, Rocket, PackageCheck } from "lucide-react";
import { gsap } from "../../lib/gsap";
import SectionHeading from "../layout/SectionHeading";
import BriefingScene from "./BriefingScene";
import AlignmentScene from "./AlignmentScene";
import BudgetScene from "./BudgetScene";
import PlanScene from "./PlanScene";
import MvpScene from "./MvpScene";
import DeliveryScene from "./DeliveryScene";

interface Stage {
  icon: LucideIcon;
  label: string;
  description: string;
  Scene?: React.ComponentType;
}

const stages: Stage[] = [
  {
    icon: MessageSquare,
    label: "Briefing",
    description: "Entendo a ideia, o público e o problema real que o projeto precisa resolver.",
    Scene: BriefingScene,
  },
  {
    icon: Users,
    label: "Alinhamento",
    description: "Reunião pra alinhar expectativas, prazos e prioridades antes de qualquer linha de código.",
    Scene: AlignmentScene,
  },
  {
    icon: Wallet,
    label: "Orçamento & escopo",
    description: "Proposta com escopo fechado, prazo definido e investimento claro, sem letra miúda.",
    Scene: BudgetScene,
  },
  {
    icon: ListChecks,
    label: "Plano de desenvolvimento",
    description: "Divisão em etapas, tecnologias escolhidas e marcos de entrega bem definidos.",
    Scene: PlanScene,
  },
  {
    icon: Rocket,
    label: "MVP",
    description: "Primeira versão navegável, pra validar a ideia antes de ir a fundo.",
    Scene: MvpScene,
  },
  {
    icon: PackageCheck,
    label: "Entrega & ajustes",
    description: "Deploy, testes e refinamentos com base no seu feedback, até o projeto redondo.",
    Scene: DeliveryScene,
  },
];

const ACCENT = "#c8ff4d";
const ACCENT_DIM = "#8fb537";
const MUTED = "#8f8f96";
const LINE = "#28282d";

/**
 * Sequential spotlight scroll effect: the six process-stage cards are stacked
 * on top of each other in the center of a sticky viewport, but only one is in
 * focus at a time. As the user scrolls through this (tall) section, each card
 * rises into the center (scale up, fade in, icon/number turn accent), holds,
 * then exits upward as the next one takes its place. Driven by a single GSAP
 * timeline + ScrollTrigger(scrub), so scrolling back up reverses it naturally.
 */
export default function Process() {
  const stackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const section = node.closest<HTMLElement>("[data-explode-section]");
    const cards = Array.from(node.querySelectorAll<HTMLElement>("[data-fragment]"));
    const dots = Array.from(node.querySelectorAll<HTMLElement>("[data-step-dot]"));
    if (!section || !cards.length) return;

    gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.97 });
    gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });
    cards.forEach((card, i) => {
      const icon = card.querySelector<HTMLElement>("[data-fragment-icon]");
      const number = card.querySelector<HTMLElement>("[data-fragment-number]");
      gsap.set([icon, number], { color: i === 0 ? ACCENT : MUTED });
    });
    gsap.set(dots, { backgroundColor: LINE });
    if (dots[0]) gsap.set(dots[0], { backgroundColor: ACCENT_DIM });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Soft, overlapping cross-fades between consecutive cards: as one drifts
    // up and fades out, the next drifts into place and fades in over the same
    // window, so there's no hard cut. Colors and progress dots ease together.
    for (let b = 1; b < cards.length; b++) {
      const prev = cards[b - 1];
      const next = cards[b];
      const prevIcon = prev.querySelector<HTMLElement>("[data-fragment-icon]");
      const prevNum = prev.querySelector<HTMLElement>("[data-fragment-number]");
      const nextIcon = next.querySelector<HTMLElement>("[data-fragment-icon]");
      const nextNum = next.querySelector<HTMLElement>("[data-fragment-number]");
      const at = b - 0.4;

      tl.to(prev, { autoAlpha: 0, y: -40, scale: 0.97, duration: 0.9, ease: "sine.inOut" }, at)
        .to(next, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "sine.inOut" }, at)
        .to([prevIcon, prevNum], { color: MUTED, duration: 0.7, ease: "sine.inOut" }, at)
        .to([nextIcon, nextNum], { color: ACCENT, duration: 0.7, ease: "sine.inOut" }, at)
        .to(dots[b - 1], { backgroundColor: LINE, duration: 0.7, ease: "sine.inOut" }, at)
        .to(dots[b], { backgroundColor: ACCENT_DIM, duration: 0.7, ease: "sine.inOut" }, at);
    }
  }, []);

  return (
    <>
      <section className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            index="06. Como funciona"
            title="Como funciona"
            description="Se você quer desenvolver algo comigo, é assim que a gente caminha: do briefing até o projeto no ar, respeitando a órbita de cada etapa antes de ganhar velocidade de escape rumo à próxima."
          />
        </div>
      </section>

      <section data-explode-section id="process" className="relative min-h-[540vh]">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div ref={stackRef} className="mx-auto w-full max-w-4xl">
            <div className="relative h-[30rem] sm:h-[26rem]">
              {stages.map((stage, index) => (
                <div
                  key={stage.label}
                  data-fragment
                  className="absolute inset-0 border border-line bg-surface p-8 sm:p-12"
                >
                  {stage.Scene ? (
                    <div className="grid h-full items-center gap-8 sm:grid-cols-2">
                      <div className="order-2 flex flex-col justify-center sm:order-1">
                        <div className="mb-6 flex items-center justify-between">
                          <div
                            data-fragment-icon
                            className="flex h-14 w-14 items-center justify-center border border-current"
                          >
                            <stage.icon className="h-7 w-7" />
                          </div>
                          <span data-fragment-number className="font-mono text-sm">
                            0{index + 1} / 0{stages.length}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl text-paper sm:text-4xl">{stage.label}</h3>
                        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                          {stage.description}
                        </p>
                      </div>
                      <div className="order-1 h-48 sm:order-2 sm:h-full">
                        <stage.Scene />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-center">
                      <div className="mb-8 flex items-center justify-between">
                        <div
                          data-fragment-icon
                          className="flex h-16 w-16 items-center justify-center border border-current"
                        >
                          <stage.icon className="h-8 w-8" />
                        </div>
                        <span data-fragment-number className="font-mono text-sm">
                          0{index + 1} / 0{stages.length}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl text-paper sm:text-4xl">{stage.label}</h3>
                      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{stage.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {stages.map((stage) => (
                <span key={stage.label} data-step-dot className="h-1 w-6 rounded-full bg-line" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
