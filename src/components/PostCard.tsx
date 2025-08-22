import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Post } from '@/data/posts';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <article className="group bg-card rounded-2xl overflow-hidden card-hover border border-border/50">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {post.tag}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(post.date)}
        </div>
        
        <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/noticias/${post.slug}`}
          className="inline-flex items-center text-primary font-medium link-hover group-hover:text-primary-700 transition-colors duration-300"
        >
          Ler mais
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}