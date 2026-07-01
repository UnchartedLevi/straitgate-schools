'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  FilmIcon,
  LinkIcon,
  MapPinIcon,
  PlayIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import SchoolPillarsSection from '@/components/schools/SchoolPillarsSection';
import type { AdmissionLink, School } from '@/lib/content';

type StraitgatePrimaryForthrightPageProps = {
  school?: School;
  admissionLink?: AdmissionLink;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
} as const;

const sectionEyebrowClass = 'font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl';
const sectionTitleClass = 'mt-4 text-xl font-semibold leading-8 text-dark sm:text-2xl';
const sectionBodyClass = 'mt-6 text-lg leading-8 text-gray-600';

const pillars = [
  {
    title: 'Digital Learning',
    description:
      'Modern digital tools including interactive boards and an LMS for blended learning.',
  },
  {
    title: 'Awards',
    description:
      'Victories in spelling bees, mathematics contests, and creative writing competitions.',
  },
  {
    title: 'Excellence',
    description:
      'Consistently outstanding performance in national and international assessments.',
  },
  {
    title: 'Bilingualism',
    description:
      'Confident communication and language skills nurtured for a truly global perspective.',
  },
  {
    title: 'Charity',
    description:
      'Service and giving that grow kindness, empathy, and social responsibility in every pupil.',
  },
  {
    title: 'Science Projects',
    description:
      'Hands-on experiments and projects that spark curiosity and practical understanding.',
  },
  {
    title: 'Christian Values',
    description:
      'Faith, integrity, and compassion woven into daily school life and character formation.',
  },
  {
    title: 'Sports',
    description:
      'Active sports and games that build teamwork, discipline, fitness, and healthy competition.',
  },
];

const learningPath = [
  'Strong classroom instruction supported by guided independent study',
  'STEM, literacy, communication, and problem-solving emphasis',
  'Mentorship, discipline, and pastoral attention for the whole child',
  'Clubs, competitions, leadership, and service opportunities',
];

const headMessage =
  'Welcome to Straitgate Forthright Primary School! We believe every child is a star waiting to shine. Our school is more than a place of learning — it is a community where curiosity is nurtured, talents are discovered, and confidence is built. With a blend of academic excellence, character development, and innovative teaching, we create a vibrant environment where children grow into thoughtful leaders and lifelong learners. At Straitgate Forthright, every child matters, and every dream is possible!';

const galleryImages = [
  {
    src: '/straitgate-nursery-and-primary-school-forthright-gallery.jpg',
    alt: 'Straitgate Forthright Primary School campus and pupil life',
    label: 'Focused learning',
  },
  {
    src: '/straitgate-nursery-and-primary-school-forthright-gallery.1.jpg',
    alt: 'Straitgate Forthright Primary School campus and pupil life',
    label: 'Pupil community',
  },
  {
    src: '/straitgate-nursery-and-primary-school-forthright-gallery.2.jpg',
    alt: 'Straitgate Forthright Primary School campus and pupil life',
    label: 'Purposeful campus',
  },
  {
    src: '/straitgate-nursery-and-primary-school-forthright-gallery.3.jpg',
    alt: 'Straitgate Forthright Primary School campus and pupil life',
    label: 'Guided study',
  },
];

const videoStories = [
  {
    title: 'Primary classroom moments',
    platform: 'YouTube',
    href: 'https://www.youtube.com/results?search_query=Straitgate+Forthright+Primary+School',
    image: '/sgpics/magboro-hero.jpg',
  },
];

const facilities = [
  {
    title: 'Music Room',
    description: 'Music, rehearsal, and performance room.',
    image: '/sgpics/home-music-performing-arts.jpg',
  },
  {
    title: 'Library',
    description: 'Reading and independent study.',
    image: '/sgpics/home-press-club.jpg',
  },
  {
    title: 'Playground',
    description: 'Active play, teamwork, and fitness.',
    image: '/sgpics/home-football-academy.jpg',
  },
  {
    title: 'E-Classrooms',
    description: 'Interactive lessons and digital learning.',
    image: '/sgpics/home-stem-club.jpg',
  },
];

export default function StraitgatePrimaryForthrightPage({ school }: StraitgatePrimaryForthrightPageProps) {
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const videoTrackRef = useRef<HTMLDivElement>(null);
  // Forthright apply CTAs always point to the Straitgate Forthright educare admission form.
  const applyHref = 'https://sgf.educare.school/admission-form';
  const address = school?.address || 'Road D, Forthright Gardens, Magboro, Ogun State';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const scrollableVideoStories = videoStories;

  useEffect(() => {
    if (videoStories.length <= 1) return;
    const track = videoTrackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('[data-video-card="true"]');
    if (!track || !firstCard) return;

    const gap = 40;
    track.scrollLeft = firstCard.offsetWidth + gap;
  }, []);

  useEffect(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    let frame = 0;
    const scroll = () => {
      const loopPoint = track.scrollWidth / 2;
      if (track.scrollLeft >= loopPoint) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += 0.55;
      }
      frame = window.requestAnimationFrame(scroll);
    };

    frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scrollGallery = (direction: number) => {
    const track = galleryTrackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('[data-gallery-card="true"]');
    if (!track || !firstCard) return;

    const gap = 20;
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'smooth' });
  };
  const scrollVideo = (direction: number) => {
    const track = videoTrackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('[data-video-card="true"]');
    if (!track || !firstCard) return;

    const gap = 40;
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/sgpics/magboro-hero.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#080808]" />
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-primary/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-white backdrop-blur">
              Straitgate Schools / Magboro
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
              Straitgate Primary <span className="text-primary">Forthright</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Every child is a star waiting to shine.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-primary-dark"
              >
                Apply to Primary School
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur transition-colors hover:bg-white hover:text-dark"
              >
                Contact us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-2"
          >
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="border border-white/15 bg-white/10 p-5 backdrop-blur transition-colors hover:bg-white/15">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Location</p>
              <p className="mt-2 flex items-start gap-2 text-sm font-semibold leading-6 text-white/85">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {address}
              </p>
            </a>
            <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Focus</p>
              <p className="mt-2 text-lg font-bold leading-7">Faith, academics, leadership</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <motion.div {...fadeUp}>
              <div className="max-w-2xl">
                <span className={`mb-4 inline-block ${sectionEyebrowClass}`}>
                  Message from Head of School
                </span>
                <h2 className="text-xl italic leading-8 text-dark sm:text-2xl">
                  &quot;Every child is at the heart of our primary school community.&quot;
                </h2>
                <div className="mt-6 h-1 w-16 bg-primary" />
                <p className="mt-6 text-base leading-8 text-gray-700">{headMessage}</p>
                <div className="mt-7 border-l-4 border-primary pl-5">
                  <p className="font-semibold text-dark">Mrs. Gbemisola Mordi</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Head of School · Straitgate Forthright Primary School
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }}>
              <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
                <div className="absolute -left-4 -top-4 h-full w-full border-4 border-primary/60" />
                <div className="relative overflow-hidden bg-light shadow-[0_28px_42px_-24px_rgba(0,0,0,0.55)]">
                  <div className="aspect-[4/5]">
                    <Image
                      src="/straitgate-nursery-and-primary-school-forthright-head.jpg"
                      alt="Portrait for Straitgate Forthright Primary School head of school message"
                      width={992}
                      height={1077}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent p-5 pt-20">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white">
                      School Leadership
                    </p>
                    <p className="mt-1 font-serif text-xl text-white">Welcome to primary school</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionEyebrowClass}>Gallery</p>
              <h2 className={sectionTitleClass}>A clear look at the classrooms, campus, and pupil community.</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous gallery image"
                onClick={() => scrollGallery(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-primary shadow-lg shadow-black/5 transition-colors hover:bg-primary hover:text-white"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next gallery image"
                onClick={() => scrollGallery(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <div
            ref={galleryTrackRef}
            className="no-scrollbar mt-10 overflow-x-auto scroll-smooth"
          >
            <div className="flex min-h-[34rem] gap-5">
              {[...galleryImages, ...galleryImages].map((item, index) => (
                <div
                  key={`${item.label}-${item.src}-${index}`}
                  data-gallery-card="true"
                  className="relative min-h-[34rem] shrink-0 basis-full overflow-hidden rounded-[1.75rem] bg-light shadow-2xl shadow-black/10 md:basis-[calc((100%_-_2.5rem)/3)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary/5 py-20 sm:py-28">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-8 right-0 h-80 w-80 rounded-full bg-[#172554]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className={sectionEyebrowClass}>Why Straitgate Forthright Primary School</p>
              <h2 className={sectionTitleClass}>
                A primary school environment shaped for focus, character, and confidence.
              </h2>
              <p className={`${sectionBodyClass} lg:mt-10`}>
                Inspired by leading school websites that make campus life feel clear and personal,
                this section keeps Straitgate&apos;s burgundy, navy, warm-white, and photo-led identity.
              </p>
            </div>
            <div className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] bg-light shadow-2xl shadow-black/10">
              <Image
                src="/sgpics/magboro-why-straitgate.jpg"
                alt="Straitgate Forthright Primary School pupil learning in class"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>

      <SchoolPillarsSection
        pillars={pillars}
        label="Why choose Straitgate Forthright Primary School"
      />

      <section className="overflow-hidden bg-light text-dark">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <motion.div {...fadeUp} className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <p className={sectionEyebrowClass}>Academic journey</p>
            <h2 className={sectionTitleClass}>
              A primary school experience built around focus, guidance, and growth.
            </h2>
            <div className="mt-10 space-y-5">
              {learningPath.map((item) => (
                <div key={item} className="flex gap-4 border-t border-black/10 pt-5">
                  <CheckCircleIcon className="h-6 w-6 shrink-0 text-primary" />
                  <p className="leading-7 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[520px] overflow-hidden bg-white lg:min-h-full">
            <Image
              src="/sgpics/magboro-hero.jpg"
              alt="Straitgate Forthright Primary School classroom learning"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r lg:from-light/95 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className={sectionEyebrowClass}>Life at primary school</p>
            <h2 className={sectionTitleClass}>
              From our primary school community.
            </h2>
          </motion.div>

          <div className="relative mt-12">
            <div
              ref={videoTrackRef}
              className="no-scrollbar relative left-1/2 w-screen -translate-x-1/2 snap-x snap-mandatory overflow-x-auto scroll-smooth px-[10vw] py-6 lg:px-[calc((100vw-56rem)/2)]"
            >
              <div className="flex items-center gap-10">
                {scrollableVideoStories.map((item, index) => (
                  <a
                    key={`${item.title}-${index}`}
                    data-video-card="true"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block shrink-0 basis-[80vw] snap-center overflow-hidden rounded-[1.75rem] bg-dark shadow-2xl shadow-black/15 transition-transform duration-500 hover:scale-[1.015] lg:basis-[56rem]"
                  >
                    <div className="relative aspect-[16/9] min-h-[22rem]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 56rem, 80vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark/25" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/75 via-primary/25 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-20 w-24 items-center justify-center rounded-2xl bg-accent text-white shadow-xl shadow-black/25 transition-transform group-hover:scale-105">
                          <PlayIcon className="ml-1 h-10 w-10 fill-current" />
                        </span>
                      </div>
                      <div className="absolute left-5 top-5 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary">
                          <FilmIcon className="h-5 w-5" />
                        </span>
                        <div className="text-white drop-shadow">
                          <p className="text-sm font-black">{item.title}</p>
                          <p className="text-xs font-semibold text-white/85">Straitgate Forthright Primary School</p>
                        </div>
                      </div>
                      <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-dark">
                        <LinkIcon className="h-4 w-4" />
                        Watch on {item.platform}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {videoStories.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-6">
                <button
                  type="button"
                  aria-label="Previous primary school video"
                  onClick={() => scrollVideo(-1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <ArrowLeftIcon className="h-8 w-8" />
                </button>
                <button
                  type="button"
                  aria-label="Next primary school video"
                  onClick={() => scrollVideo(1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <ArrowRightIcon className="h-8 w-8" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f0ea] py-20 text-dark sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">Facilities</p>
            <h2 className="mt-4 text-xl font-semibold leading-8 text-dark/70 sm:text-2xl">
              Purpose-built spaces for science, creativity, technology, and reading culture.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => (
              <article
                key={facility.title}
                className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-black text-dark">{facility.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{facility.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-24">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#172554] lg:block" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Admissions Now Open</p>
            <h2 className="mt-4 text-xl font-semibold leading-8 text-white/90 sm:text-2xl">
              Ready to begin the Straitgate Forthright journey?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Start your child&apos;s admission process today. Submit an application and our admissions team
              will guide you through the next steps.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="rounded-[2rem] bg-white p-7 text-dark shadow-2xl sm:p-9">
            <UserGroupIcon className="h-9 w-9 text-primary" />
            <h3 className="mt-5 text-2xl font-bold">Apply to Straitgate Forthright</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Complete the application form now and take the first step toward joining our primary school community.
              We will follow up with requirements, visit details, and placement guidance.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center bg-primary px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary-dark"
              >
                Apply Now
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center border border-black/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-dark transition-colors hover:border-primary hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
