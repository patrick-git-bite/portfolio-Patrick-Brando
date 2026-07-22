import { Eye, FileText } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

export default function Resume() {
  const revealRef = useReveal<HTMLDivElement>({ y: 24 });

  return (
    <section className="border-t border-line px-4 py-20 sm:px-6 lg:px-8">
      <div ref={revealRef} className="mx-auto max-w-4xl border border-line p-8 text-center sm:p-12">
        <FileText className="mx-auto h-8 w-8 text-accent" />
        <h3 className="mt-4 font-display text-2xl text-paper sm:text-3xl">Currículo</h3>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Quer conhecer minha trajetória completa? Visualize ou baixe meu currículo atualizado.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/projects/Patrick_Brando_CV_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 font-mono text-sm text-ink transition-transform hover:-translate-y-0.5"
          >
            <Eye className="h-4 w-4" />
            Visualizar CV
          </a>
          <a
            href="/projects/Patrick_Brando_CV_EN.pdf"
            download="Patrick_Brando_CV.pdf"
            data-cursor="hover"
            className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
          >
            <FileText className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
