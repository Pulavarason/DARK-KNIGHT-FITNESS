"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { images } from "@/config/images";
import SplitReveal from "./SplitReveal";
import Photo from "./Photo";

const spans = [
  "md:col-span-5", "md:col-span-7",
  "md:col-span-4", "md:col-span-4", "md:col-span-4",
  "md:col-span-6", "md:col-span-3", "md:col-span-3",
];
const rows = ["md:h-[26rem]", "md:h-[26rem]", "md:h-[22rem]", "md:h-[22rem]", "md:h-[22rem]", "md:h-[28rem]", "md:h-[28rem]", "md:h-[28rem]"];

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const list = images.gallery;

  const close = useCallback(() => { setIdx(null); opener.current?.focus(); }, []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (idx === null) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [idx, close, step]);

  return (
    <section id="gallery" className="bg-bg py-28 md:py-44">
      <div className="container-x">
        <SplitReveal as="h2" text="Inside the centre" className="display text-[clamp(2.4rem,6vw,5.6rem)]" />
        <div className="mt-14 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-12 md:gap-3">
          {list.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Open photo ${i + 1} of ${list.length}`}
              onClick={(e) => { opener.current = e.currentTarget; setIdx(i); }}
              className={`group relative block overflow-hidden text-left ${i === 0 || i === 3 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"} ${spans[i]} ${rows[i]} md:aspect-auto`}
            >
              <Photo img={img} sizes="(min-width:768px) 45vw, 50vw" className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105" />
              <span className="absolute inset-0 bg-red/0 transition-colors duration-500 group-hover:bg-red/25" />
              <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"><Expand size={16} /></span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Gallery viewer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={close}
          >
            <button ref={closeBtn} type="button" aria-label="Close gallery" onClick={close} className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center border border-white/30 hover:bg-white hover:text-ink md:right-8 md:top-8"><X size={22} /></button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 hover:bg-white hover:text-ink md:left-8"><ChevronLeft size={22} /></button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 hover:bg-white hover:text-ink md:right-8"><ChevronRight size={22} /></button>
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}
            >
              <Image src={list[idx].src} alt={list[idx].alt} fill sizes="100vw" unoptimized={list[idx].src.endsWith(".svg")} className="object-contain" priority />
            </motion.div>
            <p className="cond absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-white/60">{idx + 1} / {list.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
