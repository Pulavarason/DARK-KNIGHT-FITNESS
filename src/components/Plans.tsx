import SplitReveal from "./SplitReveal";
import { JoinButton } from "./Buttons";
import { plans } from "@/config/content";

export default function Plans() {
  return (
    <section id="plans" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <SplitReveal as="h2" text="Membership plans" className="display text-[clamp(2.4rem,6vw,5.6rem)]" />
          <p className="max-w-xs text-white/70">Choose a training term that fits your goals. These sample rates and inclusions are for display only; ask the team for current membership details.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 md:mt-16">
          {plans.map((p) => (
            <article key={p.id} className={`relative flex h-full flex-col rounded-2xl border p-6 md:p-7 ${p.featured ? "border-red bg-red text-white shadow-[0_20px_70px_rgba(237,28,36,0.2)]" : "border-white/15 bg-white/[0.035]"}`}>
              {p.featured && <span className="mb-5 w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-red">Recommended</span>}
              {!p.featured && <span className="mb-5 h-6" />}
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${p.featured ? "text-white/75" : "text-white/50"}`}>{p.duration}</p>
              <h3 className="display mt-2 text-3xl">{p.name}</h3>
              <p className={`mt-3 min-h-14 text-sm leading-6 ${p.featured ? "text-white/80" : "text-white/65"}`}>{p.text}</p>
              <div className={`mt-6 border-t pt-5 ${p.featured ? "border-white/25" : "border-white/10"}`}>
                <p className="display text-3xl">{p.price}</p>
                <p className={`mt-1 text-xs ${p.featured ? "text-white/70" : "text-white/45"}`}>illustrative sample price</p>
              </div>
              <ul className={`mt-6 flex-1 space-y-3 text-sm ${p.featured ? "text-white/90" : "text-white/70"}`}>
                {p.includes.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="font-bold">✓</span><span>{item}</span></li>)}
              </ul>
              <div className="mt-8">
                <JoinButton variant={p.featured ? "line" : "solid"} plan={p.name} />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/40">Sample package details only. Please confirm actual prices, access and inclusions with the centre.</p>
      </div>
    </section>
  );
}
