import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Clock3 } from "lucide-react";
import { SERVICES, SCRUBS } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Menu({ onBook }: { onBook: (service?: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<"massage" | "scrub">("massage");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".menu-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-item",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }
      );
    }, root);
    return () => ctx.revert();
  }, [tab]);

  return (
    <section ref={root} id="menu" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #8a6d32 1px, transparent 1px), radial-gradient(circle at 80% 60%, #8a6d32 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="menu-reveal text-center">
          <Eyebrow>
            <span className="inline-block">Therapy Menu & Pricing</span>
          </Eyebrow>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-5xl font-light leading-[1.02] md:text-7xl">
            Honest pricing, <em className="gold-gradient-text font-normal italic">pure indulgence</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink/60">
            Every massage includes steam & shower. Choose 45 minutes of calm — or the full 60-minute ritual.
          </p>
        </div>

        {/* tabs */}
        <div className="menu-reveal mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-ink/10 bg-white/70 p-1.5 backdrop-blur">
            {(
              [
                { id: "massage", label: "Massages · 6 Rituals" },
                { id: "scrub", label: "Body Scrubs · 2 Polishes" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 md:px-8 ${
                  tab === t.id ? "bg-ink text-gold-2 shadow-lg" : "text-ink/55 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === "massage" ? (
          <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-ink/10 bg-white/70 shadow-[0_40px_80px_-40px_rgba(11,26,23,0.25)] backdrop-blur">
            <div className="hidden grid-cols-12 gap-4 border-b border-ink/10 bg-ink px-8 py-5 text-[10px] font-extrabold uppercase tracking-[0.28em] text-gold-2 md:grid">
              <span className="col-span-5">Therapy</span>
              <span className="col-span-4">Experience</span>
              <span className="col-span-1 text-center">45 Min</span>
              <span className="col-span-1 text-center">60 Min</span>
              <span className="col-span-1" />
            </div>
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="menu-item group grid grid-cols-1 gap-3 border-b border-ink/10 px-6 py-6 transition-colors last:border-0 hover:bg-cream md:grid-cols-12 md:items-center md:gap-4 md:px-8"
              >
                <div className="md:col-span-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-3">{s.tag}</p>
                  <h3 className="font-display text-2xl text-ink md:text-[1.7rem]">{s.name}</h3>
                  <p className="mt-1 text-[13px] italic text-ink/50">{s.tagline}</p>
                </div>
                <p className="text-[13px] leading-relaxed text-ink/60 md:col-span-4">{s.description}</p>
                <p className="font-display text-xl text-ink md:col-span-1 md:text-center">{s.price45}</p>
                <p className="font-display text-xl font-medium text-gold-3 md:col-span-1 md:text-center">{s.price60}</p>
                <div className="md:col-span-1 md:text-right">
                  <button
                    onClick={() => onBook(s.name)}
                    className="rounded-full bg-ink px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold hover:text-ink"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-between gap-3 bg-cream-2 px-8 py-5 text-[12px] font-semibold text-ink/60 md:flex-row">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-gold-3" /> Open Daily · 10:00 AM – 9:00 PM
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-3" /> Steam & Shower included with every massage
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {SCRUBS.map((s) => (
              <article
                key={s.id}
                className="menu-item card-shine group overflow-hidden rounded-[1.8rem] border border-ink/10 bg-white/70 backdrop-blur"
              >
                <div className="relative h-64 overflow-hidden md:h-72">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-2">Body Renewal</p>
                      <h3 className="font-display text-3xl text-cream">{s.short}</h3>
                    </div>
                    <div className="rounded-2xl bg-cream/95 px-4 py-2 text-center">
                      <p className="font-display text-xl leading-none text-ink">{s.price}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-3">{s.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-display text-xl text-ink">{s.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.ingredients.map((ing) => (
                      <span key={ing} className="rounded-full bg-ink/5 px-3 py-1.5 text-[11px] font-bold text-ink/70">
                        {ing}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onBook(s.name)}
                    className="mt-6 w-full rounded-full border border-ink/15 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.22em] transition-all hover:border-ink hover:bg-ink hover:text-gold-2"
                  >
                    Reserve this polish — {s.price}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
