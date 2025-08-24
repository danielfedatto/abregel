import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { posts } from '@/data/posts';

export const metadata = {
  title: 'Notícias - Sindicato Industrial',
  description: 'Acompanhe as últimas notícias e novidades do setor industrial brasileiro.',
};

export default function NoticiasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Notícias
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Mantenha-se atualizado com as principais novidades 
              e tendências do setor industrial.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}