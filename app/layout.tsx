import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import Providers from '@/components/Providers';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Sindicato Industrial - Fortalecendo o Setor Há 35 Anos',
  description: 'Representamos e defendemos os interesses do setor industrial brasileiro, promovendo desenvolvimento sustentável e competitividade empresarial.',
  keywords: 'sindicato, industrial, representação, empresas, desenvolvimento, sustentabilidade',
  authors: [{ name: 'Sindicato Industrial' }],
  openGraph: {
    title: 'Sindicato Industrial',
    description: 'Fortalecendo o setor industrial brasileiro há mais de 35 anos',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}