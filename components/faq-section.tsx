"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "Can I upload website screenshots?",
    answer:
      "Yes. VibeKit works with websites, dashboards, SaaS apps, landing pages, mobile apps, posters and more.",
  },
  {
    question:
      "Can I export Tailwind colors?",
    answer:
      "Yes. Generate Tailwind-ready color tokens and configuration instantly.",
  },
  {
    question:
      "Does VibeKit generate CSS variables?",
    answer:
      "Yes. Export production-ready CSS variables for your projects.",
  },
  {
    question:
      "Can I upload mobile app screenshots?",
    answer:
      "Absolutely. Mobile interfaces work great with palette extraction.",
  },
  {
    question:
      "Can I use generated themes commercially?",
    answer:
      "Yes. Generated design systems are yours to use in personal and commercial projects.",
  },
];

export function FAQSection() {
  const [open, setOpen] =
    useState<number | null>(0);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            FAQ
          </p>

          <h2 className="text-6xl font-black">
            Frequently Asked
            Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.03]
              "
            >
              <button
                onClick={() =>
                  setOpen(
                    open === index
                      ? null
                      : index
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  p-6
                  text-left
                "
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    open === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-zinc-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}