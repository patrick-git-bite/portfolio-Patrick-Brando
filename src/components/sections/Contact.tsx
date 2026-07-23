import { useState } from "react";
import { CheckCircle, Github, Linkedin, Mail, Phone, Send, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../layout/SectionHeading";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "patrickbrando18102003@gmail.com",
    href: "mailto:patrickbrando18102003@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "Resposta rápida garantida!",
    href: "https://wa.me/qr/GQUG62M2EH6RD1",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Veja meus projetos",
    href: "https://github.com/patrick-git-bite",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Vamos nos conectar",
    href: "https://www.linkedin.com/in/patrick-brando",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const infoRef = useReveal<HTMLDivElement>({ x: -24, y: 0 });
  const formRef = useReveal<HTMLDivElement>({ x: 24, y: 0 });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("idle");
    toast.info("Enviando sua mensagem...");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        toast.success("Mensagem enviada com sucesso! Entrarei em contato em breve.");
        setFormData({ name: "", email: "", message: "" });
        setFormStatus("success");
      } else {
        const data = await res.json();
        toast.error(`Erro ao enviar: ${data.message || "Tente novamente."}`);
        setFormStatus("error");
      }
    } catch (err: unknown) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.error("Tempo esgotado. Tente novamente.");
      } else {
        toast.error("Ocorreu um erro de conexão. Verifique sua internet.");
      }
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-line px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="08. Contato"
          title="Vamos bater um papo?"
          description="Tem uma ideia, um projeto pequeno ou precisa de ajuda com tecnologia? Ficarei feliz em conversar."
        />

        <div className="grid gap-12 md:grid-cols-2">
          <div ref={infoRef} className="space-y-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex items-center gap-5 border border-line p-5 transition-colors hover:border-accent/50"
              >
                <link.icon className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">{link.label}</p>
                  <p className="mt-1 text-paper">{link.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6 border border-line p-6 sm:p-8">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                  Seu nome
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Como posso te chamar?"
                  required
                  className="w-full border-0 border-b border-line bg-transparent py-2 text-paper placeholder-muted/60 outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                  Seu email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="seu.email@gmail.com"
                  required
                  className="w-full border-0 border-b border-line bg-transparent py-2 text-paper placeholder-muted/60 outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                  Sua ideia
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Qual é seu projeto? Vamos conversar!"
                  required
                  rows={4}
                  className="w-full resize-none border-0 border-b border-line bg-transparent py-2 text-paper placeholder-muted/60 outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="hover"
                className="flex w-full items-center justify-center gap-2 bg-accent px-6 py-3 font-mono text-sm text-ink transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Enviar mensagem
                  </>
                )}
              </button>

              {formStatus === "success" && (
                <div className="flex items-center gap-3 border border-accent/40 p-4 text-sm text-accent">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  Mensagem enviada! Responderei em até 24h.
                </div>
              )}
              {formStatus === "error" && (
                <div className="flex items-center gap-3 border border-red-500/40 p-4 text-sm text-red-400">
                  <XCircle className="h-4 w-4 flex-shrink-0" />
                  Falha ao enviar. Tente novamente ou fale pelo WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
