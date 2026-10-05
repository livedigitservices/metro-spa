import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        gsap.fromTo(
          el,
          { y: 60 + speed * 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="gallery" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="font-display mt-5 text-5xl font-light leading-[1.02] md:text-7xl">
              A glimpse of <em className="gold-gradient-text font-normal italic">calm.</em>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink/60">
            Warm light, quiet rooms, fragrant air. This is the atmosphere waiting for you at
            Suchitra X Roads.
          </p>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <figure
              key={g.label + i}
              data-speed={(i % 3) * 0.5}
              className="gal-item group relative break-inside-avoid overflow-hidden rounded-3xl"
              style={{ height: i % 3 === 1 ? 420 : i % 3 === 0 ? 320 : 380 }}
            >
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="h-[115%] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-5 left-5 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-cream/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-ink backdrop-blur">
                  {g.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
