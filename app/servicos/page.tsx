import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ContentfulServicesPage from '@/components/ContentfulServicesPage';

export const metadata = {
  title: 'Serviços - Sindicato Industrial',
  description: 'Conheça todos os serviços especializados que oferecemos para o desenvolvimento do setor industrial.',
};

export default function ServicosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContentfulServicesPage />
      <ContentfulFooter />
    </div>
  );
}