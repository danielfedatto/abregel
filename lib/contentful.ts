import { createClient } from 'contentful';

// Função para criar cliente Contentful com validação
function createContentfulClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId || !accessToken) {
    console.warn('Variáveis de ambiente do Contentful não encontradas');
    // Retorna um cliente mock para evitar erros durante o build
    return {
      getEntries: () => Promise.resolve({ items: [] }),
      getEntry: () => Promise.resolve(null),
    } as any;
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    environment: environment,
  });
}

// Configuração do cliente Contentful
export const contentfulClient = createContentfulClient();

// Tipos para os campos do Contentful
export interface ContentfulImage {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: ContentfulImage['fields'];
}

// Função para obter URL da imagem
export function getImageUrl(image: ContentfulImage): string {
  return `https:${image?.fields?.file?.url}`;
}

// Função para obter URL do vídeo

// Função utilitária para extrair ID do YouTube de qualquer URL
export function extractYouTubeId(url: string): string {
  if (!url) return '';
  
  // Extrair ID do YouTube de diferentes formatos de URL
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  
  return match ? match[1] : '';
}

export function getVideoId(video: string): string {
  const videoUrl = video;
  if (!videoUrl) return '';
  return extractYouTubeId(videoUrl);
}


// Função para obter URL da imagem com parâmetros
export function getImageUrlWithParams(
  image: ContentfulImage,
  width?: number,
  height?: number,
  quality?: number
): string {
  let url = `https:${image.fields.file.url}`;
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  return url;
}

// Função para formatar data do Contentful
export function formatContentfulDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Função para extrair texto rico do Contentful e converter para HTML
export function extractRichText(richText: any): string {
  if (!richText || !richText.content || !Array.isArray(richText.content)) return '';
  
  const html = richText.content
    .map((node: any) => processNode(node))
    .filter((html: string) => html.trim() !== '') // Remove nós vazios
    .join('')
    .trim();
  
  // Garantir que o HTML tenha pelo menos uma estrutura básica
  return html || '';
}

// Função para processar cada nó do Rich Text
function processNode(node: any): string {
  if (!node) return '';
  
  switch (node.nodeType) {
    case 'paragraph':
      const paragraphContent = processContent(node.content);
      // Só renderizar parágrafo se houver conteúdo
      return paragraphContent.trim() ? `<p class="mb-4 leading-relaxed">${paragraphContent}</p>` : '';
    
    case 'heading-1':
      return `<h1 class="text-3xl font-bold mb-4 mt-6">${processContent(node.content)}</h1>`;
    
    case 'heading-2':
      return `<h2 class="text-2xl font-bold mb-3 mt-5">${processContent(node.content)}</h2>`;
    
    case 'heading-3':
      return `<h3 class="text-xl font-semibold mb-2 mt-4">${processContent(node.content)}</h3>`;
    
    case 'heading-4':
      return `<h4 class="text-lg font-semibold mb-2 mt-3">${processContent(node.content)}</h4>`;
    
    case 'heading-5':
      return `<h5 class="text-base font-semibold mb-2 mt-3">${processContent(node.content)}</h5>`;
    
    case 'heading-6':
      return `<h6 class="text-sm font-semibold mb-2 mt-3">${processContent(node.content)}</h6>`;
    
    case 'unordered-list':
      return `<ul class="list-disc list-inside mb-4 space-y-1">${node.content.map((item: any) => processNode(item)).join('')}</ul>`;
    
    case 'ordered-list':
      return `<ol class="list-decimal list-inside mb-4 space-y-1">${node.content.map((item: any) => processNode(item)).join('')}</ol>`;
    
    case 'list-item':
      return `<li class="leading-relaxed">${processContent(node.content)}</li>`;
    
    case 'blockquote':
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/50 rounded-r">${processContent(node.content)}</blockquote>`;
    
    case 'hr':
      return `<hr class="my-6 border-border">`;
    
    case 'hyperlink':
      const url = node.data?.uri || '#';
      return `<a href="${url}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${processContent(node.content)}</a>`;
    
    case 'entry-hyperlink':
      // Para links internos, você pode implementar lógica específica
      return `<a href="#" class="text-primary hover:underline">${processContent(node.content)}</a>`;
    
    case 'asset-hyperlink':
      // Para links de assets
      const assetUrl = node.data?.target?.fields?.file?.url;
      if (assetUrl) {
        return `<a href="https:${assetUrl}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${processContent(node.content)}</a>`;
      }
      return processContent(node.content);
    
    case 'embedded-asset-block':
      const asset = node.data?.target;
      if (asset?.fields?.file?.contentType?.startsWith('image/')) {
        const imageUrl = `https:${asset.fields.file.url}`;
        const alt = asset.fields.title || asset.fields.description || '';
        return `<figure class="my-6"><img src="${imageUrl}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" /><figcaption class="text-sm text-muted-foreground mt-2 text-center">${alt}</figcaption></figure>`;
      }
      return '';
    
    case 'embedded-entry-block':
      // Para entradas embarcadas, você pode implementar lógica específica
      return `<div class="my-4 p-4 border border-border rounded-lg bg-muted/30">${processContent(node.content)}</div>`;
    
    default:
      // Para outros tipos de nó, tentar processar o conteúdo
      if (node.content) {
        return processContent(node.content);
      }
      return '';
  }
}

// Função para processar o conteúdo de um nó (texto com formatação)
function processContent(content: any[]): string {
  if (!content || !Array.isArray(content)) return '';
  
  return content
    .map((item: any) => {
      if (item.nodeType === 'text') {
        let text = item.value || '';
        
        // Se o texto estiver vazio, retornar string vazia
        if (!text.trim()) return '';
        
        // Aplicar formatação
        if (item.marks && Array.isArray(item.marks)) {
          item.marks.forEach((mark: any) => {
            switch (mark.type) {
              case 'bold':
                text = `<strong>${text}</strong>`;
                break;
              case 'italic':
                text = `<em>${text}</em>`;
                break;
              case 'underline':
                text = `<u>${text}</u>`;
                break;
              case 'code':
                text = `<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">${text}</code>`;
                break;
              case 'superscript':
                text = `<sup>${text}</sup>`;
                break;
              case 'subscript':
                text = `<sub>${text}</sub>`;
                break;
            }
          });
        }
        
        return text;
      }
      
      // Se não for texto, processar como nó
      return processNode(item);
    })
    .filter((html: string) => html.trim() !== '') // Remove conteúdo vazio
    .join('');
}
