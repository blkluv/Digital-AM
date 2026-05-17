import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Menu, Send, X } from "lucide-react";
import { siteCopy } from "./content/siteCopy";
import { getFlowInteractionProps } from "./utils/flowInteractions";

const locales = ["es", "en"];
const flowCardProps = getFlowInteractionProps({ tilt: 3 });
const flowButtonProps = getFlowInteractionProps();

const getProjectDomain = (href) => {
  try { return new URL(href).hostname.replace(/^www\./, ""); } catch { return href; }
};

const getInitialLocale = () => {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("digital-am-locale");
  if (stored && locales.includes(stored)) return stored;
  return window.navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState({});
  const currentYear = new Date().getFullYear();
  const copy = siteCopy[locale];

  useEffect(() => {
    window.localStorage.setItem("digital-am-locale", locale);
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
  }, [copy.meta.title, locale]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setSubmitState("error");
      setSubmitMessage(copy.contact.messages.incomplete);
      return;
    }
    try {
      setSubmitState("submitting");
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_replyto", form.email);
      payload.append("_subject", "New contact from ViralDental.marketing");
      payload.append("_template", "table");
      const res = await fetch("https://formsubmit.co/ajax/hi@viraldental.marketing", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok || (typeof data !== "string" && data?.success === "false")) {
        throw new Error(typeof data === "string" ? data : data?.message || "Error");
      }
      setSubmitState("success");
      setSubmitMessage(copy.contact.messages.success);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(copy.contact.messages.fallback);
    }
  };

  return (
    <div className="min-h-screen bg-[#070809] font-sans text-[#F5F7FA]">
      {/* Subtle top glow */}
      <div className="fixed inset-x-0 top-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(59,130,246,0.06),transparent)]" />

/* ── HEADER ── */
<header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070809]/80 backdrop-blur-xl">
  <div className="flex items-center justify-between px-6 py-5 mx-auto max-w-8xl lg:px-8">
    
    {/* LOGO + BRAND */}
    <a href="#top" className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
        <Image
          src="/logo.png"
          alt="ViralDental Logo"
          width={36}
          height={36}
          className="object-cover w-full h-full rounded-xl"
          priority
        />
      </div>

      <span className="text-[15px] font-semibold text-white">
        {copy.brand.name}
      </span>
    </a>

    {/* DESKTOP NAV */}
    <nav className="items-center hidden gap-10 lg:flex">
      {copy.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-[#9AA3AE] transition-colors hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </nav>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3">

      {/* LANGUAGE SWITCHER */}
      <div className="inline-flex items-center rounded-lg border border-white/8 bg-white/[0.03] p-0.5">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              locale === code
                ? "bg-white/10 text-white"
                : "text-[#9AA3AE] hover:text-white"
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      {/* CTA BUTTON */}
      <a
        href="#contact"
        {...flowButtonProps}
        className="flow-button hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90 sm:inline-flex"
      >
        {copy.brand.headerCta}
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-[#9AA3AE] transition hover:text-white lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  </div>
</header>

/* ── MOBILE MENU ── */
{mobileMenuOpen && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.15 }}
    className="fixed inset-0 z-[60] flex flex-col bg-[#070809] lg:hidden"
  >

    {/* MOBILE HEADER */}
    <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">

      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
          <Image
            src="/viraldental.marketinglogo.png"
            alt="ViralDental Logo"
            width={36}
            height={36}
            className="object-cover w-full h-full rounded-xl"
            priority
          />
        </div>

        <span className="text-[15px] font-semibold text-white">
          {copy.brand.name}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-xl border border-white/8 p-2.5 text-[#9AA3AE]"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* MOBILE NAV */}
    <nav className="flex flex-col gap-1 p-6">
      {copy.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-xl px-4 py-4 text-lg font-medium text-[#D3D8E0] transition hover:bg-white/[0.04] hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </nav>

    {/* MOBILE CTA */}
    <div className="px-6">
      <a
        href="#contact"
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-[#070809]"
      >
        {copy.brand.headerCta}
      </a>
    </div>
  </motion.div>
)}

      <main id="top">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Background image */}
          <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0">
            <img src="/ai-images/hero.png" alt="Digital systems visualization"
              className="object-cover object-center w-full h-full" />
            <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(7,8,9,0.55) 0%, rgba(7,8,9,0.7) 50%, rgba(7,8,9,1) 100%)'}} />
            <div className="absolute inset-0" style={{background: 'linear-gradient(90deg, rgba(7,8,9,0.85) 0%, rgba(7,8,9,0.4) 60%, rgba(7,8,9,0) 100%)'}} />
          </motion.div>

          {/* Text content */}
          <div className="relative z-10 w-full px-6 pb-32 mx-auto max-w-8xl pt-36 lg:px-8 lg:pt-44 lg:pb-40">
            <div className="max-w-2xl">
              <motion.p {...fadeUp} className="mb-6 text-sm font-medium text-[#9AA3AE]">
                {copy.hero.eyebrow}
              </motion.p>
              <motion.h1 {...fadeUp} transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-semibold text-white font-display text-hero-sm lg:text-hero">
                {copy.hero.title}
              </motion.h1>
              <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-lg text-lg leading-relaxed text-[#9AA3AE]">
                {copy.hero.subtitle}
              </motion.p>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-wrap items-center gap-4 mt-10">
                <a href={copy.hero.primaryCta.href} {...flowButtonProps}
                  className="flow-button inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
                  {copy.hero.primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href={copy.hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                  {copy.hero.secondaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
            className="relative z-10 flex justify-center pb-10">
            <a href="#system" className="flex flex-col items-center gap-2 text-[#9AA3AE]/50 transition hover:text-[#9AA3AE]">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            2. SYSTEM VISUAL
        ══════════════════════════════════════ */}
        <section id="system" className="border-t border-white/[0.06] bg-[#0D1117]">
          <div className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="font-semibold text-white font-display text-section-sm lg:text-section">
                {copy.system.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-[#9AA3AE]">{copy.system.text}</p>
            </motion.div>

            {/* Flow diagram */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-16">
              {copy.system.flow.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                      i === 0 ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                      : i === copy.system.flow.length - 1 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-[#D3D8E0]"
                    }`}>
                      {step}
                    </div>
                  </div>
                  {i < copy.system.flow.length - 1 && (
                    <div className="hidden w-8 h-px bg-gradient-to-r from-white/20 to-white/5 sm:block" />
                  )}
                  {i < copy.system.flow.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-white/20 sm:hidden" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* System image */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-14 relative overflow-hidden rounded-[24px] border border-white/[0.08]">
              <img src="/ai-images/system.png" alt="Growth system visualization"
                className="w-full h-[440px] object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. PROBLEM
        ══════════════════════════════════════ */}
        <section className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
          <motion.h2 {...fadeUp} className="max-w-3xl font-semibold text-white font-display text-section-sm lg:text-section">
            {copy.problem.title}
          </motion.h2>

          <div className="mt-16 grid gap-px border border-white/[0.06] rounded-[24px] overflow-hidden md:grid-cols-3">
            {copy.problem.items.map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#0D1117] p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">0{i + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#9AA3AE]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. PLATFORM
        ══════════════════════════════════════ */}
        <section id="platform" className="border-t border-white/[0.06] bg-[#0D1117]">
          <div className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {copy.platform.eyebrow}
              </p>
              <h2 className="max-w-2xl mt-4 font-semibold text-white font-display text-section-sm lg:text-section">
                {copy.platform.title}
              </h2>
            </motion.div>

            {/* 2×2 grid */}
            <div className="grid gap-4 mt-16 md:grid-cols-2">
              {copy.platform.modules.map((mod, i) => (
                <motion.div key={mod.title} {...flowCardProps} {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flow-surface rounded-[20px] border border-white/[0.07] bg-[#14171C] p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/50">0{i + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white flow-child">{mod.title}</h3>
                  <p className="flow-child mt-3 text-base leading-7 text-[#9AA3AE]">{mod.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Automation + Dashboard visual duo */}
            <div className="grid gap-4 mt-6 md:grid-cols-2">
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
                className="relative overflow-hidden rounded-[20px] border border-white/[0.07]">
                <img src="/ai-images/automation.png" alt="Automation"
                  className="w-full h-[300px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/70">Automation</p>
                  <p className="mt-1 text-lg font-semibold text-white">Intelligence that keeps leads moving</p>
                </div>
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
                className="relative overflow-hidden rounded-[20px] border border-white/[0.07]">
                <img src="/ai-images/dashboard.png" alt="CRM"
                  className="w-full h-[300px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/70">CRM Structure</p>
                  <p className="mt-1 text-lg font-semibold text-white">Every lead organized, nothing lost</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. WORK
        ══════════════════════════════════════ */}
        <section id="work" className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
          <motion.h2 {...fadeUp} className="font-semibold text-white font-display text-section-sm lg:text-section">
            {copy.work.title}
          </motion.h2>

          <div className="grid gap-6 mt-16 lg:grid-cols-3">
            {copy.work.items.map((project, index) => {
              const domain = getProjectDomain(project.href);
              return (
                <motion.a key={project.title} href={project.href} target="_blank" rel="noreferrer"
                  {...flowCardProps} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flow-surface group flex flex-col rounded-[20px] border border-white/[0.07] bg-[#0D1117] overflow-hidden transition hover:-translate-y-1">

                  {/* Site preview */}
                  <div className="relative overflow-hidden bg-[#091426]">
                    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/20 px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-[#9AA3AE]/60">{domain}</span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <iframe src={project.href} title={project.title} loading="lazy"
                        onLoad={() => setPreviewLoaded(p => ({ ...p, [project.title]: true }))}
                        className="absolute top-0 left-0 border-0 pointer-events-none"
                        style={{ width: "160%", height: "160%", transform: "scale(0.625)", transformOrigin: "top left" }} />
                      <div className={`pointer-events-none absolute inset-0 bg-[#091426] transition-opacity duration-700 ${
                        previewLoaded[project.title] ? "opacity-0" : "opacity-100"}`} />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#091426] to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        {project.status}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-semibold text-white flow-child">{project.title}</h3>
                    <p className="flow-child mt-2 text-sm leading-6 text-[#9AA3AE]">{project.text}</p>
                    <div className="mt-4 space-y-2">
                      {project.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2 text-sm text-[#D3D8E0]">
                          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          {o}
                        </div>
                      ))}
                    </div>
                    <span className="flow-button mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#9AA3AE] transition group-hover:text-white">
                      {copy.work.linkLabel}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. TECHNOLOGY
        ══════════════════════════════════════ */}
        <section className="border-t border-white/[0.06] bg-[#0D1117]">
          <div className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <motion.div {...fadeUp}>
                <h2 className="font-semibold text-white font-display text-section-sm lg:text-section">
                  {copy.technology.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[#9AA3AE]">{copy.technology.text}</p>
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {copy.technology.items.map((tech) => (
                  <div key={tech} {...flowCardProps}
                    className="flow-surface flex items-center justify-center rounded-[16px] border border-white/[0.07] bg-[#14171C] px-4 py-4 text-center text-sm font-semibold text-[#D3D8E0] transition hover:border-white/20 hover:text-white">
                    {tech}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile image */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-14 relative overflow-hidden rounded-[24px] border border-white/[0.07]">
              <img src="/ai-images/mobile.png" alt="Mobile lead capture"
                className="w-full h-[380px] object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/85 via-[#0D1117]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 to-transparent" />
              <div className="absolute max-w-sm -translate-y-1/2 left-8 top-1/2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Zero-risk paid ads</p>
                <p className="mt-2 text-2xl font-semibold text-white">More patients than your last agency, or it's free.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. FINAL CTA
        ══════════════════════════════════════ */}
        <section id="contact" className="px-6 mx-auto max-w-8xl py-30 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left: CTA text */}
            <motion.div {...fadeUp}>
              <h2 className="font-semibold text-white font-display text-section-sm lg:text-section">
                {copy.cta.title}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#9AA3AE]">{copy.cta.text}</p>
              <div className="mt-10 space-y-4">
                <a href={`mailto:${copy.cta.email}`}
                  className="flex items-center gap-3 text-[#9AA3AE] transition hover:text-white">
                  <Mail className="w-4 h-4 text-blue-400" />
                  {copy.cta.email}
                </a>
                <div className="flex items-center gap-3 text-[#9AA3AE]">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {copy.cta.location}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.form onSubmit={handleSubmit} {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[24px] border border-white/[0.07] bg-[#0D1117] p-8 lg:p-10">
              <p className="text-lg font-semibold text-white">{copy.contact.formTitle}</p>
              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                <input type="text" required placeholder={copy.contact.fields.name.placeholder}
                  value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
                <input type="email" required placeholder={copy.contact.fields.email.placeholder}
                  value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
              </div>
              <textarea required placeholder={copy.contact.fields.message.placeholder}
                value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                className="mt-4 min-h-[130px] w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
              <div className="flex flex-col gap-3 mt-5 sm:flex-row">
                <button type="submit" disabled={submitState === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90 disabled:opacity-50">
                  {submitState === "submitting" ? copy.contact.actions.submitting : copy.contact.actions.submit}
                  <Send className="w-4 h-4" />
                </button>
                <a href={`mailto:${copy.cta.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3.5 text-sm font-semibold text-[#9AA3AE] transition hover:border-white/20 hover:text-white">
                  {copy.contact.actions.direct}
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              {submitState === "success" && <p className="mt-4 text-sm text-emerald-400">{submitMessage}</p>}
              {submitState === "error" && <p className="mt-4 text-sm text-rose-400">{submitMessage}</p>}
            </motion.form>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-6 py-8 text-xs text-[#9AA3AE]/50 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{copy.footer.copyright.replace("{year}", String(currentYear))}</p>
          <div className="flex flex-col gap-1 lg:items-end">
            <p>{copy.footer.credit}</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-[#9AA3AE] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#9AA3AE] transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
