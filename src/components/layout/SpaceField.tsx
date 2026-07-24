import { useCallback, useRef } from "react";

/* ----------------------------------------------------------------------------
 * Palette & interaction constants
 * ------------------------------------------------------------------------- */
const STAR = [243, 241, 234] as const; // paper
const ACCENT = [200, 255, 77] as const;
const CURSOR_RADIUS = 175;
const LINK_DIST = 78;

/* Black hole tuning (single source of truth) */
const BH = {
  xRatio: 0.82, // horizontal position (fraction of viewport width)
  yRatio: 1.85, // vertical position (multiplier of viewport height)
  parallax: 0.38, // scroll parallax factor
  chargeRate: 0.0035, // gravity build-up per frame while hovered (~7-8s to collapse)
  releaseRate: 0.02, // gravity decay per frame when not hovered
  explosionRate: 0.02, // supernova shockwave progress per frame
  coreGrowthExp: 2.2, // easing exponent for the growing event horizon
} as const;

/* Responsive particle budgets */
const MOBILE_BREAKPOINT = 640;
const budget = (isMobile: boolean) => ({
  starDivisor: isMobile ? 9000 : 5500,
  bhParticles: isMobile ? 150 : 280,
  debris: isMobile ? 110 : 220,
});

const CHAR_POOL = "PatrickBrando<>{}/01functionReactTS;=".split("");

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
interface Star {
  x: number;
  y: number;
  z: number; // depth factor for parallax
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
  x: number;
  y: number;
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
  speed: number;
  color: string;
}

/**
 * Rich cosmic background:
 * 1. Parallax nebula backdrop, suns and planets travelling as the user scrolls
 * 2. Accretion-disk black hole with an interactive gravitational singularity
 * 3. Hovering the black hole slowly swallows the page (letters + DOM) then
 *    resets everything with a supernova shockwave
 * 4. Twinkling stars, cursor constellations and shooting stars
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

    /* --- mutable state -------------------------------------------------- */
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let bhParticles: AccretionParticle[] = [];
    let debris: TextDebris[] = [];
    let backdrop: HTMLCanvasElement | null = null;

    const mouse = { x: -9999, y: -9999 };
    let scrollYTarget = window.scrollY;
    let scrollYCurr = window.scrollY;
    let raf = 0;
    let nextShoot = 0;

    // Singularity state
    let pullFactor = 0; // 0..1 gravity charge
    let explosionProgress = 0; // >0 while the supernova shockwave plays
    let armed = true; // must leave the BH after an explosion before re-charging
    let domDirty = false; // whether the page currently has distortion styles applied
    let debrisDirty = false; // whether debris needs snapping back home

    const appContainer = document.querySelector(".relative.z-10") as HTMLElement | null;

    /* --- static scene data ---------------------------------------------- */
    const suns: Sun[] = [
      { x: 0.85, y: 0.25, r: 55, coreColor: "rgba(255, 235, 170, 0.9)", haloColor: "rgba(200, 255, 77, 0.2)", z: 0.3 },
      { x: 0.15, y: 1.65, r: 42, coreColor: "rgba(160, 210, 255, 0.9)", haloColor: "rgba(100, 180, 255, 0.25)", z: 0.35 },
      { x: 0.82, y: 2.85, r: 35, coreColor: "rgba(255, 120, 90, 0.85)", haloColor: "rgba(255, 80, 50, 0.2)", z: 0.25 },
    ];

    const planets: Planet[] = [
      { x: 0.2, y: 0.75, r: 28, color: "#2A4B62", ring: true, ringColor: "rgba(200, 255, 77, 0.4)", z: 0.45 },
      { x: 0.78, y: 1.2, r: 20, color: "#1E5F74", ring: false, z: 0.5 },
      { x: 0.25, y: 2.2, r: 16, color: "#8C3B2B", ring: false, z: 0.4 },
      { x: 0.75, y: 2.6, r: 24, color: "#502C6C", ring: true, ringColor: "rgba(180, 140, 255, 0.35)", z: 0.42 },
    ];

    /* --- factories ------------------------------------------------------ */
    const createBhParticle = (): AccretionParticle => {
      const radius = Math.random() * 110 + 25;
      return {
        angle: Math.random() * Math.PI * 2,
        radius,
        speed: (Math.random() * 0.004 + 0.0015) * (60 / radius),
        size: Math.random() * 1.8 + 0.6,
        color: `hsl(${Math.random() * 50 + 25}, 100%, ${Math.random() * 40 + 60}%)`,
        maxLife: Math.random() * 220 + 140,
        life: Math.floor(Math.random() * 180),
      };
    };

    const createDebris = (): TextDebris => {
      const hx = Math.random() * w;
      const hy = Math.random() * h;
      return {
        char: CHAR_POOL[(Math.random() * CHAR_POOL.length) | 0],
        x: hx,
        y: hy,
        homeX: hx,
        homeY: hy,
        size: ((Math.random() * 12) | 0) + 12,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.02,
        color: Math.random() > 0.4 ? "#C8FF4D" : "#F3F0E6",
      };
    };

    const buildBackdrop = () => {
      const bd = document.createElement("canvas");
      bd.width = w;
      bd.height = Math.round(h * 3.8);
      const b = bd.getContext("2d");
      if (!b) return;
      const maxwh = Math.max(w, h);

      const nebulae: Array<{ x: number; y: number; r: number; c: [number, number, number] }> = [
        { x: w * 0.25, y: h * 0.35, r: maxwh * 0.4, c: [96, 62, 158] },
        { x: w * 0.75, y: h * 1.1, r: maxwh * 0.38, c: [28, 92, 118] },
        { x: w * 0.3, y: h * 2.0, r: maxwh * 0.42, c: [110, 150, 60] },
        { x: w * 0.7, y: h * 2.9, r: maxwh * 0.36, c: [140, 50, 110] },
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

      const b = budget(w < MOBILE_BREAKPOINT);

      const count = Math.round((w * h) / b.starDivisor);
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

      bhParticles = Array.from({ length: b.bhParticles }, createBhParticle);
      debris = Array.from({ length: b.debris }, createDebris);
      buildBackdrop();
    };

    /* --- draw helpers --------------------------------------------------- */
    const drawSuns = () => {
      for (const sun of suns) {
        const sy = sun.y * h - scrollYCurr * sun.z;
        const sx = sun.x * w;
        if (sy < -sun.r * 4 || sy > h + sun.r * 4) continue;

        const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, sun.r * 3);
        halo.addColorStop(0, sun.haloColor);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(sx, sy, sun.r * 3, 0, Math.PI * 2);
        ctx.fill();

        const core = ctx.createRadialGradient(sx, sy, 0, sx, sy, sun.r);
        core.addColorStop(0, "#FFFFFF");
        core.addColorStop(0.4, sun.coreColor);
        core.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(sx, sy, sun.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawPlanets = () => {
      for (const planet of planets) {
        const py = planet.y * h - scrollYCurr * planet.z;
        const px = planet.x * w;
        if (py < -planet.r * 4 || py > h + planet.r * 4) continue;

        const atmo = ctx.createRadialGradient(px, py, planet.r * 0.8, px, py, planet.r * 1.3);
        atmo.addColorStop(0, "rgba(200, 255, 77, 0)");
        atmo.addColorStop(0.8, "rgba(200, 255, 77, 0.15)");
        atmo.addColorStop(1, "rgba(200, 255, 77, 0)");
        ctx.fillStyle = atmo;
        ctx.beginPath();
        ctx.arc(px, py, planet.r * 1.3, 0, Math.PI * 2);
        ctx.fill();

        const body = ctx.createRadialGradient(px - planet.r * 0.3, py - planet.r * 0.3, 0, px, py, planet.r);
        body.addColorStop(0, "#EBFFA0");
        body.addColorStop(0.3, planet.color);
        body.addColorStop(1, "#0A0D12");
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(px, py, planet.r, 0, Math.PI * 2);
        ctx.fill();

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
    };

    const drawBlackHole = (bhX: number, bhY: number, coreRadius: number) => {
      const outer = coreRadius * 3 + 120;
      const glow = ctx.createRadialGradient(bhX, bhY, coreRadius * 0.8, bhX, bhY, outer);
      glow.addColorStop(0, "#FFFFFF");
      glow.addColorStop(0.2, "rgba(255, 170, 51, 0.85)");
      glow.addColorStop(0.5, "rgba(200, 60, 255, 0.4)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(bhX, bhY, outer, 0, Math.PI * 2);
      ctx.fill();

      // Accretion disk (elliptical perspective)
      for (let i = 0; i < bhParticles.length; i++) {
        const p = bhParticles[i];
        p.angle += p.speed * (1 + pullFactor * 1.1);
        p.radius -= 0.12;
        p.life++;

        if (p.radius < 14 || p.life > p.maxLife) {
          bhParticles[i] = createBhParticle();
          continue;
        }

        const rr = p.radius + pullFactor * 60;
        const px = bhX + Math.cos(p.angle) * rr * 1.5;
        const py = bhY + Math.sin(p.angle) * rr * 0.45;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (1 + pullFactor), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Event horizon
      ctx.fillStyle = "#010103";
      ctx.beginPath();
      ctx.arc(bhX, bhY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Photon ring
      ctx.strokeStyle = `rgba(200, 255, 77, ${Math.max(0.2, 1 - pullFactor)})`;
      ctx.lineWidth = 1.5 + pullFactor * 4;
      ctx.beginPath();
      ctx.arc(bhX, bhY, coreRadius + 1.5, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawDebris = (bhX: number, bhY: number, coreRadius: number) => {
      if (pullFactor <= 0) {
        if (debrisDirty) {
          for (const p of debris) {
            p.x = p.homeX;
            p.y = p.homeY;
          }
          debrisDirty = false;
        }
        return;
      }

      debrisDirty = true;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of debris) {
        const dx = bhX - p.x;
        const dy = bhY - p.y;
        const dist = Math.hypot(dx, dy);
        p.angle += p.speed * (1 + pullFactor * 4);

        if (dist > coreRadius) {
          const pullSpeed = (5 + (1 / Math.max(10, dist)) * 8000) * pullFactor;
          p.x += (dx / dist) * pullSpeed + Math.cos(p.angle) * 3;
          p.y += (dy / dist) * pullSpeed + Math.sin(p.angle) * 3;
        } else {
          p.x = p.homeX + (Math.random() - 0.5) * 300;
          p.y = p.homeY + (Math.random() - 0.5) * 300;
        }

        ctx.fillStyle = p.color;
        ctx.font = `bold ${p.size * (1 + pullFactor * 0.5)}px monospace`;
        ctx.globalAlpha = Math.min(1, pullFactor * 1.5) * Math.max(0, 1 - dist / (w * 0.8));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const applyDomDistortion = (bhX: number, bhY: number) => {
      if (!appContainer) return;

      if (explosionProgress > 0) {
        appContainer.style.transform = `scale(${1 + explosionProgress * 0.1})`;
        appContainer.style.filter = `blur(${(1 - explosionProgress) * 16}px)`;
        appContainer.style.opacity = `${explosionProgress}`;
        domDirty = true;
      } else if (pullFactor > 0) {
        const scale = Math.max(0.01, 1 - Math.pow(pullFactor, 1.8));
        appContainer.style.transformOrigin = `${(bhX / w) * 100}% ${(bhY / h) * 100}%`;
        appContainer.style.transform = `scale(${scale}) rotate(${pullFactor * 12}deg)`;
        appContainer.style.filter = `blur(${pullFactor * 18}px) contrast(${100 + pullFactor * 100}%)`;
        appContainer.style.opacity = `${Math.max(0, 1 - Math.pow(pullFactor, 1.2))}`;
        domDirty = true;
      } else if (domDirty) {
        appContainer.style.transform = "";
        appContainer.style.filter = "";
        appContainer.style.opacity = "";
        domDirty = false;
      }
    };

    const drawStars = (t: number) => {
      const near: Array<{ x: number; y: number }> = [];
      for (const s of stars) {
        let py = (s.y - scrollYCurr * s.z) % (h * 4);
        if (py < -20) py += h * 4;
        if (py > h + 20) continue;

        const tw = reduce ? 0.9 : 0.6 + 0.4 * Math.sin(t * s.tw + s.ph);
        let alpha = s.a * tw;
        let r = s.r;

        const d = Math.hypot(s.x - mouse.x, py - mouse.y);
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

      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${(1 - d / LINK_DIST) * 0.55})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    const drawShooters = (now: number) => {
      if (reduce) return;

      if (now > nextShoot) {
        nextShoot = now + 3500 + Math.random() * 5000;
        const fromLeft = Math.random() < 0.5;
        const startX = fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4;
        const ang = Math.PI * (0.15 + Math.random() * 0.2);
        const spd = 7 + Math.random() * 4;
        shooters.push({
          x: startX,
          y: Math.random() * h * 0.4,
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
    };

    /* --- singularity state machine ------------------------------------- */
    const updateGravity = (bhX: number, bhY: number, coreRadius: number) => {
      const hovering = Math.hypot(mouse.x - bhX, mouse.y - bhY) < 80 + coreRadius;

      if (explosionProgress > 0) {
        // Supernova shockwave
        explosionProgress += BH.explosionRate;
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
          armed = false; // require leaving the BH before re-charging
        }
      } else if (hovering && armed) {
        pullFactor = Math.min(1, pullFactor + BH.chargeRate);
        if (pullFactor >= 1) explosionProgress = 0.01; // trigger supernova
      } else {
        if (!hovering) armed = true; // re-arm once the cursor leaves
        pullFactor = Math.max(0, pullFactor - BH.releaseRate);
      }
    };

    /* --- main loop ------------------------------------------------------ */
    const render = (now: number) => {
      const t = now * 0.001;
      scrollYCurr += (scrollYTarget - scrollYCurr) * 0.08;

      ctx.clearRect(0, 0, w, h);

      if (backdrop) ctx.drawImage(backdrop, 0, -(scrollYCurr * 0.15), w, backdrop.height);

      drawSuns();
      drawPlanets();

      const bhX = w * BH.xRatio;
      const bhY = h * BH.yRatio - scrollYCurr * BH.parallax;
      const maxScreenRadius = Math.max(w, h) * 1.25;
      const coreRadius = 20 + Math.pow(pullFactor, BH.coreGrowthExp) * maxScreenRadius;
      const onScreen = bhY > -maxScreenRadius && bhY < h + maxScreenRadius;

      if (onScreen) drawBlackHole(bhX, bhY, coreRadius);
      updateGravity(bhX, bhY, coreRadius);
      drawDebris(bhX, bhY, coreRadius);
      applyDomDistortion(bhX, bhY);

      drawStars(t);
      drawShooters(now);

      raf = requestAnimationFrame(render);
    };

    /* --- events --------------------------------------------------------- */
    const onMove = (e: MouseEvent) => {
      if (explosionProgress > 0) return; // freeze input during the supernova
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
      // Ensure page distortion never sticks after unmount
      if (appContainer && domDirty) {
        appContainer.style.transform = "";
        appContainer.style.filter = "";
        appContainer.style.opacity = "";
      }
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
