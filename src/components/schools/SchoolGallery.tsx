'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type SchoolGalleryProps = {
  images: GalleryImage[];
  subtitle: string;
};

const CRUISE_SPEED = 0.55;

export default function SchoolGallery({ images, subtitle }: SchoolGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetSpeedRef = useRef(CRUISE_SPEED);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length < 2) return;

    let frame = 0;
    let velocity = CRUISE_SPEED;
    let loopPoint = 0;

    const updateLoopPoint = () => {
      const cards = track.querySelectorAll<HTMLElement>('[data-gallery-card="true"]');
      loopPoint = cards[images.length]?.offsetLeft ?? track.scrollWidth / 2;
    };

    const animate = () => {
      velocity += (targetSpeedRef.current - velocity) * 0.035;
      track.scrollLeft += velocity;

      if (loopPoint > 0 && track.scrollLeft >= loopPoint) {
        track.scrollLeft -= loopPoint;
      } else if (track.scrollLeft < 0) {
        track.scrollLeft += loopPoint;
      }

      frame = window.requestAnimationFrame(animate);
    };

    updateLoopPoint();
    const resizeObserver = new ResizeObserver(updateLoopPoint);
    resizeObserver.observe(track);
    frame = window.requestAnimationFrame(animate);
    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [images.length]);

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedImage]);

  const moveGallery = (direction: number) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('[data-gallery-card="true"]');
    if (!track || !firstCard) return;

    track.scrollLeft += direction * (firstCard.offsetWidth + 20);
  };

  return (
    <>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
                Gallery
              </p>
              <h2 className="mt-4 text-xl font-semibold leading-8 text-dark sm:text-2xl">
                {subtitle}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous gallery image"
                title="Previous gallery image"
                onClick={() => moveGallery(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-primary shadow-lg shadow-black/5 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next gallery image"
                title="Next gallery image"
                onClick={() => moveGallery(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            onMouseEnter={() => {
              targetSpeedRef.current = 0;
            }}
            onMouseLeave={() => {
              targetSpeedRef.current = CRUISE_SPEED;
            }}
            onFocusCapture={() => {
              targetSpeedRef.current = 0;
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                targetSpeedRef.current = CRUISE_SPEED;
              }
            }}
            className="no-scrollbar mt-10 overflow-x-auto"
          >
            <div className="flex min-h-[34rem] gap-5">
              {[...images, ...images].map((item, index) => (
                <button
                  type="button"
                  key={`${item.label}-${item.src}-${index}`}
                  data-gallery-card="true"
                  onClick={() => setSelectedImage(item)}
                  className="group relative min-h-[34rem] shrink-0 basis-full overflow-hidden rounded-lg bg-light text-left shadow-2xl shadow-black/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 md:basis-[calc((100%_-_2.5rem)/3)]"
                  aria-label={`Open ${item.label} image`}
                  >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.label}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <div className="relative h-[82vh] w-full max-w-6xl overflow-hidden rounded-lg bg-black">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
            title="Close image"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-dark shadow-xl transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>
      )}
    </>
  );
}
