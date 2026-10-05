import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { LotusMark } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Sanctuary", href: "#about" },
  { label: "Therapies", href: "#services" },
  { label: "Ritual", href: "#ritual" },
  { label: "Menu", href: "#menu" },
  { label: "Membership", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#booking" },
];

export default function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => setScrolled(self.scroll() > 80),
    });
    // hide on scroll down, show on up
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (!bar.current) return;
      if (y > 400 && y > last && !open) {
        gsap.to(bar.current, { yPercent: -120, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(bar.current, { yPercent: 0, duration: 0.5, ease: "power3.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      st.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, [open ]);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".m-link",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [open ]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-500 md:px-6 ${
              scrolled
                ? "border-cream/10 bg-ink/80 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
                : "border-white/15 bg-black/25"
            }`}
          >
            {/* logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-2 via-gold to-gold-3 text-ink shadow-lg shadow-gold/20">
                <LotusMark className="h-6 w-6" />
              </span>
              <span className="text-left leading-none">
                <span className="font-script block text-[26px] leading-none text-cream">Metro</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.42em] text-gold-2">
                  SPA · Unisex
                </span>
              </span>
            </button>

            {/* desktop links */}
            <nav className="hidden items-center gap-7 lg:flex">
              {LINKS.slice(0, 6).map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="group relative text-[11px] font-bold uppercase tracking-[0.24em] text-cream/75 transition-colors hover:text-gold-2"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+919000000000"
                className="hidden items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/80 transition hover:border-gold/60 hover:text-gold-2 md:flex"
              >
                <Phone className="h-3.5 w-3.5" /> Call Spa
              </a>
              <button
                onClick={onBook}
                className="group hidden items-center gap-2 rounded-full bg-gold px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-gold-2 hover:shadow-[0_10px_30px_-8px_rgba(198,161,91,0.7)] sm:flex"
              >
                Book Ritual
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:border-gold hover:text-gold-2 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[95] flex flex-col bg-ink text-cream transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-moss-2/70 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink">
              <LotusMark className="h-6 w-6" />
            </span>
            <span className="font-script text-3xl text-gold-2">Metro</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 transition hover:border-gold hover:text-gold-2"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {LINKS.map((l, i) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="m-link group flex items-baseline gap-4 border-b border-cream/10 py-3.5 text-left"
            >
              <span className="font-display text-sm italic text-gold/70">0{i + 1}</span>
              <span className="font-display text-4xl font-light transition-all group-hover:translate-x-2 group-hover:text-gold-2">
                {l.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-3 px-8 pb-10">
          <button
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="w-full rounded-full bg-gold py-4 text-[12px] font-extrabold uppercase tracking-[0.24em] text-ink"
          >
            Book Your Ritual
          </button>
          <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/50">
            <MapPin className="h-3.5 w-3.5" /> Suchitra X Roads · Hyderabad
          </p>
        </div>
      </div>
    </>
  );
}
