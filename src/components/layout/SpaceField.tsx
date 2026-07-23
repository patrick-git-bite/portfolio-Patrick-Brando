import { useCallback, useRef } from "react";

const STAR = [243, 241, 234] as const; // paper
const ACCENT = [200, 255, 77] as const;
const CURSOR_RADIUS = 175;
const LINK_DIST = 78;

interface Star {
  x: number;
  y: number;
  z: number; // depth factor (0.1 to 1.2) for parallax
  r: number;
  a: number;
  tw: number;
  ph: number;
}

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

interface AccretionParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Planet {
  x: number; // relative fraction 0..1
  y: number; // relative height multiplier in cosmic journey
  r: number;
  color: string;
  ring: boolean;
  ringColor?: string;
  z: number;
}

interface Sun {
  x: number;
  y: number;
  r: number;
  coreColor: string;
  haloColor: string;
  z: number;
}

interface TextDebris {
  char: string;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  size: number;
  angle: number;
  dist: number;
  speed: number;
  color: string;
}

const CHAR_POOL = ["P", "a", "t", "r", "i", "c", "k", "B", "r", "a", "n", "d", "o", "<", ">", "{", "}", "/", "0", "1", "f", "u", "n", "c", "t", "i", "o", "n", "R", "e", "a", "c", "t", "T", "S", ";", "="];

/**
 * Rich cosmic background with:
 * 1. Accretion Disk Black Hole (particles spiraling into event horizon)
 * 2. Multiple Suns / Stars (Giant yellow sun, blue giant, red dwarf)
 * 3. Planets with atmospheric glow and rings (Saturn-like gas giant, blue ocean planet, terra/red planet)
 * 4. Parallax vertical travel as the user scrolls
 * 5. Interactive constellation connecting lines near mouse
 * 6. Gravitational Singularity swallowing letters & UI into a supernova reset
 */
export default function SpaceField() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const ref = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let bhParticles: AccretionParticle[] = [];
    let debrisParticles: TextDebris[] = [];
    let backdrop: HTMLCanvasElement | null = null;
    const mouse = { x: -9999, y: -9999 };
    let scrollYTarget = window.scrollY;
    let scrollYCurr = window.scrollY;
    let raf = 0;
    let nextShoot = 0;

    // Singularity hover & growth state
    let pullFactor = 0; // 0 to 1 (charge up speed when mouse is over black hole)
    let isHoveringBh = false;
    let explosionProgress = 0; // > 0 when triggered
    const appContainer = document.querySelector(".relative.z-10") as HTMLElement | null;

    // Celestial objects definitions spread out along the scroll page length (3.5x viewport height)
    const suns: Sun[] = [
      { x: 0.85, y: 0.25, r: 55, coreColor: "rgba(255, 235, 170, 0.9)", haloColor: "rgba(200, 255, 77, 0.2)", z: 0.3 },
      { x: 0.15, y: 1.65, r: 42, coreColor: "rgba(160, 210, 255, 0.9)", haloColor: "rgba(100, 180, 255, 0.25)", z: 0.35 },
      { x: 0.82, y: 2.85, r: 35, coreColor: "rgba(255, 120, 90, 0.85)", haloColor: "rgba(255, 80, 50, 0.2)", z: 0.25 },
    ];

    const planets: Planet[] = [
      // Ringed Gas Giant
      { x: 0.2, y: 0.75, r: 28, color: "#2A4B62", ring: true, ringColor: "rgba(200, 255, 77, 0.4)", z: 0.45 },
      // Ocean Blue Planet
      { x: 0.78, y: 1.2, r: 20, color: "#1E5F74", ring: false, z: 0.5 },
      // Red Mars-like Planet
      { x: 0.25, y: 2.2, r: 16, color: "#8C3B2B", ring: false, z: 0.4 },
      // Violet Mysterious Exoplanet
      { x: 0.75, y: 2.6, r: 24, color: "#502C6C", ring: true, ringColor: "rgba(180, 140, 255, 0.35)", z: 0.42 },
    ];

    const createBhParticle = (): AccretionParticle => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 110 + 25;
      return {
        angle,
        radius,
        speed: (Math.random() * 0.02 + 0.01) * (120 / radius),
        size: Math.random() * 1.8 + 0.6,
        color: `hsl(${Math.random() * 50 + 25}, 100%, ${Math.random() * 40 + 60}%)`,
        life: 0,
        maxLife: Math.random() * 120 + 80,
      };
    };

    const buildBackdrop = () => {
      const bd = document.createElement("canvas");
      bd.width = w;
      bd.height = Math.round(h * 3.8); // extended total height for full page journey
      const b = bd.getContext("2d");
      if (!b) return;
      const maxwh = Math.max(w, h);

      // Deep Space Nebulae
      const nebulae: Array<{ x: number; y: number; r: number; c: [number, number, number] }> = [
        { x: w * 0.25, y: h * 0.35, r: maxwh * 0.4, c: [96, 62, 158] }, // purple top
        { x: w * 0.75, y: h * 1.1, r: maxwh * 0.38, c: [28, 92, 118] }, // teal middle
        { x: w * 0.3, y: h * 2.0, r: maxwh * 0.42, c: [110, 150, 60] }, // green lower
        { x: w * 0.7, y: h * 2.9, r: maxwh * 0.36, c: [140, 50, 110] }, // magenta bottom
      ];
      for (const n of nebulae) {
        const g = b.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.1)`);
        g.addColorStop(1, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0)`);
        b.fillStyle = g;
        b.fillRect(0, 0, w, bd.height);
      }

      backdrop = bd;
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / 5500);
      stars = Array.from({ length: count }, () => {
        const z = Math.random() * 0.95 + 0.15;
        return {
          x: Math.random() * w,
          y: Math.random() * h * 4,
          z,
          r: z * 1.3 + 0.2,
          a: Math.min(0.8, z * 0.5 + 0.2),
          tw: Math.random() * 1.6 + 0.5,
          ph: Math.random() * Math.PI * 2,
        };
      });

      bhParticles = Array.from({ length: 280 }, () => createBhParticle());

      // Initialize floating text debris letters across screen
      debrisParticles = Array.from({ length: 220 }, () => {
        const hx = Math.random() * w;
        const hy = Math.random() * h;
        return {
          char: CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)],
          x: hx,
          y: hy,
          homeX: hx,
          homeY: hy,
          size: Math.floor(Math.random() * 12) + 12,
          angle: Math.random() * Math.PI * 2,
          dist: 0,
          speed: Math.random() * 0.03 + 0.02,
          color: Math.random() > 0.4 ? "#C8FF4D" : "#F3F0E6",
        };
      });

      buildBackdrop();
    };

    const render = (now: number) => {
      const t = now * 0.001;
      scrollYCurr += (scrollYTarget - scrollYCurr) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Nebula Background
      if (backdrop) {
        const bgOffset = -(scrollYCurr * 0.15);
        ctx.drawImage(backdrop, 0, bgOffset, w, backdrop.height);
      }

      // 2. Render Suns / Giant Stars
      for (const sun of suns) {
        const sy = sun.y * h - scrollYCurr * sun.z;
        const sx = sun.x * w;
        if (sy < -sun.r * 4 || sy > h + sun.r * 4) continue;

        // Halo
        const haloG = ctx.createRadialGradient(sx, sy, 0, sx, sy, sun.r * 3);
        haloG.addColorStop(0, sun.haloColor);
        haloG.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haloG;
        ctx.beginPath();
        ctx.arc(sx, sy, sun.r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreG = ctx.createRadialGradient(sx, sy, 0, sx, sy, sun.r);
        coreG.addColorStop(0, "#FFFFFF");
        coreG.addColorStop(0.4, sun.coreColor);
        coreG.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = coreG;
        ctx.beginPath();
        ctx.arc(sx, sy, sun.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Planets with Atmosphere and Optional Rings
      for (const planet of planets) {
        const py = planet.y * h - scrollYCurr * planet.z;
        const px = planet.x * w;
        if (py < -planet.r * 4 || py > h + planet.r * 4) continue;

        // Planet Atmosphere glow
        const atmoG = ctx.createRadialGradient(px, py, planet.r * 0.8, px, py, planet.r * 1.3);
        atmoG.addColorStop(0, "rgba(200, 255, 77, 0)");
        atmoG.addColorStop(0.8, "rgba(200, 255, 77, 0.15)");
        atmoG.addColorStop(1, "rgba(200, 255, 77, 0)");
        ctx.fillStyle = atmoG;
        ctx.beginPath();
        ctx.arc(px, py, planet.r * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Planet Body
        const pG = ctx.createRadialGradient(px - planet.r * 0.3, py - planet.r * 0.3, 0, px, py, planet.r);
        pG.addColorStop(0, "#EBFFA0");
        pG.addColorStop(0.3, planet.color);
        pG.addColorStop(1, "#0A0D12");
        ctx.fillStyle = pG;
        ctx.beginPath();
        ctx.arc(px, py, planet.r, 0, Math.PI * 2);
        ctx.fill();

        // Planet Ring (if applicable)
        if (planet.ring && planet.ringColor) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(-0.35);
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.r * 2.2, planet.r * 0.5, 0, 0, Math.PI * 2);
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. Render Accretion Disk Black Hole (positioned at middle-lower journey, ~1.85 h)
      const bhX = w * 0.82;
      const bhY = h * 1.85 - scrollYCurr * 0.38;

      // Calculate Black Hole Core Growth based on pullFactor (grows until swallowing screen)
      const maxScreenRadius = Math.max(w, h) * 1.25;
      const currentBhCoreRadius = 20 + Math.pow(pullFactor, 2.2) * maxScreenRadius;

      if (bhY > -maxScreenRadius && bhY < h + maxScreenRadius) {
        // Outer Accretion Glow
        const bhGlow = ctx.createRadialGradient(bhX, bhY, currentBhCoreRadius * 0.8, bhX, bhY, currentBhCoreRadius * 3 + 120);
        bhGlow.addColorStop(0, "#FFFFFF");
        bhGlow.addColorStop(0.2, "rgba(255, 170, 51, 0.85)");
        bhGlow.addColorStop(0.5, "rgba(200, 60, 255, 0.4)");
        bhGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bhGlow;
        ctx.beginPath();
        ctx.arc(bhX, bhY, currentBhCoreRadius * 3 + 120, 0, Math.PI * 2);
        ctx.fill();

        // Accretion Disk Spiraling Particles
        for (let i = 0; i < bhParticles.length; i++) {
          const p = bhParticles[i];
          p.angle += p.speed * (1 + pullFactor * 2);
          p.radius -= 0.22;
          p.life++;

          if (p.radius < 14 || p.life > p.maxLife) {
            bhParticles[i] = createBhParticle();
            continue;
          }

          // Elliptical perspective transform for accretion tilt
          const px = bhX + Math.cos(p.angle) * (p.radius + pullFactor * 60) * 1.5;
          const py = bhY + Math.sin(p.angle) * (p.radius + pullFactor * 60) * 0.45;

          const fade = 1 - p.life / p.maxLife;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = fade;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 + pullFactor), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Giant Dark Horizon Core swallowing everything
        ctx.fillStyle = "#010103";
        ctx.beginPath();
        ctx.arc(bhX, bhY, currentBhCoreRadius, 0, Math.PI * 2);
        ctx.fill();

        // Photon Ring Accent
        ctx.strokeStyle = `rgba(200, 255, 77, ${Math.max(0.2, 1 - pullFactor)})`;
        ctx.lineWidth = 1.5 + pullFactor * 4;
        ctx.beginPath();
        ctx.arc(bhX, bhY, currentBhCoreRadius + 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Black Hole Gravity Pull Interaction Logic
      const dxBh = mouse.x - bhX;
      const dyBh = mouse.y - bhY;
      const distToBh = Math.sqrt(dxBh * dxBh + dyBh * dyBh);

      // Check if mouse is hovering black hole radius
      isHoveringBh = distToBh < (80 + currentBhCoreRadius);

      if (explosionProgress > 0) {
        // Explosion flash & shockwave phase
        explosionProgress += 0.02;
        const shockRadius = explosionProgress * Math.max(w, h) * 1.8;
        const flashAlpha = Math.max(0, 1 - (explosionProgress - 0.15) * 1.6);

        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = `rgba(200, 255, 77, ${1 - explosionProgress})`;
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.arc(bhX, bhY, shockRadius, 0, Math.PI * 2);
        ctx.stroke();

        if (explosionProgress >= 1) {
          explosionProgress = 0;
          pullFactor = 0;
        }
      } else if (isHoveringBh) {
        // Charge up gravity slower (~7-8 seconds to complete collapse)
        pullFactor = Math.min(1, pullFactor + 0.0035);

        if (pullFactor >= 1) {
          // Trigger Big Bang Explosion reset
          explosionProgress = 0.01;
        }
      } else {
        // Release gravity gradually back to normal
        pullFactor = Math.max(0, pullFactor - 0.02);
      }

      // 6. Swallowing Debris Text Particles Animation
      if (pullFactor > 0) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < debrisParticles.length; i++) {
          const p = debrisParticles[i];
          
          // Calculate vector towards black hole
          const dx = bhX - p.x;
          const dy = bhY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          p.angle += p.speed * (1 + pullFactor * 4);

          if (dist > currentBhCoreRadius) {
            // Spiral towards black hole center
            const pullSpeed = (5 + (1 / Math.max(10, dist)) * 8000) * pullFactor;
            p.x += (dx / dist) * pullSpeed + Math.cos(p.angle) * 3;
            p.y += (dy / dist) * pullSpeed + Math.sin(p.angle) * 3;
          } else {
            // Respawn outwards if sucked inside
            p.x = p.homeX + (Math.random() - 0.5) * 300;
            p.y = p.homeY + (Math.random() - 0.5) * 300;
          }

          // Render letter debris
          const letterAlpha = Math.min(1, pullFactor * 1.5) * Math.max(0, 1 - dist / (w * 0.8));
          ctx.fillStyle = p.color;
          ctx.font = `bold ${p.size * (1 + pullFactor * 0.5)}px monospace`;
          ctx.globalAlpha = letterAlpha;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillText(p.char, 0, 0);
          ctx.restore();
        }
        ctx.globalAlpha = 1.0;
      } else {
        // Reset debris particle home positions when gravity stops
        for (const p of debrisParticles) {
          p.x = p.homeX;
          p.y = p.homeY;
        }
      }

      // 7. Distort & Disintegrate DOM UI elements based on pullFactor
      if (appContainer) {
        if (explosionProgress > 0) {
          appContainer.style.transform = `scale(${1 + explosionProgress * 0.1})`;
          appContainer.style.filter = `blur(${(1 - explosionProgress) * 16}px)`;
          appContainer.style.opacity = `${explosionProgress}`;
        } else if (pullFactor > 0) {
          const scale = Math.max(0.01, 1 - Math.pow(pullFactor, 1.8));
          const rotate = pullFactor * 12;
          const blur = pullFactor * 18;
          const opacity = Math.max(0, 1 - Math.pow(pullFactor, 1.2));

          appContainer.style.transformOrigin = `${(bhX / w) * 100}% ${(bhY / h) * 100}%`;
          appContainer.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
          appContainer.style.filter = `blur(${blur}px) contrast(${100 + pullFactor * 100}%)`;
          appContainer.style.opacity = `${opacity}`;
        } else {
          appContainer.style.transform = "";
          appContainer.style.filter = "";
          appContainer.style.opacity = "";
        }
      }

      // 8. Render Twinkling Stars & Mouse Constellations
      const near: Array<{ x: number; y: number }> = [];
      for (const s of stars) {
        let py = (s.y - scrollYCurr * s.z) % (h * 4);
        if (py < -20) py += h * 4;
        if (py > h + 20) continue;

        const tw = reduce ? 0.9 : 0.6 + 0.4 * Math.sin(t * s.tw + s.ph);
        let alpha = s.a * tw;
        let r = s.r;

        const dx = s.x - mouse.x;
        const dy = py - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CURSOR_RADIUS) {
          const k = 1 - d / CURSOR_RADIUS;
          alpha = Math.min(1, alpha + k * 0.85);
          r = s.r + k * 1.4;
          near.push({ x: s.x, y: py });
        }

        ctx.beginPath();
        ctx.arc(s.x, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${STAR[0]},${STAR[1]},${STAR[2]},${alpha})`;
        ctx.fill();
      }

      // Constellation links between stars near cursor
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const al = (1 - d / LINK_DIST) * 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${al})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // 9. Shooting Stars
      if (!reduce) {
        if (now > nextShoot) {
          nextShoot = now + 3500 + Math.random() * 5000;
          const fromLeft = Math.random() < 0.5;
          const startX = fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4;
          const startY = Math.random() * h * 0.4;
          const ang = Math.PI * (0.15 + Math.random() * 0.2);
          const spd = 7 + Math.random() * 4;
          shooters.push({
            x: startX,
            y: startY,
            vx: Math.cos(ang) * spd * (fromLeft ? 1 : -1),
            vy: Math.sin(ang) * spd,
            life: 0,
            max: 55 + Math.random() * 30,
          });
        }

        shooters = shooters.filter((s) => s.life < s.max && s.x > -60 && s.x < w + 60 && s.y < h + 60);
        for (const s of shooters) {
          s.x += s.vx;
          s.y += s.vy;
          s.life += 1;
          const fade = 1 - s.life / s.max;
          const tailX = s.x - s.vx * 4;
          const tailY = s.y - s.vy * 4;
          const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          g.addColorStop(0, `rgba(${STAR[0]},${STAR[1]},${STAR[2]},${0.9 * fade})`);
          g.addColorStop(1, `rgba(${STAR[0]},${STAR[1]},${STAR[2]},0)`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${STAR[0]},${STAR[1]},${STAR[2]},${fade})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      // Ignore new mouse movements during explosion shockwave phase
      if (explosionProgress > 0) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      scrollYTarget = window.scrollY;
    };
    const onResize = () => build();

    build();
    raf = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
