import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LotusMark } from "./ui";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.v)),
      onComplete: () => {
        if (!root.current) return;
        const tl = gsap.timeline({ onComplete: onDone });
        tl.to(".pre-lotus", { scale: 1.4, opacity: 0, duration: 0.6, ease: "power3.in" })
          .to(".pre-word", { yPercent: -120, duration: 0.5, ease: "power3.in", stagger: 0.05 }, "<")
          .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.15");
      },
    });
    return () => {
      tween.kill();
    };
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss-2/60 blur-[120px]" />
      <div className="pre-lotus relative text-gold">
        <LotusMark className="h-16 w-16 animate-breathe" />
      </div>
      <div className="mt-6 overflow-hidden">
        <p className="pre-word font-script text-5xl text-gold-2 md:text-6xl">Metro</p>
      </div>
      <div className="overflow-hidden">
        <p className="pre-word mt-1 text-[11px] font-bold uppercase tracking-[0.55em] text-cream/70">
          SPA · Wellness
        </p>
      </div>
      {/* progress */}
      <div className="mt-10 w-56">
        <div className="flex items-end justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Breathing in</span>
          <span className="font-display text-2xl italic text-gold-2">{count}%</span>
        </div>
        <div className="mt-3 h-px w-full bg-cream/15">
          <div className="h-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 transition-all" style={{ width: `${count}%` }} />
        </div>
      </div>
    </div>
  );
}
