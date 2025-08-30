'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { heroSlides } from '@/data/slides';
const slideImages = {
  '/img/hero-1.jpg': '/assets/hero-1.jpg',
  '/img/hero-2.jpg': '/assets/hero-2.jpg',
  '/img/hero-3.jpg': '/assets/hero-3.jpg',
};

export default function HeroSlider() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Ensure videos autoplay when component mounts
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Autoplay was prevented, which is fine
        });
      }
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 6000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) => {
            const slide = index + 1;
            return `
              <button class="${className}" type="button" role="tab" aria-controls="heroBanner-slide${slide}" aria-label="Go to slide ${slide}" tabindex="0">
                <span class="bullet-track"><span class="bullet-progress"></span></span>
              </button>
            `;
          },
        }}
        loop={true}
        onInit={(swiper) => {
          const delay = typeof swiper.params.autoplay === 'object' ? (swiper.params.autoplay as any).delay : 6000;
          const el = swiper.pagination?.el as HTMLElement | null;
          if (el) {
            el.style.setProperty('--slide-interval', `${delay}ms`);
            requestAnimationFrame(() => {
              const bullets = el.querySelectorAll('.swiper-pagination-bullet');
              bullets.forEach((b) => b.classList.remove('is-active'));
              const active = el.querySelector('.swiper-pagination-bullet-active');
              active?.classList.add('is-active');
            });
          }
        }}
        onSlideChange={(swiper) => {
          const el = swiper.pagination?.el as HTMLElement | null;
          if (!el) return;
          const bullets = el.querySelectorAll('.swiper-pagination-bullet');
          bullets.forEach((b) => {
            b.classList.remove('is-active');
            const prog = (b as HTMLElement).querySelector('.bullet-progress') as HTMLElement | null;
            if (prog) {
              // restart CSS animation
              prog.style.animation = 'none';
              // force reflow
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              prog.offsetHeight;
              prog.style.animation = '';
            }
          });
          const active = el.querySelector('.swiper-pagination-bullet-active');
          active?.classList.add('is-active');
        }}
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Layer - Blurred */}
            <div className="absolute inset-0 -z-10">
              {slide.type === 'image' ? (
                <img
                  src={slideImages[slide.src as keyof typeof slideImages]}
                  alt={slide.title}
                  className="w-full h-full object-cover scale-125 blur-3xl brightness-75"
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.poster}
                  className="w-full h-full object-cover scale-125 blur-3xl brightness-75"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 " />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="container-section">
                <div className="items-center">

                  {/* Media Content */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative w-full">
                      <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                        {slide.type === 'image' ? (
                          <img
                            src={slideImages[slide.src as keyof typeof slideImages]}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={slide.poster}
                            className="w-full h-full object-cover"
                          >
                            <source src={slide.src} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Default Swiper pagination will render inside Swiper */}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:block">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .swiper-pagination { display: flex; gap: 12px; align-items: center; justify-content: center; }
          .swiper-pagination-bullets { bottom: 2rem !important; }
          .swiper-pagination-bullet { position: relative; width: 56px; height: 4px; border-radius: 9999px; background: rgba(255,255,255,0.35); overflow: hidden; cursor: pointer; opacity: 1; padding: 0; }
          .swiper-pagination-bullet:hover { background: rgba(255,255,255,0.5); }
          .swiper-pagination-bullet-active { background: rgba(255,255,255,0.35); }
          .bullet-track { position: absolute; inset: 0; display: block; }
          .bullet-progress { position: absolute; right: 0; left: auto; top: 0; bottom: 0; width: 8px; background: #ffffff; border-radius: 9999px; }
          .swiper-pagination-bullet.is-active .bullet-progress { animation: sliding var(--slide-interval, 6000ms) linear forwards; transform-origin: right center; }
          @keyframes sliding { from { width: 8px; } to { width: 100%; } }
        `
      }} />
    </section>
  );
}