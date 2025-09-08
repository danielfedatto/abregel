import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ContentfulPartnershipsPage from '@/components/ContentfulPartnershipsPage';

export const metadata = {
  title: 'Parcerias - Sindicato Industrial',
  description: 'Conheça nossos parceiros estratégicos e saiba como sua empresa pode se juntar a nossa rede.',
};

export default function ParceriasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContentfulPartnershipsPage />
      <ContentfulFooter />
    </div>
  );
}