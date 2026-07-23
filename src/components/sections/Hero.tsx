import { useCallback } from "react";
import { Coffee, Heart } from "lucide-react";
import { gsap } from "../../lib/gsap";
import HeroScene from "../three/HeroScene";
import ErrorBoundary from "../layout/ErrorBoundary";
import patrickImage from "../../assets/foto.jpg";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const introRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const targets = node.querySelectorAll("[data-hero-reveal]");
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.15 },
    );
  }, []);

  // Scroll-scrubbed fade/scale-out: the content stays stuck to the viewport
  // (via CSS sticky) while the taller wrapping section scrolls past behind
  // it, then hands off smoothly to the next section.
  const scrubRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const content = node.querySelector("[data-hero-scrub]");
    if (!content) return;
    gsap.to(content, {
      scale: 0.92,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: node,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="home" ref={scrubRef} className="relative min-h-[160vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-70">
          <ErrorBoundary>
            <HeroScene />
          </ErrorBoundary>
        </div>

        <div
          data-hero-scrub
          ref={introRef}
          className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_0.7fr]"
        >
        <div>
          <p data-hero-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Desenvolvedor Full-Stack, DataCrazy CRM
          </p>

          <h1
            data-hero-reveal
            className="font-display text-clamp-hero font-medium leading-[0.95] tracking-tight text-paper"
          >
            Patrick
            <br />
            Brando
          </h1>

          <p data-hero-reveal className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Trabalho como desenvolvedor Full-Stack na DataCrazy, entre features novas e bugs que precisam de uma
            investigação mais a fundo. Ubuntu é meu sistema desde que comecei a programar.
          </p>

          <div data-hero-reveal className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate("services")}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 font-mono text-sm text-ink transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" />
              Como posso ajudar
            </button>
            <button
              onClick={() => onNavigate("contact")}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <Coffee className="h-4 w-4" />
              Vamos conversar
            </button>
          </div>
        </div>

        <div data-hero-reveal className="justify-self-center md:justify-self-end">
          <div className="relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72">
            <div className="absolute -inset-3 border border-accent/40" />
            <img
              src={patrickImage}
              alt="Patrick Brando"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      <div
        data-hero-reveal
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-muted sm:block"
      >
        Scroll ↓
      </div>
      </div>
    </section>
  );
}
