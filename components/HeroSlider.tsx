'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

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
    <section className="relative h-screen md:h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
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
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
          const delay = typeof swiper.params.autoplay === 'object' ? (swiper.params.autoplay as any).delay : 6000;
          el.style.setProperty('--slide-interval', `${delay}ms`);
          
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
        onAutoplayStart={(swiper) => {
          const el = swiper.pagination?.el as HTMLElement | null;
          if (el) {
            const active = el.querySelector('.swiper-pagination-bullet-active');
            if (active) {
              const prog = active.querySelector('.bullet-progress') as HTMLElement | null;
              if (prog) {
                prog.style.animation = 'none';
                prog.offsetHeight;
                prog.style.animation = '';
              }
            }
          }
        }}
        onAutoplayStop={(swiper) => {
          const el = swiper.pagination?.el as HTMLElement | null;
          if (el) {
            const active = el.querySelector('.swiper-pagination-bullet-active');
            if (active) {
              const prog = active.querySelector('.bullet-progress') as HTMLElement | null;
              if (prog) {
                prog.style.animationPlayState = 'paused';
              }
            }
          }
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
                  className="w-full h-full object-cover scale-110 md:scale-125 blur-xl md:blur-3xl brightness-75"
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
                  className="w-full h-full object-cover scale-110 md:scale-125 blur-xl md:blur-3xl brightness-75"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 " />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-4 md:px-0">
              <div className="container-section">
                <div className="items-center w-full">

                  {/* Media Content */}
                  <div className="flex justify-center lg:justify-end w-full">
                    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-none mx-auto lg:mx-0">
                      <div className="aspect-[4/5] md:aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-white/10 backdrop-blur-sm">
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

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50">
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50">
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 hidden lg:block">
        <div className="animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-white/70 rounded-full mt-1.5 md:mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .swiper-pagination { display: flex; gap: 8px; align-items: center; justify-content: center; }
          
          @media (min-width: 768px) {
            .swiper-pagination { gap: 12px; }
          }
          .swiper-pagination-bullets { bottom: 1rem !important; }
          .swiper-pagination-bullet { position: relative; width: 40px; height: 3px; border-radius: 9999px; background: rgba(255,255,255,0.35); overflow: hidden; cursor: pointer; opacity: 1; padding: 0; }
          
          @media (min-width: 768px) {
            .swiper-pagination-bullets { bottom: 2rem !important; }
            .swiper-pagination-bullet { width: 56px; height: 4px; }
          }
          .swiper-pagination-bullet:hover { background: rgba(255,255,255,0.5); }
          .swiper-pagination-bullet-active { background: rgba(255,255,255,0.35); }
          .bullet-track { position: absolute; inset: -8px; display: block; }
          .bullet-progress { position: absolute; right: 0; left: auto; top: 0; bottom: 0; width: 8px; background: #ffffff; border-radius: 9999px; }
          .swiper-pagination-bullet.is-active .bullet-progress { animation: sliding var(--slide-interval, 6000ms) linear forwards; transform-origin: right center; }
          @keyframes sliding { from { width: 8px; } to { width: 100%; } }
          
          /* Hide default Swiper navigation buttons */
          .swiper-button-next:after,
          .swiper-button-prev:after {
            display: none;
          }
          
          /* Custom navigation button styles */
          .swiper-button-next,
          .swiper-button-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
            z-index: 10;
          }
          
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
          }
          
          .swiper-button-next {
            right: 16px;
          }
          
          .swiper-button-prev {
            left: 16px;
          }
          
          /* Hide navigation on mobile */
          @media (max-width: 768px) {
            .swiper-button-next,
            .swiper-button-prev {
              display: none;
            }
          }
          
          /* Mobile-specific media adjustments */
          @media (max-width: 768px) {
            .swiper-slide .aspect-\[4\/5\] {
              max-height: 70vh;
            }
          }
        `
      }} />
    </section>
  );
}