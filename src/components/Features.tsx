"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, ClipboardList, UserCheck, Users, Flame, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import SplitReveal from "./SplitReveal";
import { features } from "@/config/content";
import { images } from "@/config/images";

const icons: Record<string, LucideIcon> = { Dumbbell, HeartPulse, ClipboardList, UserCheck, Users, Flame };

// One image per feature. Swap these in src/config/images.ts when real photos arrive.
const slideImages = [
  images.programs.strength,
  images.programs.cardio,
  images.programs.general,
  images.programs.weight,
  images.programs.muscle,
  images.programs.weightloss,
];

const AUTOPLAY_MS = 3200;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  const n = features.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  // Auto-advance one slide at a time. Pauses on hover, touch and when the tab is hidden.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, active]);

  // Shortest signed distance from the active slide, so the ring wraps smoothly.
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="features" className="overflow-hidden bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SplitReveal as="h2" text="Built for people who show up." className="display text-[clamp(2.2rem,4.8vw,4.6rem)]" />
          <p className="max-w-sm text-lg text-white/65">Everything under one roof, for men and women at every level.</p>
        </div>
      </div>

      <div
        className="relative mx-auto mt-14 h-[26rem] max-w-[90rem] md:mt-20 md:h-[34rem]"
        style={{ perspective: "1500px" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Centre features"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { setPaused(true); touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }
          touchX.current = null;
          setPaused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Red floor glow under the centre slide */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-24 w-[60%] bg-[radial-gradient(closest-side,rgba(220,44,29,0.28),transparent)] blur-2xl" />

        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {features.map((f, i) => {
            const off = offsetOf(i);
            const abs = Math.abs(off);
            const isCenter = off === 0;
            const visible = abs <= 1;
            const Icon = icons[f.icon];
            const img = slideImages[i % slideImages.length];

            return (
              <motion.article
                key={f.title}
                aria-hidden={!isCenter}
                aria-label={`${i + 1} of ${n}: ${f.title}`}
                onClick={() => !isCenter && visible && setActive(i)}
                initial={false}
                animate={{
                  x: `${off * 68}%`,
                  scale: isCenter ? 1 : 0.8,
                  rotateY: off * -38,
                  z: isCenter ? 0 : -220,
                  opacity: visible ? (isCenter ? 1 : 0.65) : 0,
                  filter: isCenter ? "blur(0px)" : "blur(7px)",
                }}
                transition={{ duration: 1, ease: EASE }}
                style={{
                  zIndex: 10 - abs,
                  pointerEvents: visible ? "auto" : "none",
                  cursor: isCenter ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                }}
                className="absolute left-1/2 top-1/2 -ml-[8.5rem] -mt-[12rem] h-[24rem] w-[17rem] sm:-ml-[10rem] sm:w-[20rem] md:-ml-[13rem] md:-mt-[15.5rem] md:h-[31rem] md:w-[26rem]"
              >
                <div
                  className={`relative h-full w-full overflow-hidden border bg-surface transition-[border-color,box-shadow] duration-700 ${
                    isCenter ? "border-red/60 shadow-[0_30px_80px_-20px_rgba(220,44,29,0.45)]" : "border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
                  }`}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isCenter ? 1.08 : 1 }}
                    transition={{ duration: 3.4, ease: "easeOut" }}
                  >
                    <Image src={img.src} alt="" fill sizes="(min-width:768px) 26rem, 20rem" unoptimized={img.src.endsWith(".svg")} className="object-cover" />
                  </motion.div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="grid h-11 w-11 place-items-center border border-red/60 bg-red/15 text-red backdrop-blur-sm md:h-12 md:w-12">
                      <Icon size={22} />
                    </div>
                    <h3 className="display mt-5 text-2xl md:text-[1.9rem]">{f.title}</h3>
                    <motion.p
                      animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 12 }}
                      transition={{ duration: 0.8, ease: EASE, delay: isCenter ? 0.25 : 0 }}
                      className="mt-2 max-w-xs text-white/75"
                    >
                      {f.text}
                    </motion.p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="container-x mt-10 flex items-center justify-center gap-6 md:mt-14">
        <button type="button" aria-label="Previous feature" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center border border-white/25 transition-colors hover:border-red hover:bg-red">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose feature">
          {features.map((f, i) => (
            <button
              key={f.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={f.title}
              onClick={() => setActive(i)}
              className={`h-1.5 transition-all duration-500 ${i === active ? "w-10 bg-red" : "w-4 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <button type="button" aria-label="Next feature" onClick={() => go(1)} className="grid h-12 w-12 place-items-center border border-white/25 transition-colors hover:border-red hover:bg-red">
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{features[active].title}</p>
    </section>
  );
}
