'use client';

import { motion } from 'framer-motion';

type Pillar = {
  title: string;
  description: string;
};

type SchoolPillarsSectionProps = {
  pillars: Pillar[];
  label: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
} as const;

export default function SchoolPillarsSection({
  pillars,
  label,
}: SchoolPillarsSectionProps) {
  return (
    <section className="border-y border-black/10 bg-white py-12 sm:py-16" aria-label={label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              tabIndex={0}
              className="group overflow-hidden rounded-lg border border-black/10 bg-light px-5 py-5 outline-none transition-all duration-300 hover:border-primary/40 hover:bg-white hover:shadow-lg focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-7 text-dark">{pillar.title}</h3>
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
                    <p className="pt-3 leading-7 text-gray-600">{pillar.description}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
