import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ContentfulAboutHero from '@/components/ContentfulAboutHero';
import ContentfulMissionVisionValues from '@/components/ContentfulMissionVisionValues';
import ContentfulDirectors from '@/components/ContentfulDirectors';
import ContentfulNumbersSection from '@/components/ContentfulNumbersSection';
import ContentfulAboutCTA from '@/components/ContentfulAboutCTA';

export default function QuemSomos() {

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <ContentfulAboutHero />

      {/* Missão, Visão e Valores */}
      <ContentfulMissionVisionValues />

      {/* Diretoria */}
      <ContentfulDirectors />

      {/* Números */}
      <ContentfulNumbersSection />

      {/* CTA */}
      <ContentfulAboutCTA />

      <ContentfulFooter />
    </div>
  );
}