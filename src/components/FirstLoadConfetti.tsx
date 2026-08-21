import { useEffect } from "react";

/**
 * FirstLoadConfetti — standalone, removable celebratory confetti burst.
 * Fires every time the homepage ("/") loads.
 * To remove permanently: delete this file and its usage in routes/__root.tsx.
 */

const DURATION_MS = 6000;
const PARTICLE_COUNT = 320;
// Brand palette: deep purple, teal, gold, cream
const COLORS = ["#2D0A4E", "#43DBC3", "#E8C25A", "#FDF6EC", "#7A4FA3"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "rect" | "circle";
}

export function FirstLoadConfetti() {
  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      // Burst from both bottom corners toward the middle-top
      const fromLeft = Math.random() < 0.5;
      const angle = fromLeft
        ? -Math.PI / 3 - Math.random() * (Math.PI / 6) // up-right
        : -Math.PI + Math.PI / 6 + Math.random() * (Math.PI / 6); // up-left
      const speed = 18 + Math.random() * 12;
      return {
        x: fromLeft ? 0 : window.innerWidth,
        y: window.innerHeight * (0.7 + Math.random() * 0.3),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        shape: Math.random() < 0.7 ? "rect" : "circle",
      };
    });

    const gravity = 0.16;
    const drag = 0.992;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const fade = Math.max(0, 1 - elapsed / DURATION_MS);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      canvas.remove();
    };
  }, []);

  return null;
}
