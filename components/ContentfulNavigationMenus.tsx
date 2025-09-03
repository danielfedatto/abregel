'use client';

import { useContentful } from '@/hooks/use-contentful';
import { NavigationMenu as NavigationMenuType } from '@/types/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, ExternalLink, Eye, Settings, ChevronRight, Link } from 'lucide-react';

export default function ContentfulNavigationMenus() {
  const { data: navigationMenus, loading, error } = useContentful<NavigationMenuType>('navigationMenu', {
    limit: 10,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Menus de Navegação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando menus...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !navigationMenus || navigationMenus.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Menus de Navegação
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum menu encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Função para renderizar um item de menu recursivamente
  const renderMenuItem = (item: any, level: number = 0) => {
    const indent = level * 20;
    
    return (
      <div key={item.title} className="mb-2">
        <div 
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors duration-200"
          style={{ marginLeft: `${indent}px` }}
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-800">{item.title}</span>
          
          {item.url && (
            <Badge variant="outline" className="text-xs">
              {item.url.startsWith('http') ? 'Externo' : 'Interno'}
            </Badge>
          )}
          
          {item.isActive !== undefined && (
            <Badge 
              variant={item.isActive ? "default" : "secondary"}
              className="text-xs"
            >
              {item.isActive ? 'Ativo' : 'Inativo'}
            </Badge>
          )}
        </div>
        
        {/* Subitens */}
        {item.children && item.children.length > 0 && (
          <div className="ml-4">
            {item.children.map((child: any) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Menus de Navegação
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estrutura e organização dos menus do site
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {navigationMenus.map((menu) => (
            <Card key={menu.sys.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                {/* Cabeçalho do menu */}
                <div className="flex items-center justify-between mb-3">
                                       <div className="flex items-center gap-2">
                       <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                         <Menu className="w-5 h-5" />
                       </div>
                       <Badge variant="secondary">
                         Menu
                       </Badge>
                     </div>
                  
                                   </div>

                 {/* Título */}
                 <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                   {menu.fields.name}
                 </CardTitle>
               </CardHeader>

               <CardContent className="pt-0">
                 {/* Estrutura do menu */}
                 {menu.fields.items && menu.fields.items.length > 0 && (
                   <div className="mb-6">
                     <h4 className="font-semibold text-gray-800 mb-3">Estrutura do Menu:</h4>
                     <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                       {menu.fields.items.map((item) => renderMenuItem(item))}
                     </div>
                   </div>
                 )}

                 {/* Configurações do menu */}
                 <div className="space-y-3 mb-6 text-sm text-gray-600">
                   <div className="flex items-center justify-between">
                     <span>Total de itens:</span>
                     <span className="font-medium">{menu.fields.items?.length || 0}</span>
                   </div>
                  
                                   </div>

                 {/* Botões de ação */}
                 <div className="flex gap-2">
                   <Button
                     size="sm"
                     variant="outline"
                     className="flex-1"
                   >
                     <Eye className="w-4 h-4 mr-2" />
                     Visualizar Menu
                   </Button>
                   
                   <Button
                     size="sm"
                     variant="ghost"
                     className="px-3"
                   >
                     <Settings className="w-4 h-4" />
                   </Button>
                 </div>
               </CardContent>
             </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {navigationMenus.length}
              </div>
              <div className="text-gray-600">Total de menus</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {navigationMenus.length}
              </div>
              <div className="text-gray-600">Menus disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {navigationMenus.reduce((total, menu) => 
                  total + (menu.fields.items?.length || 0), 0
                )}
              </div>
              <div className="text-gray-600">Total de itens</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
