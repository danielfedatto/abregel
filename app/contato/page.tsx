import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ContentfulContactPage from '@/components/ContentfulContactPage';

export default function Contato() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContentfulContactPage />
      <ContentfulFooter />
    </div>
  );
}