import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Users, Building, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Componentes Contentful
import HeroSlider from '@/components/HeroSlider';
import ContentfulServices from '@/components/ContentfulServices';
import ContentfulTestimonials from '@/components/ContentfulTestimonials';
import ContentfulPricingPlans from '@/components/ContentfulPricingPlans';
import ContentfulPartners from '@/components/ContentfulPartners';
import ContentfulNews from '@/components/ContentfulNews';
import ContentfulFAQ from '@/components/ContentfulFAQ';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Slider do Contentful */}
      <HeroSlider />

      {/* Quem Somos Section */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Quem Somos</h2>
              <p className="section-subtitle mb-6">
                Há mais de 35 anos representando e fortalecendo o setor industrial brasileiro, 
                construindo um futuro sustentável e próspero para nossas empresas associadas.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Somos uma instituição sólida que atua na defesa dos interesses do setor, 
                oferecendo serviços especializados, capacitação profissional e representação 
                institucional junto aos órgãos competentes.
              </p>
              <Link href="/quem-somos" className="btn-primary group">
                Conheça Nossa História
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Missão</h3>
                <p className="text-muted-foreground text-sm">
                  Defender e representar os interesses do setor industrial, promovendo seu desenvolvimento sustentável.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Visão</h3>
                <p className="text-muted-foreground text-sm">
                  Ser referência em representação sindical, liderando a transformação do setor industrial.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover sm:col-span-2">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Valores</h3>
                <p className="text-muted-foreground text-sm">
                  Transparência, ética, inovação, sustentabilidade e compromisso com o desenvolvimento do setor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section do Contentful */}
      <ContentfulServices />

      {/* Depoimentos Section do Contentful */}
      <ContentfulTestimonials />

      {/* Planos de Associação Section do Contentful */}
      <ContentfulPricingPlans />

      {/* Parcerias Section do Contentful */}
      <ContentfulPartners />

      {/* Notícias Section do Contentful */}
      <ContentfulNews />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Junte-se ao Maior Sindicato Industrial
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Faça parte de uma comunidade que trabalha pelo crescimento 
              sustentável e pela representação forte do setor industrial brasileiro.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">+500 Empresas</h3>
                <p className="text-white/80">Associadas em todo o país</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">35+ Anos</h3>
                <p className="text-white/80">De experiência e tradição</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Dedicação</h3>
                <p className="text-white/80">Ao sucesso dos associados</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-secondary">
                Torne-se Associado
              </Link>
              <Link href="/quem-somos" className="btn-secondary">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section do Contentful */}
      <ContentfulFAQ />

      <Footer />
    </div>
  );
};

export default Index;
