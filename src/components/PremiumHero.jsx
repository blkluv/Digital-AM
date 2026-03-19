import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  Globe,
  MessageSquare,
  MonitorSmartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import { useMaskReveal } from "../hooks/useMaskReveal";
import { getFlowInteractionProps } from "../utils/flowInteractions";

const journeyIcons = [MessageSquare, Workflow, Bot];
const featureIcons = [Globe, MonitorSmartphone, Zap];
const flowCardProps = getFlowInteractionProps({ tilt: 4 });
const flowButtonProps = getFlowInteractionProps();

function VisualStack({ copy }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[34px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_38%),linear-gradient(135deg,rgba(10,15,29,0.98),rgba(4,8,18,0.94)_48%,rgba(2,6,23,1))]" />
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="absolute -left-16 top-8 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-indigo-500/14 blur-3xl" />
      <div className="absolute bottom-24 right-12 h-40 w-40 rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] blur-2xl" />
      <div className="absolute left-12 top-1/2 h-px w-40 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="absolute right-16 top-24 h-px w-28 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/75">{copy.visual.stackLabel}</div>
          <div className="mt-1 text-sm font-semibold text-white">{copy.visual.stackTitle}</div>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
          {copy.visual.liveSystem}
        </div>
      </div>

      <div className="absolute left-6 right-6 top-28 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flow-surface rounded-[30px] border border-white/10 bg-slate-950/65 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.5)] backdrop-blur-xl" {...flowCardProps}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flow-child text-xs uppercase tracking-[0.28em] text-slate-400">{copy.visual.journeyLabel}</div>
              <h3 className="flow-child mt-2 text-xl font-semibold text-white">{copy.visual.journeyTitle}</h3>
            </div>
            <div className="flow-child rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100">
              {copy.visual.funnelTag}
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {copy.visual.journeyCards.map((card, index) => {
              const Icon = journeyIcons[index];

              return (
                <div
                  key={card.label}
                  className="flow-child group flex items-start gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 transition hover:border-cyan-300/25 hover:bg-white/[0.05]"
                >
                  <div className="mt-1 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{card.label}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{card.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flow-surface rounded-[28px] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl" {...flowCardProps}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flow-child text-xs uppercase tracking-[0.28em] text-slate-400">{copy.visual.signalsLabel}</div>
                <div className="flow-child mt-2 text-lg font-semibold text-white">{copy.visual.signalsTitle}</div>
              </div>
              <Sparkles className="flow-child h-5 w-5 text-cyan-200" />
            </div>

            <div className="mt-5 space-y-3">
              {copy.visual.signals.map(([title, text]) => (
                <div key={title} className="flow-child rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-surface rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.82),rgba(5,10,20,0.92))] p-5 backdrop-blur-xl" {...flowCardProps}>
            <div className="flow-child text-xs uppercase tracking-[0.28em] text-slate-400">{copy.visual.growthLabel}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.visual.features.map((label, index) => {
                const Icon = featureIcons[index % featureIcons.length];

                return (
                  <div
                    key={label}
                    className="flow-child inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-200" />
                    {label}
                  </div>
                );
              })}
            </div>

            <div className="flow-child mt-6 rounded-[24px] border border-cyan-300/15 bg-cyan-300/[0.05] p-4">
              <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">{copy.visual.positioningLabel}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{copy.visual.positioningText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-3">
        {copy.visual.footerPills.map((label) => (
          <div key={label} className="flow-child rounded-[22px] border border-white/10 bg-slate-950/55 px-4 py-4 text-sm font-medium text-slate-200 backdrop-blur-xl">
            {label}
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-[42%] hidden rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-300 backdrop-blur-xl lg:block">
        AI + CRM
      </div>
      <div className="absolute left-8 top-[58%] hidden rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-100 lg:block">
        Automation Layer
      </div>
    </div>
  );
}

export default function PremiumHero({ copy, ui }) {
  const sectionRef = useRef(null);
  const { cursorStyle, glowStyle, interactiveProps, isTouchDevice, layerStyles, maskStyle, panelStyle, spotlightStyle } = useMaskReveal();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const accentY = useTransform(scrollYProgress, [0, 1], [0, -26]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]"
      />
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-[140px]"
      />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-80" />

      <div className="mx-auto max-w-7xl px-6 pb-18 pt-10 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: contentY }}
            className="relative z-10 max-w-[46rem]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.badge}
            </div>

            <h1 className="font-display mt-6 max-w-[15ch] text-[clamp(2.65rem,5.2vw,4.15rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              {(copy.titleLines ?? [copy.title]).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{copy.subtitle}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={copy.primaryCta.href}
                {...flowButtonProps}
                className="flow-button inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_20px_70px_rgba(34,211,238,0.18)] transition hover:bg-cyan-300"
              >
                {copy.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={copy.secondaryCta.href}
                {...flowButtonProps}
                className="flow-button inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-4 text-base font-semibold text-white transition hover:border-cyan-300/25 hover:bg-white/[0.08]"
              >
                {copy.secondaryCta.label}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">{copy.ctaNote}</p>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-slate-400">{copy.trustLine}</p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {copy.metrics.map((item, index) => (
                <motion.div
                  key={item}
                  {...flowCardProps}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.06 }}
                  className="flow-surface rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-md"
                >
                  <div className="flow-child text-xs uppercase tracking-[0.28em] text-cyan-100/70">ViralDental.marketing</div>
                  <div className="flow-child mt-3 text-base font-semibold text-white">{item}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...panelStyle, y: visualY }}
            className="relative"
          >
            <div
              {...interactiveProps}
              className="group relative min-h-[620px] overflow-hidden rounded-[36px] border border-white/12 bg-[#040914] shadow-[0_40px_120px_rgba(2,6,23,0.78)] transition-shadow duration-500 hover:shadow-[0_50px_140px_rgba(2,6,23,0.88)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_26%)]" />
              <motion.div style={glowStyle} className="pointer-events-none absolute inset-0 opacity-90" />
              <motion.div style={spotlightStyle} className="pointer-events-none absolute inset-0 opacity-90 mix-blend-screen" />
              <div className="hero-noise pointer-events-none absolute inset-0 opacity-70" />
              <motion.div
                style={cursorStyle}
                className="pointer-events-none absolute rounded-full border border-white/10 opacity-70 blur-[2px] mix-blend-screen"
              />
              <motion.div
                style={layerStyles.accent}
                className="pointer-events-none absolute -right-12 top-20 h-44 w-44 rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] blur-3xl"
              />
              <motion.div
                style={{ x: layerStyles.accent.x, y: layerStyles.accent.y }}
                className="pointer-events-none absolute -left-10 bottom-16 h-36 w-36 rounded-full border border-indigo-300/10 bg-indigo-400/[0.05] blur-3xl"
              />

              <motion.div style={layerStyles.back} className="absolute inset-0 opacity-[0.22]">
                <VisualStack copy={copy} />
              </motion.div>

              <motion.div style={{ ...layerStyles.front, ...maskStyle }} className="absolute inset-0">
                <VisualStack copy={copy} />
              </motion.div>

              <motion.div
                style={{ x: layerStyles.front.x, y: layerStyles.front.y }}
                className="pointer-events-none absolute left-6 top-6 h-[1px] w-[38%] bg-gradient-to-r from-cyan-200/0 via-cyan-200/45 to-cyan-200/0"
              />
              <motion.div
                style={{ x: layerStyles.back.x, y: layerStyles.back.y }}
                className="pointer-events-none absolute bottom-24 right-8 hidden rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-300 backdrop-blur-xl sm:block"
              >
                Follow-up Engine
              </motion.div>
              <motion.div
                style={{ x: layerStyles.back.x, y: layerStyles.back.y }}
                className="pointer-events-none absolute left-8 bottom-24 hidden rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-100 backdrop-blur-xl sm:block"
              >
                Lead Capture
              </motion.div>

              <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300 backdrop-blur-md">
                {isTouchDevice ? ui.autoReveal : ui.moveToReveal}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
