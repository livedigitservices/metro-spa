import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles, Star, MapPin } from "lucide-react";
import { HERO_VIDEO } from "../data/spa";
import { Magnetic } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onBook, started }: { onBook: () => void; started: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-kicker", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.1)
        .fromTo(
          ".hero-line-inner",
          { yPercent: 115, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 },
          0.25
        )
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.8)
        .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.95)
        .fromTo(".hero-meta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 1.1)
        .fromTo(".hero-badge", { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 1, ease: "back.out(1.6)" }, 1.0);

      // parallax on scroll
      gsap.to(".hero-video", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -10,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
      // marquee drift
      gsap.to(".hero-marquee-track", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, [started]);

  return (
    <section ref={root} className="relative flex min-h-[108svh] flex-col overflow-hidden bg-ink text-cream">
      {/* video bg */}
      <div className="absolute inset-0">
        <video
          className="hero-video h-full w-full scale-105 object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/6187252/pexels-photo-6187252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
      
        
      </div>

      {/* rotating badge */}
      <div className="hero-badge absolute right-8 top-28 z-20 hidden h-32 w-32 items-center justify-center md:flex lg:right-16 lg:top-32">
        <svg viewBox="0 0 100 100" className="lotus-spin absolute inset-0 h-full w-full">
          <defs>
            <path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-gold-2 text-[8.2px] font-bold uppercase tracking-[0.22em]">
            <textPath href="#circ">unisex wellness · metro spa · unisex wellness ·</textPath>
          </text>
        </svg>
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink/60 text-xl backdrop-blur-md">
          ✦
        </span>
      </div>

      {/* content */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-10 pt-36 md:px-10 md:pb-14">
        <div className="hero-kicker mb-6 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-ink/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-2 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Health · Wellness · Relaxation
          </span>
          <span className="hidden items-center gap-2 rounded-full border border-cream/20 bg-ink/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/80 backdrop-blur-md sm:flex">
            <MapPin className="h-3.5 w-3.5 text-gold" /> Suchitra · Hyderabad
          </span>
        </div>

        <h1 className="font-display max-w-6xl text-[13.5vw] font-light leading-[0.95] tracking-tight sm:text-[11vw] lg:text-[8.2rem]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line-inner block">
              Revitalize <em className="font-light italic text-gold-2">your</em>
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hero-line-inner block">
              body <span className="text-stroke-gold font-light">&</span>{" "}
              <em className="gold-gradient-text font-normal italic">mind</em>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-sub max-w-xl text-[15px] font-light leading-relaxed text-cream/75 md:text-lg">
            Step into <span className="font-script text-2xl text-gold-2 md:text-3xl">Metro Spa</span> — a
            serene unisex sanctuary at Suchitra X Roads where slowing down is an art.
            Signature massages, warm-stone rituals & glow-giving scrubs, crafted around you.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={onBook}
                className="hero-cta group relative overflow-hidden rounded-full bg-gold px-9 text-[12px] font-extrabold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(198,161,91,0.8)]"
                style={{ paddingTop: 18, paddingBottom: 18 }}
              >
                <span className="relative z-10">Reserve Your Escape</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="hero-cta rounded-full border border-cream/25 px-9 py-[18px] text-[12px] font-bold uppercase tracking-[0.22em] text-cream transition hover:border-gold hover:text-gold-2"
              >
                Explore Therapies
              </button>
            </Magnetic>
          </div>
        </div>

        {/* meta strip */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 backdrop-blur-md md:grid-cols-4">
          {[
            { k: "6+", v: "Signature Massages" },
            { k: "4.9", v: "Guest Rating", star: true },
            { k: "10–9", v: "Open Daily" },
            { k: "100%", v: "Unisex Sanctuary" },
          ].map((s) => (
            <div key={s.v} className="hero-meta flex items-center gap-4 bg-ink/60 px-6 py-5">
              <span className="font-display text-3xl italic text-gold-2 md:text-4xl">
                {s.k}
                {s.star && <Star className="ml-1 inline h-4 w-4 fill-gold text-gold" />}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream/60">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom marquee */}
      <div className="relative z-10 overflow-hidden border-t border-cream/10 bg-ink/70 py-4 backdrop-blur-md">
        <div className="hero-marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-10">
              {["Dry Massage", "Aroma Therapy", "Balinese", "Hot Stone", "Swedish", "Deep Tissue", "Body Scrubs", "Steam & Shower"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em] text-cream/55">
                    {t} <span className="text-gold">✦</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-cream/50">Scroll</span>
        <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-cream/20 text-cream/70">
          <ArrowDown className="h-4 w-4" />
        </span>
      </div>
    </section>
  );
}
