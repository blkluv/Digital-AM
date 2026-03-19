import React from "react";
import ReactDOM from "react-dom/client";
import { Mail, ShieldCheck } from "lucide-react";
import "./index.css";

const currentDate = "March 12, 2026";
const brandName = "ViralDental.marketing";
const domain = "https://viraldental.marketing";
const contactEmail = "ferkmas88@gmail.com";

const legalPages = {
  privacy: {
    title: `Privacy Policy | ${brandName}`,
    pageTitle: "Privacy Policy",
    intro:
      "ViralDental.marketing respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you submit your information through our website, QR forms, landing pages, or other signup methods.",
    sections: [
      {
        heading: "Effective Date",
        body: [currentDate],
      },
      {
        heading: "Who We Are",
        body: [
          `${brandName} provides websites, lead capture flows, follow-up systems, and messaging experiences for local businesses through ${domain}.`,
        ],
      },
      {
        heading: "Information We Collect",
        body: ["We may collect the following information when you interact with us or participating businesses using our platform:"],
        bullets: ["Your name", "Your mobile phone number", "Your email address", "Basic interaction data related to your signup"],
      },
      {
        heading: "How We Use Information",
        body: ["We use your information to:"],
        bullets: [
          "Send promotions and special offers",
          "Send updates related to your signup, participation, or account",
          "Send review follow-up messages",
          "Provide customer support",
          "Improve our services and landing page experiences",
        ],
      },
      {
        heading: "SMS Consent",
        body: [
          `If you submit your mobile number and opt in, you agree to receive recurring text messages from ${brandName} or participating businesses using the ${brandName} platform.`,
          "Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.",
        ],
      },
      {
        heading: "Email Communications",
        body: [
          `If you provide your email address, you may receive welcome emails, promotions, updates, or follow-up communications from ${brandName} or participating businesses using the platform.`,
        ],
      },
      {
        heading: "Data Sharing",
        body: ["We do not sell, rent, or share your personal information with third parties for their own marketing purposes."],
      },
      {
        heading: "Data Security",
        body: ["We use reasonable administrative, technical, and organizational safeguards to protect the information you submit."],
      },
      {
        heading: "User Choices / Opt-Out",
        body: [
          "You may opt out of SMS messages at any time by replying STOP.",
          "You may opt out of email communications using the unsubscribe link if available or by contacting us directly.",
        ],
      },
      {
        heading: "Contact Information",
        body: ["If you have questions about this Privacy Policy, contact us at:"],
        contact: [contactEmail, domain],
      },
    ],
  },
  terms: {
    title: `Terms & Conditions | ${brandName}`,
    pageTitle: "Terms & Conditions",
    intro:
      "By submitting your information through our website, QR code, landing page, or signup form, you agree to these Terms and Conditions.",
    sections: [
      {
        heading: "Effective Date",
        body: [currentDate],
      },
      {
        heading: "Program Description",
        body: [
          `By opting in, you agree to receive SMS messages and/or emails from ${brandName} or participating businesses using the ${brandName} platform, including promotions, offers, reminders, and follow-up messages.`,
        ],
      },
      {
        heading: "Message Frequency",
        body: ["Message frequency may vary."],
      },
      {
        heading: "Message and Data Rates",
        body: ["Message and data rates may apply depending on your mobile carrier plan."],
      },
      {
        heading: "Opt-Out Instructions",
        body: ["You can opt out of SMS messages at any time by replying STOP to any message."],
      },
      {
        heading: "Help Instructions",
        body: ["For help, reply HELP or contact us at:"],
        contact: [contactEmail, domain],
      },
      {
        heading: "Consent Not a Condition of Purchase",
        body: ["Consent to receive messages is not a condition of purchase."],
      },
      {
        heading: "Eligibility",
        body: ["You must be the authorized user of the mobile number or email address provided and be legally able to consent to receive communications."],
      },
      {
        heading: "Changes to Terms",
        body: ["We may update these Terms and Conditions from time to time. Continued participation after changes means you accept the updated Terms and Conditions."],
      },
      {
        heading: "Contact Information",
        body: ["For questions, contact:"],
        contact: [contactEmail, domain],
      },
    ],
  },
};

function LegalPage({ content }) {
  return (
    <div className="min-h-screen bg-[#020611] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_22%),radial-gradient(circle_at_80%_18%,_rgba(14,165,233,0.08),_transparent_15%),linear-gradient(to_bottom,rgba(59,130,246,0.03),transparent_25%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(96,165,250,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020611]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-400/25 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
              <span className="text-sm font-black tracking-[0.24em] text-blue-300">AM</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{brandName}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Diseño web · Software · Automatización</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="/#services" className="flow-link text-sm font-medium text-slate-300 transition hover:text-white">
              Servicios
            </a>
            <a href="/#projects" className="flow-link text-sm font-medium text-slate-300 transition hover:text-white">
              Proyectos
            </a>
            <a href="/#process" className="flow-link text-sm font-medium text-slate-300 transition hover:text-white">
              Proceso
            </a>
            <a href="/#contact" className="flow-link text-sm font-medium text-slate-300 transition hover:text-white">
              Contacto
            </a>
          </nav>

          <a
            href="/#contact"
            className="flow-button hidden items-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(37,99,235,0.28)] transition hover:bg-blue-500 sm:inline-flex"
          >
            Hablar de un proyecto
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-20">
        <section className="flow-surface rounded-[34px] border border-white/10 bg-[#06101d]/85 p-8 shadow-[0_30px_100px_rgba(2,8,23,0.42)] backdrop-blur-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Compliance
          </div>

          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">{content.pageTitle}</h1>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{content.intro}</p>

          <div className="mt-10 space-y-6">
            {content.sections.map((section) => (
              <section key={section.heading} className="flow-surface rounded-[28px] border border-white/8 bg-white/[0.03] p-6 md:p-7">
                <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300 md:text-base">
                  {section.body?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-5 text-slate-300">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <div className="space-y-1">
                      {section.contact.map((item) => (
                        <div key={item}>
                          {item.includes("@") ? (
                            <a href={`mailto:${item}`} className="flow-link text-cyan-200 hover:text-white">
                              {item}
                            </a>
                          ) : (
                            <a href={item} className="flow-link text-cyan-200 hover:text-white">
                              {item}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-[26px] border border-cyan-300/15 bg-cyan-300/[0.05] p-5 text-sm leading-7 text-slate-300">
            <div className="mb-2 flex items-center gap-2 font-semibold text-white">
              <Mail className="h-4 w-4 text-cyan-200" />
              Contact
            </div>
            <p>
              For compliance or messaging questions, contact{" "}
              <a href={`mailto:${contactEmail}`} className="flow-link text-cyan-200 hover:text-white">
                {contactEmail}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const pageKey = window.location.pathname.includes("/terms") ? "terms" : "privacy";
const content = legalPages[pageKey];
document.title = content.title;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LegalPage content={content} />
  </React.StrictMode>
);
