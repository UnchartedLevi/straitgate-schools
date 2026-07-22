'use client';

import FadeIn from '@/components/FadeIn';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function SchoolHeadSection() {
  return (
    <section className="bg-white pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeIn direction="right">
            <article className="max-w-3xl">
              <header className="max-w-3xl">
                <span className="mb-5 inline-block font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
                  Futuristic Learning
                </span>
                <h2 className="text-xl italic leading-8 text-dark sm:text-2xl">
                  Preparing learners not only for the world as it is, but for the world they will help
                  create.
                </h2>
                <div className="mt-8 h-1 w-20 bg-primary" />
              </header>

              <div className="mt-8 space-y-5 text-lg leading-8 text-gray-700">
                <p>
                  The future of learning is already taking shape. At Straitgate Schools, we prepare
                  learners to thrive in a changing world by nurturing curiosity, adaptability,
                  creativity, and confidence.
                </p>
                <p>
                  Our approach combines strong academic foundations with critical thinking,
                  collaboration, responsible technology use, and real-world problem-solving. Guided by
                  faith, character, discipline, and service, our students are equipped to meet new
                  possibilities with wisdom and use their abilities to improve the world around them.
                </p>
              </div>

              <footer className="mt-10 border-l-4 border-primary pl-5">
                <p className="font-semibold text-dark">Chief Operating Officer</p>
                <p className="mt-1 text-sm uppercase tracking-wider text-gray-500">
                  Straitgate Schools
                </p>
              </footer>
            </article>
          </FadeIn>

          <FadeIn direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              <div className="absolute -left-5 -top-5 h-full w-full border border-primary/25" />
              <div className="relative overflow-hidden bg-light shadow-2xl">
                <img
                  src="/makeUp.jpeg"
                  alt="Mrs. Nnena Okore"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent p-6 pt-24">
                  <p className="mt-2 font-serif text-2xl text-white">Mrs. Nnena Okore</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
