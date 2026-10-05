import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

/* Magnetic wrapper for premium button hover */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: "power3.out" });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {children}
    </div>
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`eyebrow-line font-body text-[11px] font-bold uppercase tracking-[0.35em] ${
        tone === "dark" ? "text-gold-3" : "text-gold-2"
      }`}
    >
      {children}
    </p>
  );
}

export function LotusMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 8c4 8 4 14 0 20-4-6-4-12 0-20Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M14 18c8 3 13 8 15 15-7-1-12-6-15-15Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M50 18c-8 3-13 8-15 15 7-1 12-6 15-15Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M8 36c8-2 15 0 20 6-6 3-14 2-20-6Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M56 36c-8-2-15 0-20 6 6 3 14 2 20-6Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M18 50c4-4 9-6 14-6s10 2 14 6c-4 5-9 7-14 7s-10-2-14-7Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function GoldButton({
  children,
  onClick,
  variant = "gold",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gold" | "outline-light" | "outline-dark" | "dark";
  className?: string;
}) {
  const styles =
    variant === "gold"
      ? "bg-gold text-ink hover:bg-gold-2"
      : variant === "dark"
      ? "bg-ink text-cream hover:bg-moss"
      : variant === "outline-light"
      ? "border border-cream/30 text-cream hover:border-gold hover:text-gold-2"
      : "border border-ink/20 text-ink hover:border-gold-3 hover:text-gold-3";
  return (
    <Magnetic>
      <button
        onClick={onClick}
        className={`group relative overflow-hidden rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition-all duration-500 ${styles} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </button>
    </Magnetic>
  );
}
