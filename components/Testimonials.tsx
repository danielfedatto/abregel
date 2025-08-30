import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-primary">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Depoimentos</h2>
          <p className="section-subtitle mx-auto max-w-2xl text-white/90">
            O que nossos associados dizem sobre o Sindicato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure key={t.id} className="bg-card border border-border/50 rounded-2xl p-6 card-hover h-full flex flex-col">
              <blockquote className="text-card-foreground leading-relaxed mb-6 grow">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border/60">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
