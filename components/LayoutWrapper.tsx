'use client';

import { useSiteSettings } from '@/hooks/use-site-settings';
import { getImageUrl } from '@/lib/contentful';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { settings, loading } = useSiteSettings();

  // Atualizar o título da página se as configurações estiverem carregadas
  if (!loading && settings) {
    document.title = settings.siteTitle;
    
    // Atualizar meta description se existir
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && settings.siteDescription) {
      metaDescription.setAttribute('content', settings.siteDescription);
    }
  }

  return <>{children}</>;
}
