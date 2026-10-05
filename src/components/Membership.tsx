import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Check, Gem, Medal, Award, Trophy } from "lucide-react";
import { MEMBERSHIPS, MEMBERSHIP_FEATURES } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Medal, Award, Crown, Trophy, Gem];

export default function Membership({ onBook }: { onBook: (service?: string) => void }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mem-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, rotateX: 12 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            delay: (i % 5) * 0.08,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
      gsap.fromTo(
        ".mem-head",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".mem-head", start: "top 88%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="membership" className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(198,161,91,0.6) 1px, transparent 1px)",
          backgroundSize: "100% 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mem-head text-center">
          <Eyebrow tone="light">Membership Means More</Eyebrow>
          <h2 className="font-display mx-auto mt-5 max-w-4xl text-5xl font-light leading-[1.02] md:text-7xl">
            One ritual a week.
            <br />
            <em className="gold-gradient-text font-normal italic">A calmer you, always.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-cream/60">
            Each voucher session = <span className="font-semibold text-gold-2">60-minute therapy + steam & shower</span>.
            Shareable with friends & family. The more you glow, the more you save.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {MEMBERSHIPS.map((m, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={m.name}
                className={`mem-card group relative flex flex-col overflow-hidden rounded-[1.6rem] border p-7 transition-all duration-500 hover:-translate-y-3 ${
                  m.featured
                    ? "border-gold/60 bg-gradient-to-b from-gold/25 via-[#1a2f2b] to-[#101f1d] shadow-[0_30px_80px_-20px_rgba(198,161,91,0.45)]"
                    : "border-cream/10 bg-white/[0.04] backdrop-blur hover:border-gold/40 hover:bg-white/[0.07]"
                }`}
              >
                {m.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-ink">
                    Most Loved
                  </span>
                )}
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    m.featured ? "bg-gold text-ink" : "bg-cream/10 text-gold-2"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/50">{m.voucher}</p>
                <h3 className={`font-display mt-1 text-3xl ${m.featured ? "text-gold-2" : "text-cream"}`}>{m.name}</h3>
                <div className="mt-4 space-y-1.5 border-t border-cream/10 pt-4 text-[13px]">
                  <p className="font-bold text-cream">{m.sessions}</p>
                  <p className="text-cream/55">{m.validity}</p>
                </div>
                <p className="font-display mt-4 text-4xl italic text-cream">{m.price}</p>
                <p className={`mt-1 text-[11px] font-bold uppercase tracking-[0.16em] ${m.featured ? "text-gold-2" : "text-gold/80"}`}>
                  {m.per}
                </p>
                <button
                  onClick={() => onBook(`${m.voucher} Membership`)}
                  className={`mt-6 w-full rounded-full py-3 text-[10px] font-extrabold uppercase tracking-[0.22em] transition-all ${
                    m.featured
                      ? "bg-gold text-ink hover:bg-gold-2"
                      : "border border-cream/20 text-cream hover:border-gold hover:text-gold-2"
                  }`}
                >
                  Choose {m.name}
                </button>
              </article>
            );
          })}
        </div>

        {/* features strip */}
        <div className="mt-8 grid gap-4 rounded-[1.6rem] border border-cream/10 bg-white/[0.03] p-7 backdrop-blur md:grid-cols-12 md:p-9">
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl">Membership <em className="italic text-gold-2">privileges</em></h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/55">
              Simple rules, generous rewards. Advance booking keeps your favourite slot waiting.
            </p>
            <button
              onClick={() => onBook("Membership Enquiry")}
              className="mt-5 rounded-full bg-cream px-7 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink transition hover:bg-gold-2"
            >
              Enquire on Call
            </button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
            {MEMBERSHIP_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-ink/40 p-4 text-[13px] leading-relaxed text-cream/75">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-2">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}