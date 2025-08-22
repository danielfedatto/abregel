import Link from 'next/link';
import { ChevronRight, Shield, GraduationCap, Lightbulb, Users, Calendar, Megaphone } from 'lucide-react';
import { Service } from '@/data/services';

const iconMap = {
  Shield,
  GraduationCap,
  Lightbulb,
  Users,
  Calendar,
  Megaphone,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <div className="group bg-card rounded-2xl p-6 card-hover border border-border/50">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
        <IconComponent className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {service.desc}
      </p>
      
      <Link 
        href={service.href}
        className="inline-flex items-center text-primary font-medium link-hover group-hover:text-primary-700 transition-colors duration-300"
      >
        Saiba mais
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}