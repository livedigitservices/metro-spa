import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Arrive & Unwind",
    text: "Warm welcome, herbal infusion, a quiet lounge. Leave the city's noise at the door.",
    img: "https://images.pexels.com/photos/1926811/pexels-photo-1926811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    n: "02",
    title: "Consult & Personalise",
    text: "Tell us your pressure, your aroma, your intention. Your therapist shapes the ritual around you.",
    img: "https://images.pexels.com/photos/19572632/pexels-photo-19572632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    n: "03",
    title: "The Therapy",
    text: "Slow hands, warm oils, heated stones. 45 or 60 minutes where time dissolves.",
    img: "https://images.pexels.com/photos/6629530/pexels-photo-6629530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    n: "04",
    title: "Steam & Shower",
    text: "Every session closes with detoxifying steam and a refreshing shower. Emerge renewed.",
    img: "https://images.pexels.com/photos/4177714/pexels-photo-4177714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function Ritual({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getScroll = () => {
        if (!track.current) return 0;
        return track.current.scrollWidth - window.innerWidth;
      };
      gsap.to(track.current, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // progress bar
      gsap.to(".ritual-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="ritual" className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-moss-2/50 blur-[140px]" />
      <div ref={track} className="flex h-[100svh] w-max items-center gap-6 px-5 md:gap-10 md:px-12">
        {/* intro panel */}
        <div className="w-[86vw] shrink-0 md:w-[38vw]">
          <Eyebrow tone="light">The Metro Ritual</Eyebrow>
          <h2 className="font-display mt-5 text-5xl font-light leading-[1.02] md:text-7xl [@media(max-height:720px)]:text-4xl [@media(max-height:720px)]:md:text-5xl">
            One hour,
            <br />
            <em className="italic text-gold-2">four acts</em> of calm.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/60">
            Scroll to journey through a signature Metro visit — from first breath to final glow.
            Designed to be unhurried, private and deeply personal.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onBook}
              className="group flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink transition hover:bg-gold-2"
            >
              Begin your ritual <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40 md:flex">
            <span className="h-px w-16 bg-gold/50" /> Keep scrolling — the story moves sideways
          </div>
          <div className="mt-6 h-[2px] w-48 overflow-hidden rounded bg-cream/10 md:w-64">
            <div className="ritual-progress h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-3 via-gold to-gold-2" />
          </div>
        </div>

        {/* cards */}
        {STEPS.map((s) => (
          <article
            key={s.n}
            className="group relative h-[68svh] w-[82vw] shrink-0 overflow-hidden rounded-[1.8rem] border border-cream/10 md:w-[30vw]"
          >
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <span className="font-display absolute right-6 top-5 text-7xl italic text-cream/25 md:text-8xl">{s.n}</span>
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-2">Step {s.n}</p>
              <h3 className="font-display mt-2 text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">{s.text}</p>
            </div>
          </article>
        ))}

        {/* end CTA panel */}
        <div className="flex h-[68vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[1.8rem] bg-gold p-8 text-ink md:w-[26vw] md:p-10">
          <p className="font-script text-5xl">glow…</p>
          <div>
            <h3 className="font-display text-4xl font-light leading-tight md:text-5xl">
              Walk out lighter than you walked in.
            </h3>
            <button
              onClick={onBook}
              className="mt-6 w-full rounded-full bg-ink py-4 text-[11px] font-extrabold uppercase tracking-[0.24em] text-cream transition hover:bg-moss"
            >
              Reserve — 10 AM to 9 PM
            </button>
          </div>
        </div>
        <div className="w-6 shrink-0" />
      </div>
    </section>
  );
}