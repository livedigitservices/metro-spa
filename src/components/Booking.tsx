import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, CheckCircle2, CalendarDays, Sparkles, Loader2 } from "lucide-react";
import { SERVICES, SCRUBS, ADDRESS } from "../data/spa";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

const ALL_SERVICES = [
  ...SERVICES.map((s) => s.name),
  ...SCRUBS.map((s) => s.name),
  "Silver Voucher Membership",
  "Gold Voucher Membership",
  "Platinum Voucher Membership",
  "Diamond Voucher Membership",
];

export default function Booking({
  preselected,
  onCloseSignal,
}: {
  preselected: string;
  onCloseSignal: number;
}) {
  const root = useRef<HTMLElement>(null);
  const [service, setService] = useState(preselected);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    setService(preselected);
  }, [preselected, onCloseSignal]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".book-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (done) {
      gsap.fromTo(".success-pop", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)" });
    }
  }, [done]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;

    // honeypot spam check
    const formData = new FormData(e.currentTarget);
    if (formData.get("botcheck")) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Spa Booking Request — ${service}`,
          from_name: "Metro Spa Website",
          name: name.trim(),
          phone: phone.trim(),
          service,
          preferred_date: date || "Not specified",
          preferred_time: time || "Not specified",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setDone(true);
      } else {
        setError(data.message || "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={root} id="booking" className="relative overflow-hidden bg-cream py-24 md:py-36">
      {/* backdrop image strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px]">
        <img
          src="https://images.pexels.com/photos/6629614/pexels-photo-6629614.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-cream" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="book-reveal pt-24 text-center text-cream md:pt-28">
          <Eyebrow tone="light">Book Your Appointment</Eyebrow>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-5xl font-light leading-[1.02] md:text-7xl">
            Your calm is <em className="italic text-gold-2">one ritual away.</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* info card */}
          <div className="book-reveal overflow-hidden rounded-[1.8rem] bg-ink p-8 text-cream md:p-10 lg:col-span-5">
            <p className="font-script text-4xl text-gold-2">visit us</p>
            <h3 className="font-display mt-2 text-3xl leading-tight">
              Metro Spa, <br /> Suchitra X Roads
            </h3>
            <div className="mt-7 space-y-5 text-sm">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream/8 text-gold-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="leading-relaxed text-cream/75">
                  {ADDRESS.line1}
                  <br />
                  {ADDRESS.line2}
                  <br />
                  {ADDRESS.line3}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-gold-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <Clock className="h-5 w-5" />
                </span>
                <p className="text-cream/75">{ADDRESS.hours}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-gold-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <Phone className="h-5 w-5" />
                </span>
                <a href="tel:+919000000000" className="font-display text-2xl italic text-gold-2 hover:text-cream">
                  {ADDRESS.phone}
                </a>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-5">
              <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-2">
                <Sparkles className="h-4 w-4" /> Good to know
              </p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-cream/70">
                <li>· Members: please book your slot in advance</li>
                <li>· All massages include steam & shower</li>
                <li>· Unisex sanctuary — private & hygienic suites</li>
              </ul>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                "Suchitra X Roads Jeedimetla Hyderabad Telangana 500067"
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block rounded-full border border-cream/20 py-3.5 text-center text-[11px] font-extrabold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold-2"
            >
              Get Directions
            </a>
          </div>

          {/* form card */}
          <div className="book-reveal rounded-[1.8rem] border border-ink/10 bg-white/85 p-8 shadow-[0_50px_100px_-40px_rgba(11,26,23,0.35)] backdrop-blur md:p-10 lg:col-span-7">
            {!done ? (
              <form onSubmit={submit} className="flex flex-col gap-5">
                {/* honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-gold-2">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl">Reserve your ritual</h3>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gold-3">
                      We confirm on call / WhatsApp
                    </p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/60">
                    Choose therapy
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {ALL_SERVICES.slice(0, 6).map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setService(s)}
                        className={`rounded-2xl border px-3 py-3 text-left text-[12px] font-bold transition-all ${
                          service === s
                            ? "border-ink bg-ink text-gold-2 shadow-lg"
                            : "border-ink/10 bg-cream/50 text-ink/70 hover:border-gold-3"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3.5 text-sm font-semibold text-ink outline-none focus:border-gold-3"
                  >
                    {ALL_SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/60">
                      Your name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Rao"
                      required
                      className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3.5 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-ink/35 focus:border-gold-3"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/60">
                      Phone / WhatsApp
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 …"
                      required
                      inputMode="tel"
                      className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3.5 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-ink/35 focus:border-gold-3"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/60">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3.5 text-sm font-semibold outline-none focus:border-gold-3"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/60">
                      Preferred time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3.5 text-sm font-semibold outline-none focus:border-gold-3"
                    >
                      <option value="">Select slot</option>
                      {["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "7:30 PM"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-300/60 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative overflow-hidden rounded-full bg-ink text-[12px] font-extrabold uppercase tracking-[0.24em] text-gold-2 transition-all hover:shadow-[0_20px_50px_-15px_rgba(11,26,23,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ paddingTop: 18, paddingBottom: 18 }}
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Confirm Reservation Request"
                    )}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <p className="text-center text-[12px] text-ink/45">
                  Prefer instant booking? <a href="tel:+919000000000" className="font-bold text-gold-3 underline">Call the spa directly</a>
                </p>
              </form>
            ) : (
              <div className="success-pop flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ink text-gold-2">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <h3 className="font-display mt-6 text-4xl">
                  Namaste, <em className="italic text-gold-3">{name.split(" ")[0] || "guest"}</em>
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
                  Your request for <span className="font-bold text-ink">{service}</span>
                  {date ? ` on ${date}` : ""}{time ? ` at ${time}` : ""} has been received.
                  Our concierge will call <span className="font-bold text-ink">{phone}</span> shortly to confirm.
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setName("");
                    setPhone("");
                    setDate("");
                    setTime("");
                    setError("");
                  }}
                  className="mt-8 rounded-full border border-ink/20 px-8 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.22em] transition hover:bg-ink hover:text-gold-2"
                >
                  Make another request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}