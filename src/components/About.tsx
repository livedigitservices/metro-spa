import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Droplets, Flame, Sparkle, ArrowRight, BadgeCheck } from "lucide-react";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const SPECIALITIES = [
  { icon: Leaf, title: "Customized Therapies", text: "Every ritual is shaped around your body, your mood and your preferred pressure." },
  { icon: Droplets, title: "Aromatherapy", text: "Pure essential oils bring calming aroma and a soothing sensory layer to touch." },
  { icon: Flame, title: "Warm Stone Rituals", text: "Gentle heat and slow massage melt into one deeply grounding experience." },
  { icon: Sparkle, title: "Body Renewal", text: "Polish rituals with chocolate, cherry & papaya for smooth, pampered skin." },
];

const WHY = [
  { n: "01", t: "Expertise", d: "Thoughtfully delivered therapies focused on comfort, technique and true relaxation." },
  { n: "02", t: "Consistency", d: "A calm, unhurried welcome — every visit feels like your first deep breath." },
  { n: "03", t: "Client-First", d: "Your preferences lead. Pressure, aroma, pace — everything bends to you." },
  { n: "04", t: "Quality Care", d: "From booking to steam & shower, every detail is simple, clean and premium." },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      // image parallax
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
      // image clip reveal
      gsap.utils.toArray<HTMLElement>(".clip-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 8% 14% 8% round 200px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "power3.out",
            duration: 1.4,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
      // big word drift
      gsap.to(".drift-word", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      // counters
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = target % 1 !== 0 ? obj.v.toFixed(1) : Math.round(obj.v).toString();
              },
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="relative overflow-hidden bg-cream py-24 md:py-36">
      {/* giant drifting word */}
      <div className="drift-word pointer-events-none absolute top-10 left-0 whitespace-nowrap font-display text-[18vw] font-light italic leading-none text-ink/[0.045] select-none">
        Relax · Restore · Renew · Relax · Restore · Renew
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* header */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="reveal-up"><Eyebrow>Welcome to Metro Spa</Eyebrow></div>
            <h2 className="reveal-up font-display mt-5 text-5xl font-light leading-[1.02] tracking-tight text-ink md:text-7xl">
              Relax. Restore.
              <br />
              Feel <em className="gold-gradient-text font-normal italic">renewed.</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="reveal-up text-[15px] leading-relaxed text-ink/65 md:text-base">
              Discover a calm space where relaxation meets thoughtful care. From dry massage and
              aroma oil therapy to warm-stone and body-renewal rituals — our menu gives you
              simple, soulful choices for self-care.
            </p>
            <div className="reveal-up mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss text-gold-2">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink/70">
                Unisex Health & Wellness Centre <br className="hidden sm:block" />
                <span className="text-gold-3">Suchitra X Roads · Hyderabad</span>
              </p>
            </div>
          </div>
        </div>

        {/* images row */}
        <div className="mt-14 grid gap-5 md:grid-cols-12">
          <div className="clip-reveal relative overflow-hidden rounded-3xl md:col-span-7 md:h-[520px] h-[380px]">
            <img
              src="https://images.pexels.com/photos/9146371/pexels-photo-9146371.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Wellness with a personal touch"
              className="parallax-img h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-2">A personal touch</p>
                <p className="font-display mt-1 text-2xl italic text-cream md:text-3xl">Wellness, unhurried</p>
              </div>
              <span className="hidden rounded-full border border-cream/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cream backdrop-blur md:block">
                Since Suchitra
              </span>
            </div>
          </div>
          <div className="grid gap-5 md:col-span-5">
            <div className="clip-reveal relative h-[250px] overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Spa candles"
                className="parallax-img h-[120%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/15" />
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-cream">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
              <p className="font-script text-4xl text-gold-2">breathe in…</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { v: "8", s: "+", l: "Therapies" },
                  { v: "4.9", s: "", l: "Rating" },
                  { v: "12", s: "k+", l: "Happy guests" },
                ].map((c) => (
                  <div key={c.l}>
                    <p className="font-display text-4xl italic text-cream md:text-5xl">
                      <span className="count" data-count={c.v}>0</span>
                      <span className="text-gold">{c.s}</span>
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/50">{c.l}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="group mt-8 flex w-full items-center justify-between rounded-full bg-gold px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink transition hover:bg-gold-2"
              >
                About Your Visit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* specialities */}
        <div className="mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="reveal-up"><Eyebrow>Metro Specialities</Eyebrow></div>
              <h3 className="reveal-up font-display mt-4 text-4xl font-light text-ink md:text-6xl">
                Thoughtful care, <em className="italic text-gold-3">your way.</em>
              </h3>
            </div>
            <p className="reveal-up max-w-sm text-sm leading-relaxed text-ink/60">
              Four pillars shape every session — comfort, aroma, warmth and renewal.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALITIES.map((s, i) => (
              <div
                key={s.title}
                className="reveal-up card-shine group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/60 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_30px_60px_-20px_rgba(138,109,50,0.35)]"
              >
                <span className="font-display absolute right-5 top-4 text-5xl italic transition-colors group-hover:text-gold/25" style={{ color: "rgba(11,26,23,0.07)" }}>
                  0{i + 1}
                </span>
                <span className="flex items-center justify-center rounded-2xl bg-ink text-gold-2 transition-all duration-500 group-hover:bg-gold group-hover:text-ink" style={{ height: 52, width: 52 }}>
                  <s.icon className="h-5 w-5" />
                </span>
                <h4 className="font-display mt-6 text-2xl text-ink">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* why choose */}
        <div className="mt-20 overflow-hidden rounded-[2rem] bg-moss p-8 text-cream md:p-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="reveal-up"><Eyebrow tone="light">Why Metro Spa</Eyebrow></div>
              <h3 className="reveal-up font-display mt-4 text-4xl font-light leading-tight md:text-5xl">
                Care you <br /> can <em className="italic text-gold-2">feel.</em>
              </h3>
              <p className="reveal-up mt-4 text-sm leading-relaxed text-cream/60">
                The little things — warm towels, quiet rooms, unhurried time — are the big things here.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-cream/10 sm:grid-cols-2 lg:col-span-8">
              {WHY.map((w) => (
                <div key={w.n} className="reveal-up group bg-moss p-7 transition-colors duration-500 hover:bg-moss-2">
                  <p className="font-display text-sm italic text-gold">{w.n}</p>
                  <h4 className="font-display mt-2 text-2xl">{w.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
