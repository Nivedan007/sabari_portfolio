import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/* Scroll progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[var(--gradient-primary)]"
    />
  );
}

/* Spotlight cursor that follows mouse */
export function Spotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  const bg = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, oklch(0.72 0.22 310 / 0.15), transparent 40%)`;
  return <motion.div style={{ background: bg }} className="pointer-events-none fixed inset-0 z-30 hidden md:block" />;
}

/* Magnetic wrapper for buttons */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

/* 3D tilt card */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8); rx.set(-py * 8);
  };
  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word text reveal */
export function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: "easeOut" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Infinite marquee */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/10 bg-white/[0.02]">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((s, i) => (
          <span key={i} className="text-3xl md:text-5xl font-display font-bold text-muted-foreground/60 hover:text-gradient transition">
            {s} <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* Parallax wrapper */
export function Parallax({ children, offset = 80 }: { children: ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}
