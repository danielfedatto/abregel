'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useContentful } from '@/hooks/use-contentful';
import { HeroSlide } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function ContentfulHeroSlider() {
  const { data: slides, loading, error } = useContentful<HeroSlide>('heroSlide', {
    limit: 10,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <div className="relative h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Carregando slides...</div>
        </div>
      </div>
    );
  }

  if (error || !slides || slides.length === 0) {
    return (
      <div className="relative h-[600px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">Nenhum slide encontrado</div>
            <div className="text-sm text-gray-400">Verifique o Contentful</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} swiper-pagination-bullet" aria-current="false" aria-label="Ir para slide ${index + 1}"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[600px] md:h-[700px]"
        onInit={(swiper) => {
          // Configurar acessibilidade para paginação
          const paginationEl = swiper.pagination.el;
          if (paginationEl) {
            paginationEl.setAttribute('aria-label', 'Navegação dos slides');
          }
        }}
        onSlideChange={(swiper) => {
          // Atualizar aria-current para acessibilidade
          const bullets = swiper.pagination.bullets;
          bullets.forEach((bullet, index) => {
            bullet.setAttribute('aria-current', index === swiper.realIndex ? 'true' : 'false');
          });
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.sys.id} id={`heroBanner-slide${index + 1}`}>
            <div className="relative w-full h-full">
              {/* Imagem de fundo */}
              <div className="absolute inset-0">
                {slide.fields.imageLink ? (
                  <a
                    href={slide.fields.imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    aria-label={`Ir para ${slide.fields.title}`}
                  >
                    <img
                      src={getImageUrl(slide.fields.image)}
                      alt={slide.fields.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                ) : (
                  <img
                    src={getImageUrl(slide.fields.image)}
                    alt={slide.fields.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Conteúdo do slide */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.fields.title}
                  </h1>
                  
                  {slide.fields.subtitle && (
                    <p className="text-xl md:text-2xl mb-6 text-gray-200">
                      {slide.fields.subtitle}
                    </p>
                  )}
                  
                  {slide.fields.description && (
                    <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                      {slide.fields.description}
                    </p>
                  )}
                  
                  {slide.fields.ctaText && slide.fields.ctaLink && (
                    <a
                      href={slide.fields.ctaLink}
                      className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300"
                    >
                      {slide.fields.ctaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de navegação */}
      <button
        className="swiper-button-prev absolute left-4 top-1/2 transform-translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300"
        aria-label="Slide anterior"
        title="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="sr-only">Slide anterior</span>
      </button>

      <button
        className="swiper-button-next absolute right-4 top-1/2 transform-translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300"
        aria-label="Próximo slide"
        title="Próximo slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="sr-only">Próximo slide</span>
      </button>
    </div>
  );
}
