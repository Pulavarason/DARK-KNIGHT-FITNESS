"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Share2, ArrowUpRight } from "lucide-react";
import SplitReveal from "./SplitReveal";
import { site, hasPhone, hasWhatsapp, telLink, whatsappLink, mapsLink, mapsEmbed, locationText, hasLocation } from "@/config/site";
import { programs, plans } from "@/config/content";

function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasWhatsapp()) {
      setNote("Online enquiries open soon. For now, message us or visit the centre.");
      return;
    }
    const msg = `Hi, I'm ${name}.${phone ? ` My phone number is ${phone}.` : ""}${email ? ` My email is ${email}.` : ""} I'm interested in ${goal || "training"}${plan ? ` with the ${plan} plan` : ""}.${message ? ` ${message}` : ""} Please share the details.`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setNote("Opening WhatsApp with your enquiry.");
  };

  const field = "w-full border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/45 focus:border-red focus:outline-none";
  return (
    <form onSubmit={submit} className="mt-7 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">Your name
          <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="Full name" />
        </label>
        <label className="grid gap-2 text-sm text-white/80">Phone number
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={field} placeholder="Your number" />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-white/80">Email address <span className="text-white/45">(optional)</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field} placeholder="you@example.com" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">Training goal
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className={`${field} bg-ink`}>
            <option value="">Choose a goal</option>
            {programs.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/80">Membership plan
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className={`${field} bg-ink`}>
            <option value="">Help me choose</option>
            {plans.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm text-white/80">Anything you’d like us to know? <span className="text-white/45">(optional)</span>
        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-y`} placeholder="Tell us what you’re working towards" />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button type="submit" className="cond inline-flex items-center gap-3 bg-red px-7 py-4 text-sm uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-ink">
          Send enquiry <ArrowUpRight size={17} />
        </button>
        <p role="status" aria-live="polite" className="text-sm text-white/70">{note}</p>
      </div>
    </form>
  );
}

export default function Contact() {
  const socials = [
    { name: "Instagram", url: site.social.instagram, icon: <Share2 size={16} /> },
    { name: "Facebook", url: site.social.facebook, icon: <Share2 size={16} /> },
    { name: "YouTube", url: site.social.youtube, icon: <Share2 size={16} /> },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
          <div>
            <p className="cond text-xs uppercase tracking-[0.22em] text-red">We’re here to help</p>
            <SplitReveal as="h2" text="Come train with us" className="display mt-5 max-w-xl text-[clamp(3rem,6vw,5.7rem)]" />
            <p className="mt-7 max-w-md text-white/70">Questions about training or membership? Send us a note or stop by the studio.</p>
            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div><dt className="flex items-center gap-2 cond text-xs uppercase tracking-[0.16em] text-white/75"><MapPin size={18} className="text-red"/> Visit us</dt><dd className="mt-2 pl-7 text-sm text-white/70">{locationText() || "Address shared on enquiry"}</dd></div>
              <div><dt className="flex items-center gap-2 cond text-xs uppercase tracking-[0.16em] text-white/75"><Clock size={18} className="text-red"/> Studio hours</dt><dd className="mt-2 pl-7 text-sm text-white/70">{site.hours.length ? site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") : "Ask us for today’s schedule"}</dd></div>
              <div><dt className="flex items-center gap-2 cond text-xs uppercase tracking-[0.16em] text-white/75"><Phone size={18} className="text-red"/> Call</dt><dd className="mt-2 pl-7 text-sm text-white/70">{hasPhone() ? <a href={telLink()} className="hover:text-white">+{site.phone}</a> : "Contact details shared on enquiry"}</dd></div>
              <div><dt className="flex items-center gap-2 cond text-xs uppercase tracking-[0.16em] text-white/75"><Mail size={18} className="text-red"/> Email</dt><dd className="mt-2 pl-7 text-sm text-white/70">{site.email ? <a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a> : "Email details shared on enquiry"}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {socials.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-red hover:text-white">{s.icon}{s.name}</a>)}
            </div>
            {hasLocation() && <div className="mt-7 flex items-end gap-4">
              <div className="aspect-square w-40 shrink-0 overflow-hidden border border-white/15 bg-surface sm:w-56">
                <iframe title={`Map showing ${site.name}`} src={mapsEmbed()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0 opacity-90" />
              </div>
              <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="cond inline-flex items-center gap-2 pb-1 text-xs uppercase tracking-wider text-white/70 hover:text-white">Open directions <ArrowUpRight size={15}/></a>
            </div>}
          </div>
          <div className="border border-white/10 bg-white/[0.025] p-6 sm:p-8 md:p-9">
            <p className="cond text-xs uppercase tracking-[0.2em] text-red">Start a conversation</p>
            <h3 className="display mt-3 text-3xl md:text-4xl">Tell us about your goals.</h3>
            <p className="mt-3 text-sm text-white/65">Share a few details and the studio can help you find a good place to start.</p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
