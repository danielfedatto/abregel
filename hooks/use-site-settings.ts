'use client';

import { useContentful } from '@/hooks/use-contentful';
import { SiteSettings } from '@/types/contentful';

export function useSiteSettings() {
  const { data: siteSettings, loading, error } = useContentful<SiteSettings>('siteSettings', {
    limit: 1,
  });

  if (loading || error || !siteSettings || siteSettings.length === 0) {
    return {
      loading,
      error,
      settings: null
    };
  }

  const settings = siteSettings[0];

  return {
    loading: false,
    error: null,
    settings: {
      siteTitle: settings.fields.siteTitle,
      siteDescription: settings.fields.siteDescription,
      contactEmail: settings.fields.contactEmail,
      contactPhone: settings.fields.contactPhone,
      contactAddress: settings.fields.contactAddress,
      socialLinks: settings.fields.socialLinks,
      newsletterTitle: settings.fields.newsletterTitle,
      newsletterDescription: settings.fields.newsletterDescription,
      logo: settings.fields.logo,
      logoWhite: settings.fields.logoWhite,
      favicon: settings.fields.favicon,
    }
  };
}
