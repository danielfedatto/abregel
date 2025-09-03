'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Download as DownloadType } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, Image, Video, Archive, ExternalLink, Eye, Calendar } from 'lucide-react';

export default function ContentfulDownloads() {
  const { data: downloads, loading, error } = useContentful<DownloadType>('download', {
    limit: 12,
    order: ['-fields.uploadDate'],
  });

  // Função para obter o ícone baseado no tipo de arquivo
  const getFileIcon = (fileName: string) => {
    const type = fileName.toLowerCase().split('.').pop() || '';
    if (type.includes('pdf') || type.includes('doc')) return <FileText className="w-6 h-6" />;
    if (type.includes('jpg') || type.includes('png') || type.includes('gif')) return <Image className="w-6 h-6" />;
    if (type.includes('mp4') || type.includes('avi') || type.includes('mov')) return <Video className="w-6 h-6" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando arquivos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !downloads || downloads.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Downloads
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum arquivo encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Agrupar downloads por categoria
  const groupedDownloads = downloads.reduce((acc, download) => {
    const category = download.fields.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(download);
    return acc;
  }, {} as Record<string, DownloadType[]>);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Downloads
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acesse documentos, formulários e materiais importantes
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant="default"
            size="sm"
            className="bg-primary-500 hover:bg-primary-600"
          >
            Todos
          </Button>
          {Object.keys(groupedDownloads).map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="hover:bg-primary-50 hover:border-primary-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Downloads agrupados por categoria */}
        {Object.entries(groupedDownloads).map(([category, categoryDownloads]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryDownloads.map((download) => (
                <Card key={download.sys.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                                         {/* Ícone do tipo de arquivo */}
                     <div className="flex items-center justify-between mb-3">
                       <div className="p-3 bg-primary-100 rounded-lg text-primary-600 group-hover:bg-primary-200 transition-colors duration-300">
                         {getFileIcon(download.fields.file.fields.file.fileName || download.fields.title)}
                       </div>
                     </div>

                    {/* Título */}
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                      {download.fields.title}
                    </CardTitle>

                    {/* Descrição */}
                    {download.fields.description && (
                      <CardDescription className="text-gray-600 line-clamp-2">
                        {download.fields.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                                         {/* Informações do arquivo */}
                     <div className="space-y-2 mb-4 text-sm text-gray-600">
                       {download.fields.file.fields.file.details?.size && (
                         <div className="flex items-center justify-between">
                           <span>Tamanho:</span>
                           <span className="font-medium">{formatFileSize(download.fields.file.fields.file.details.size)}</span>
                         </div>
                       )}
                       
                       {download.fields.file.fields.file.contentType && (
                         <div className="flex items-center justify-between">
                           <span>Tipo:</span>
                           <span className="font-medium uppercase">{download.fields.file.fields.file.contentType}</span>
                         </div>
                       )}
                       
                       {download.fields.downloadCount && (
                         <div className="flex items-center gap-2">
                           <Download className="w-4 h-4" />
                           <span>{download.fields.downloadCount} downloads</span>
                         </div>
                       )}
                     </div>

                     {/* Botões de ação */}
                     <div className="flex gap-2">
                       {download.fields.file.fields.file.url && (
                         <Button
                           size="sm"
                           className="flex-1 bg-primary-500 hover:bg-primary-600"
                           asChild
                         >
                           <a
                             href={`https:${download.fields.file.fields.file.url}`}
                             download={download.fields.title}
                             target="_blank"
                             rel="noopener noreferrer"
                           >
                             <Download className="w-4 h-4 mr-2" />
                             Baixar
                           </a>
                         </Button>
                       )}
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Estatísticas */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {downloads.length}
              </div>
              <div className="text-gray-600">Arquivos disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {Object.keys(groupedDownloads).length}
              </div>
              <div className="text-gray-600">Categorias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                                 {downloads.length}
              </div>
              <div className="text-gray-600">Novos arquivos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
