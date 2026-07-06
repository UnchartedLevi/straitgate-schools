'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export type Facility = {
  title: string;
  description: string;
  image: string;
};

type FacilitiesStackSectionProps = {
  facilities: Facility[];
  subtitle: string;
};

const cardRotations = [-1.5, 1.75, -1, 1.25];

export default function FacilitiesStackSection({
  facilities,
  subtitle,
}: FacilitiesStackSectionProps) {
  const [order, setOrder] = useState(() => facilities.map((_, index) => index));
  const [isPaused, setIsPaused] = useState(false);

  const orderedFacilities = useMemo(
    () => order.map((index) => facilities[index]),
    [facilities, order],
  );

  const sendToBack = useCallback(() => {
    setOrder((current) => [...current.slice(1), current[0]]);
  }, []);

  const bringFromBack = () => {
    setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
  };

  useEffect(() => {
    if (isPaused || facilities.length < 2) return;

    const interval = window.setInterval(sendToBack, 4000);
    return () => window.clearInterval(interval);
  }, [facilities.length, isPaused, sendToBack]);

  return (
    <section className="overflow-hidden bg-[#f3f0ea] py-16 text-dark sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div className="max-w-xl">
          <p className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Facilities
          </p>
          <h2 className="mt-4 text-xl font-semibold leading-8 text-dark/70 sm:text-2xl">
            {subtitle}
          </h2>
          <div className="mt-8 flex items-end gap-3 border-t border-black/10 pt-6">
            <span className="font-serif text-5xl font-bold leading-none text-primary">
              {String(order[0] + 1).padStart(2, '0')}
            </span>
            <span className="pb-1 text-sm font-bold uppercase text-gray-500">
              of {String(facilities.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div
          className="mx-auto w-full max-w-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="relative mx-auto aspect-[4/5] w-[82%] max-w-[26rem] sm:w-[70%]">
            {orderedFacilities.map((facility, position) => {
              const depth = Math.min(position, 4);
              const isFront = position === 0;

              return (
                <motion.article
                  key={facility.title}
                  drag={isFront}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.65}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
                      sendToBack();
                    }
                  }}
                  onTap={isFront ? sendToBack : undefined}
                  initial={false}
                  animate={{
                    x: depth * 10,
                    y: depth * 9,
                    scale: 1 - depth * 0.025,
                    rotate: cardRotations[depth % cardRotations.length],
                    opacity: position > 4 ? 0 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  tabIndex={isFront ? 0 : -1}
                  onKeyDown={(event) => {
                    if (isFront && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      sendToBack();
                    }
                  }}
                  aria-label={`${facility.title}: ${facility.description}`}
                  className={`absolute inset-0 overflow-hidden rounded-lg border-4 border-white bg-gray-200 shadow-2xl outline-none ${
                    isFront
                      ? 'cursor-grab focus-visible:ring-4 focus-visible:ring-primary/30 active:cursor-grabbing'
                      : 'pointer-events-none'
                  }`}
                  style={{ zIndex: facilities.length - position }}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(min-width: 1024px) 420px, 70vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <h3 className="font-serif text-3xl font-bold leading-tight">
                      {facility.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-white/85">
                      {facility.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={bringFromBack}
              title="Previous facility"
              aria-label="Previous facility"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div className="flex max-w-48 items-center gap-1.5 overflow-hidden px-2" aria-hidden="true">
              {facilities.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    order[0] === index ? 'w-6 bg-primary' : 'w-1.5 bg-primary/25'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={sendToBack}
              title="Next facility"
              aria-label="Next facility"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
