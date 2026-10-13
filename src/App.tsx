import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Phone, CalendarCheck } from "lucide-react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Ritual from "./components/Ritual";
import Menu from "./components/Menu";
import Membership from "./components/Membership";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [preselected, setPreselected] = useState("Aroma Therapeutic");
  const [bookSignal, setBookSignal] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll + GSAP sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // lock scroll during preloader
  useEffect(() => {
    if (loading) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      setStarted(true);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [loading]);

  const scrollToBooking = useCallback((service?: string) => {
    if (service) setPreselected(service);
    setBookSignal((s) => s + 1);
    const el = document.querySelector("#booking");
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 });
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className=" relative min-h-screen bg-cream font-body text-ink">
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <Navbar onBook={() => scrollToBooking()} />

      <main>
        <Hero onBook={() => scrollToBooking()} started={started} />
        <About />
        <Services onBook={scrollToBooking} />
        <Ritual onBook={() => scrollToBooking()} />
        <Menu onBook={scrollToBooking} />
        <Membership onBook={scrollToBooking} />
        <Gallery />
        <Testimonials />
        <Booking preselected={preselected} onCloseSignal={bookSignal} />
      </main>

      <Footer onBook={() => scrollToBooking()} />

      {/* floating dock */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[70] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-cream/10 bg-ink/85 p-1.5 sm:p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:bottom-6">
        <a
          href="tel:+917893754324"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/15 sm:h-12 sm:w-12 text-cream transition hover:border-gold hover:text-gold-2"
          aria-label="Call spa"
        >
          <Phone style={{ height: 18, width: 18 }} />
        </a>
        <button
          onClick={() => scrollToBooking()}
          className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-gold py-3 pl-5 pr-6 text-[10px] font-extrabold uppercase tracking-[0.16em] sm:gap-2.5 sm:py-3.5 sm:pl-6 sm:pr-7 sm:text-[11px] sm:tracking-[0.2em] text-ink transition-all hover:bg-gold-2"
        >
          <CalendarCheck style={{ height: 17, width: 17 }} />
         · Book Now · 
        </button>
      </div>
    </div>
  );
}