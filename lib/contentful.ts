import { createClient } from 'contentful';

// Configuração do cliente Contentful
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

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
  return `https:${image.fields.file.url}`;
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

// Função para extrair texto rico do Contentful
export function extractRichText(richText: any): string {
  if (!richText || !richText.content) return '';
  
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph') {
        return node.content
          .map((content: any) => content.value || '')
          .join(' ');
      }
      return '';
    })
    .join('\n')
    .trim();
}
