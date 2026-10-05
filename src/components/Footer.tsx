import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, MapPin, Clock, Phone, Camera, Globe } from "lucide-react";
import { ADDRESS, SERVICES } from "../data/spa";
import { LotusMark } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-big",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".footer-big", start: "top 95%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink pb-24 pt-20 text-cream">
      {/* CTA band */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-moss-2 via-moss to-ink p-10 text-center md:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
          <LotusMark className="mx-auto h-12 w-12 text-gold" />
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-light leading-tight md:text-6xl">
            Step away from stress. <em className="gold-gradient-text font-normal italic">Step into Metro.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
            Open daily 10 AM – 9 PM at Suchitra X Roads. Walk-ins welcome, reservations adored.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onBook}
              className="w-full rounded-full bg-gold px-10 py-4 text-[12px] font-extrabold uppercase tracking-[0.22em] text-ink transition hover:bg-gold-2 sm:w-auto"
            >
              Book Your Appointment
            </button>
            <a
              href="tel:+919000000000"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-cream/20 px-10 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold-2 sm:w-auto"
            >
              <Phone className="h-4 w-4" /> {ADDRESS.phone}
            </a>
          </div>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-2 via-gold to-gold-3 text-ink">
                <LotusMark className="h-7 w-7" />
              </span>
              <div>
                <p className="font-script text-3xl leading-none text-gold-2">Metro</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.42em] text-cream/60">SPA · Unisex</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              Health & Wellness Centre for Unisex — a premium sanctuary for massage, aroma,
              warm-stone and body-renewal rituals.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 transition hover:border-gold hover:text-gold-2"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/60">
              {[
                ["Sanctuary", "#about"],
                ["Therapies", "#services"],
                ["Ritual", "#ritual"],
                ["Menu", "#menu"],
                ["Membership", "#membership"],
                ["Gallery", "#gallery"],
              ].map(([l, h]) => (
                <li key={l}>
                  <button onClick={() => document.querySelector(h)?.scrollIntoView({ behavior: "smooth" })} className="transition hover:text-gold-2">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">Therapies</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/60">
              {SERVICES.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-4">
                  <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })} className="transition hover:text-gold-2">
                    {s.name}
                  </button>
                  <span className="text-cream/35">{s.price45}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">Visit</p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-cream/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {ADDRESS.line1} {ADDRESS.line2} {ADDRESS.line3}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold" /> {ADDRESS.hours}
              </li>
              <li>
                <a href="tel:+919000000000" className="font-display text-xl italic text-gold-2">
                  {ADDRESS.phone}
                </a>
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] transition hover:border-gold hover:text-gold-2"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* giant word */}
      <div className="overflow-hidden border-t border-cream/10">
        <h3 className="footer-big font-display whitespace-nowrap py-6 text-center text-[16vw] font-light leading-none tracking-tight text-cream/[0.07] select-none md:text-[11vw]">
          METRO <em className="italic">spa</em> · METRO <em className="italic">spa</em>
        </h3>
      </div>
      <div className="border-t border-cream/10 py-5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 text-[11px] uppercase tracking-[0.2em] text-cream/35 md:flex-row md:px-10">
          <p>© 2026 Metro Spa · Suchitra, Hyderabad</p>
          <p>Crafted with calm · Health · Wellness · Relaxation</p>
        </div>
      </div>
    </footer>
  );
}