import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Todos os componentes Contentful
import ContentfulHeroSlider from '@/components/ContentfulHeroSlider';
import ContentfulServices from '@/components/ContentfulServices';
import ContentfulPartners from '@/components/ContentfulPartners';
import ContentfulTestimonials from '@/components/ContentfulTestimonials';
import ContentfulFAQ from '@/components/ContentfulFAQ';
import ContentfulPricingPlans from '@/components/ContentfulPricingPlans';
import ContentfulNews from '@/components/ContentfulNews';
import ContentfulDirectors from '@/components/ContentfulDirectors';
import ContentfulEvents from '@/components/ContentfulEvents';
import ContentfulDownloads from '@/components/ContentfulDownloads';
import ContentfulSiteSettings from '@/components/ContentfulSiteSettings';
import ContentfulPages from '@/components/ContentfulPages';
import ContentfulPageSections from '@/components/ContentfulPageSections';
import ContentfulNavigationMenus from '@/components/ContentfulNavigationMenus';

export default function ContentfulDemoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Página de demonstração dos componentes Contentful */}
      <div className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            🚀 Demonstração Contentful
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Esta página demonstra todos os componentes que consomem dados do Contentful.
            Cada seção abaixo é renderizada dinamicamente com dados reais do CMS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              14 Componentes
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Dados Dinâmicos
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              CMS Headless
            </span>
          </div>
        </div>
      </div>

      {/* 1. Hero Slider */}
      <ContentfulHeroSlider />

      {/* 2. Serviços */}
      <ContentfulServices />

      {/* 3. Parceiros */}
      <ContentfulPartners />

      {/* 4. Depoimentos */}
      <ContentfulTestimonials />

      {/* 5. FAQ */}
      <ContentfulFAQ />

      {/* 6. Planos de Preço */}
      <ContentfulPricingPlans />

      {/* 7. Notícias */}
      <ContentfulNews />

      {/* 8. Diretores */}
      <ContentfulDirectors />

      {/* 9. Eventos */}
      <ContentfulEvents />

      {/* 10. Downloads */}
      <ContentfulDownloads />

      {/* 11. Configurações do Site */}
      <ContentfulSiteSettings />

      {/* 12. Páginas */}
      <ContentfulPages />

      {/* 13. Seções de Página */}
      <ContentfulPageSections />

      {/* 14. Menus de Navegação */}
      <ContentfulNavigationMenus />

      {/* Seção de informações técnicas */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            🛠️ Tecnologias Utilizadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Radix UI Components</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">CMS</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Contentful Headless CMS</li>
                <li>• Content Delivery API</li>
                <li>• Rich Text Rendering</li>
                <li>• Asset Management</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Integração</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Custom React Hooks</li>
                <li>• TypeScript Types</li>
                <li>• Error Handling</li>
                <li>• Loading States</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

