import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />;
    case 'twitter':
      return <Twitter className="w-5 h-5" />;
    case 'youtube':
      return <Youtube className="w-5 h-5" />;
    default:
      return null;
  }
}
