import { useCallback, useRef } from "react";

// Dev / IT themed glyphs — short tokens keep the grid density even.
const GLYPHS = [
  "{ }",
  "</>",
  "=>",
  "();",
  "const",
  "git",
  "npm",
  "sudo",
  "~$",
  "tsx",
  "&&",
  "||",
  "fn()",
  "[]",
  "::",
  "#!",
  "/*",
  "0",
  "1",
  "<>",
  "AI",
  "css",
  "404",
  "SSH",
];

const CELL = 34;
const RADIUS = 150;
const MUTED = [143, 143, 150] as const;
const ACCENT = [200, 255, 77] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Cell {
  x: number;
  y: number;
  glyph: string;
  phase: number;
}

/**
 * Interactive dev-themed background field: a faint grid of code/IT glyphs drawn
 * on a fixed full-viewport canvas behind all content. Each glyph gently breathes
 * on its own, and glyphs near the cursor light up accent-green and scale up —
 * a subtle, motion.dev-style reactive backdrop. Canvas-based for performance;
 * pointer-events are disabled so it never blocks clicks.
 */
export default function CodeField() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const ref = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cells: Cell[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let lastFont = "";

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cells = [];
      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * CELL + CELL / 2,
            y: r * CELL + CELL / 2,
            glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = now * 0.001;

      for (const cell of cells) {
        const dx = cell.x - mouse.x;
        const dy = cell.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = dist < RADIUS ? 1 - dist / RADIUS : 0;
        const te = t * t;

        const wave = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time * 1.2 + cell.phase);
        const alpha = 0.08 + wave * 0.06 + te * 0.85;

        const rr = lerp(MUTED[0], ACCENT[0], te) | 0;
        const gg = lerp(MUTED[1], ACCENT[1], te) | 0;
        const bb = lerp(MUTED[2], ACCENT[2], te) | 0;

        const size = Math.round(12 + te * 9);
        const font = `${size}px 'JetBrains Mono', monospace`;
        if (font !== lastFont) {
          ctx.font = font;
          lastFont = font;
        }

        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.fillText(cell.glyph, cell.x, cell.y);
      }

      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();

    build();
    raf = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", onResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
