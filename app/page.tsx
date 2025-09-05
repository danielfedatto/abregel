import Link from 'next/link';
import { Users, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentfulFooter from '@/components/ContentfulFooter';

// Componentes Contentful
import HeroSlider from '@/components/HeroSlider';
import ContentfulAboutSection from '@/components/ContentfulAboutSection';
import ContentfulServices from '@/components/ContentfulServices';
import ContentfulTestimonials from '@/components/ContentfulTestimonials';
import ContentfulPricingPlans from '@/components/ContentfulPricingPlans';
import ContentfulPartners from '@/components/ContentfulPartners';
import ContentfulNumbersSection from '@/components/ContentfulNumbersSection';
import ContentfulNews from '@/components/ContentfulNews';
import ContentfulFAQ from '@/components/ContentfulFAQ';
import ContentfulCTA from '@/components/ContentfulCTA';

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

      {/* Números Section do Contentful */}
      <ContentfulNumbersSection />

      {/* Notícias Section do Contentful */}
      <ContentfulNews />

      {/* CTA Section */}
      <ContentfulCTA />

      {/* FAQ Section do Contentful */}
      <ContentfulFAQ />

      <ContentfulFooter />
    </div>
  );
};

export default Index;
