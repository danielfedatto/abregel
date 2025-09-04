import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Montserrat } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import Providers from '@/components/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import './globals.css';
import NewsletterModal from '@/components/NewsletterModal'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'

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
  applicationName: 'Abregel',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-196x196.png', sizes: '196x196', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
    ],
  },
  other: {
    'msapplication-TileColor': '#FFFFFF',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-square70x70logo': '/mstile-70x70.png',
    'msapplication-square150x150logo': '/mstile-150x150.png',
    'msapplication-wide310x150logo': '/mstile-310x150.png',
    'msapplication-square310x310logo': '/mstile-310x310.png',
  },
};

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
        <NewsletterModal />
        <WhatsAppButton />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}