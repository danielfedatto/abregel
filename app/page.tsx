import Link from 'next/link';
import { Users, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Componentes Contentful
import HeroSlider from '@/components/HeroSlider';
import ContentfulAboutSection from '@/components/ContentfulAboutSection';
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

      {/* Quem Somos Section do Contentful */}
      <ContentfulAboutSection />

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
