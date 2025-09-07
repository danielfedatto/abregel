import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Montserrat } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from '@/components/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import './globals.css';
import NewsletterModal from '@/components/NewsletterModal'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

// Função para gerar metadata dinâmica
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Verificar se as variáveis de ambiente estão disponíveis
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      throw new Error('Variáveis de ambiente do Contentful não encontradas');
    }

    const { createClient } = await import('contentful');
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'siteSettings',
      limit: 1,
    });

    if (entries.items.length === 0) {
      // Fallback para metadata estática
      return {
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
        applicationName: 'Sindicato Industrial',
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
    }

    const settings = entries.items[0] as any;
    const siteTitle = settings.fields.siteTitle || 'Sindicato Industrial';
    const siteDescription = settings.fields.siteDescription || 'Representamos e defendemos os interesses do setor industrial brasileiro.';

    return {
      title: siteTitle,
      description: siteDescription,
      keywords: 'sindicato, industrial, representação, empresas, desenvolvimento, sustentabilidade',
      authors: [{ name: siteTitle }],
      openGraph: {
        title: siteTitle,
        description: siteDescription,
        type: 'website',
        locale: 'pt_BR',
      },
      applicationName: siteTitle,
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
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);
    // Fallback para metadata estática em caso de erro
    return {
      title: 'Sindicato Industrial - Fortalecendo o Setor Há 35 Anos',
      description: 'Representamos e defendemos os interesses do setor industrial brasileiro, promovendo desenvolvimento sustentável e competitividade empresarial.',
    };
  }
}

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
          <SiteSettingsProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SiteSettingsProvider>
        </Providers>
        <NewsletterModal />
        <WhatsAppButton />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}