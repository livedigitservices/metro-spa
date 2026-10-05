import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".testi-card", start: "top 88%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".testi-inner",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [idx]);

  const t = TESTIMONIALS[idx];

  return (
    <section ref={root} className="relative overflow-hidden bg-cream-2 py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-10">
        <div className="text-center">
          <Eyebrow>Guest Stories</Eyebrow>
          <h2 className="font-display mt-5 text-5xl font-light md:text-6xl">
            Loved across <em className="gold-gradient-text font-normal italic">Hyderabad.</em>
          </h2>
        </div>

        <div
          className="testi-card relative mt-12 overflow-hidden rounded-[2rem] bg-ink p-8 text-cream shadow-[0_50px_100px_-30px_rgba(11,26,23,0.5)] md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute right-8 top-8 h-16 w-16 text-gold/15 md:h-24 md:w-24" />
          <div className="testi-inner">
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-display mt-6 text-2xl font-light leading-snug md:text-4xl md:leading-tight">
              “{t.text}”
            </p>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="font-script flex h-14 w-14 items-center justify-center rounded-full bg-gold text-3xl text-ink">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-2">
                    {t.area} · {t.service}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 transition hover:border-gold hover:text-gold-2"
                  aria-label="Previous"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="font-display text-sm italic text-cream/50">
                  0{idx + 1} / 0{TESTIMONIALS.length}
                </span>
                <button
                  onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink transition hover:bg-gold-2"
                  aria-label="Next"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          {/* progress dots */}
          <div className="mt-8 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === idx ? "w-12 bg-gold" : "w-6 bg-cream/15 hover:bg-cream/30"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
