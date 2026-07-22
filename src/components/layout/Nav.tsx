import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../lib/data";

interface NavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Nav({ activeSection, onNavigate }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-line/80 bg-ink/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavigate("home")}
          className="font-display text-lg tracking-tight text-paper"
          data-cursor="hover"
        >
          Patrick Brando<span className="text-accent">.</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              data-cursor="hover"
              className={`group flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeSection === item.id ? "text-accent" : "text-muted hover:text-paper"
              }`}
            >
              <span className="text-[10px] opacity-50">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="text-paper md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-line px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`block w-full py-2.5 text-left font-mono text-sm uppercase tracking-wide ${
                activeSection === item.id ? "text-accent" : "text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
