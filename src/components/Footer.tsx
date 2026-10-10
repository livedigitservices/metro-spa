import { useLayoutEffect, useRef, type ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { ADDRESS, SERVICES, SOCIALS } from "../data/spa";
import { LotusMark } from "./ui";
import logo from "../assets/logo.png"

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS: Record<string, ReactElement> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8c-.8-.4-1.6-1.2-2-2l.8-.8-1-2L9 9.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

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
              href={`tel:+${ADDRESS.phoneDigits}`}
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
              <img
                              src={logo}
                              alt="Metro Spa"
                              className="h-15 w-auto max-w-[140px] object-contain md:h-18"
                            />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              Health & Wellness Centre for Unisex — a premium sanctuary for massage, aroma,
              warm-stone and body-renewal rituals.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 transition hover:border-gold hover:text-gold-2"
                  aria-label={`Metro Spa on ${s.label}`}
                  title={s.label}
                >
                  {SOCIAL_ICONS[s.id]}
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
                <address className="not-italic">
                  {ADDRESS.line1}
                  <br />
                  {ADDRESS.line2}
                  <br />
                  {ADDRESS.line3}
                  <a
                    href={ADDRESS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-fit items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-2 transition hover:text-gold"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Get directions
                  </a>
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold" /> {ADDRESS.hours}
              </li>
              <li>
                <a href={`tel:+${ADDRESS.phoneDigits}`} className="font-display text-xl italic text-gold-2">
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