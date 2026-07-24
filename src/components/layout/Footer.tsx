import { navItems } from "../../lib/data";

interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <h3 className="font-display text-2xl text-paper">Patrick Brando</h3>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">© 2026 Patrick Brando</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
