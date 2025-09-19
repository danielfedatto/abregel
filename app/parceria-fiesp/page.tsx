import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ContentfulFiespPage from '@/components/ContentfulFiespPage';

export const metadata = {
  title: 'Parceria FIESP - Sindicato Industrial',
  description: 'Conheça os benefícios da parceria estratégica entre o Sindicato Industrial e a FIESP.',
};

export default function ParceriaFiespPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContentfulFiespPage />
      <ContentfulFooter />
    </div>
  );
}