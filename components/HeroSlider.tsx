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
          el: '.hero-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active',
        }}
        loop={true}
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
                  {/* Text Content */}
                  {/* <div className="text-center lg:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                      {slide.subtitle}
                    </p>
                    {slide.cta && (
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href={slide.cta.href} className="btn-primary group">
                          {slide.cta.text}
                          <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link href="/contato" className="btn-secondary">
                          Fale Conosco
                        </Link>
                      </div>
                    )}
                  </div> */}

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

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3" />

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
          .hero-bullet {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .hero-bullet-active {
            background: white;
            transform: scale(1.2);
          }
        `
      }} />
    </section>
  );
}