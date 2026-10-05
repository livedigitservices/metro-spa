import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock } from "lucide-react";
import { SERVICES } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onBook }: { onBook: (service?: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".srv-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
      gsap.fromTo(
        ".srv-head",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".srv-head", start: "top 88%" } }
      );
    }, root);

    // floating preview follows cursor — only while the cursor is over the service rows (desktop)
    const el = preview.current;
    if (el) {
      gsap.set(el, { xPercent: -50, yPercent: -50, x: window.innerWidth * 0.7, y: window.innerHeight * 0.4, autoAlpha: 0, scale: 0.85 });
    }
    const xTo = el ? gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" }) : null;
    const yTo = el ? gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" }) : null;

    let mx = -1;
    let my = -1;
    let visible = false;

    const setVisible = (v: boolean) => {
      if (!el || v === visible) return;
      visible = v;
      gsap.to(el, {
        autoAlpha: v ? 1 : 0,
        scale: v ? 1 : 0.85,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    // re-check what's under the cursor (also needed while scrolling, since no mousemove fires)
    const check = () => {
      if (window.innerWidth < 1024 || mx < 0) return setVisible(false);
      const under = document.elementFromPoint(mx, my);
      setVisible(!!under?.closest("[data-srv-list]"));
    };

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (window.innerWidth < 1024) return setVisible(false);
      xTo?.(mx);
      yTo?.(my);
      check();
    };
    const leaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", check, { passive: true });
    document.documentElement.addEventListener("mouseleave", leaveWindow);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", check);
      document.documentElement.removeEventListener("mouseleave", leaveWindow);
    };
  }, []);

  useLayoutEffect(() => {
    if (!preview.current) return;
    const imgs = preview.current.querySelectorAll("img");
    imgs.forEach((img, i) => {
      gsap.to(img, {
        opacity: i === active ? 1 : 0,
        scale: i === active ? 1 : 1.15,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, [active]);

  return (
    <section ref={root} id="services" className="relative overflow-hidden bg-cream-2 py-24 md:py-36">
      {/* floating preview */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[300px] w-[230px] overflow-hidden rounded-2xl shadow-2xl shadow-ink/40 lg:block"
      >
        {SERVICES.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 1 ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="srv-head flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Massage Services & Spa</Eyebrow>
            <h2 className="font-display mt-5 max-w-2xl text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
              Choose your <em className="gold-gradient-text font-normal italic">escape</em>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink/60">
            Six signature therapies, two body-renewal scrubs. Every session ends with
            <span className="font-semibold text-ink"> steam & shower</span> — slow down, release tension, feel refreshed.
          </p>
        </div>

        {/* interactive rows */}
        <div data-srv-list className="mt-12 border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => onBook(s.name)}
              className={`srv-row group relative cursor-pointer border-b border-ink/10 transition-all duration-500 ${
                active === i ? "bg-ink text-cream" : "hover:bg-ink/[0.04]"
              }`}
            >
              <div className="grid items-center gap-4 px-4 py-6 md:grid-cols-12 md:px-8 md:py-8">
                <span
                  className={`font-display text-sm italic md:col-span-1 ${
                    active === i ? "text-gold" : "text-gold-3"
                  }`}
                >
                  {s.index}
                </span>
                <div className="md:col-span-5">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                      active === i ? "text-gold-2" : "text-gold-3"
                    }`}
                  >
                    {s.tag}
                  </p>
                  <h3 className="font-display mt-1 text-3xl font-light transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {s.name}
                  </h3>
                  <p className={`mt-1 text-sm italic ${active === i ? "text-cream/60" : "text-ink/50"}`}>
                    {s.tagline}
                  </p>
                </div>
                <p className={`hidden text-sm leading-relaxed md:col-span-4 md:block ${active === i ? "text-cream/70" : "text-ink/60"}`}>
                  {s.description}
                </p>
                <div className="flex items-center justify-between md:col-span-2 md:flex-col md:items-end md:gap-3">
                  <div className="md:text-right">
                    <p className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${active === i ? "text-cream/60" : "text-ink/50"}`}>
                      <Clock className="h-3.5 w-3.5" /> {s.durationNote}
                    </p>
                    <p className={`font-display mt-1 text-2xl ${active === i ? "text-gold-2" : "text-ink"}`}>
                      {s.price45} <span className="text-sm opacity-60">· {s.price60}</span>
                    </p>
                  </div>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                      active === i
                        ? "rotate-45 bg-gold text-ink"
                        : "border border-ink/15 text-ink group-hover:border-gold-3 group-hover:text-gold-3"
                    }`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
              {/* mobile image */}
              <div className="px-4 pb-6 lg:hidden">
                <div className="h-52 overflow-hidden rounded-2xl">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${active === i ? "text-cream/70" : "text-ink/60"}`}>{s.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.benefits.map((b) => (
                    <span
                      key={b}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                        active === i ? "bg-cream/10 text-cream/80" : "bg-ink/5 text-ink/70"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-ink/40">
          Tap any therapy to reserve · All massages include steam & shower
        </p>
      </div>
    </section>
  );
}