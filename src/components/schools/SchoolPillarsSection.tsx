'use client';

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Pillar = {
  title: string;
  description: string;
  icon?: ElementType;
  iconImage?: string;
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
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.05 }}
                tabIndex={0}
                className="group overflow-hidden rounded-lg border border-black/10 bg-light px-5 py-4 outline-none transition-all duration-300 hover:border-primary/40 hover:bg-white hover:shadow-xl focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20">
                    {pillar.iconImage ? (
                      <Image
                        src={pillar.iconImage}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain brightness-0 invert"
                      />
                    ) : Icon ? (
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className="mt-3 min-w-0">
                    <h3 className="font-serif text-xl font-bold leading-tight text-dark">
                      {pillar.title}
                    </h3>
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
                      <p className="pt-3 text-sm font-medium leading-6 text-gray-600">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
