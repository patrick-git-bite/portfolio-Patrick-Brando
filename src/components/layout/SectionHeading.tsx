import { useReveal } from "../../hooks/useReveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ index, title, description, align = "left" }: SectionHeadingProps) {
  const revealRef = useReveal<HTMLDivElement>({ y: 24 });

  return (
    <div ref={revealRef} className={`mb-16 ${align === "center" ? "mx-auto max-w-2xl text-center" : ""}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{index}</p>
      <h2 className="font-display text-clamp-h2 leading-[1.05] text-paper">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}
