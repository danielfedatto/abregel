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

// Função auxiliar para escapar HTML (evita XSS)
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Função para extrair texto rico do Contentful e converter para HTML
export function extractRichText(richText: any): string {
  if (!richText || !Array.isArray(richText.content)) return '';

  const html = richText.content
    .map((node: any) => processNode(node))
    .filter((html: string) => html.trim() !== '') // Remove nós vazios
    .join('')
    .trim();

  return html || '';
}

// Função para processar cada nó do Rich Text
function processNode(node: any): string {
  if (!node) return '';

  switch (node.nodeType) {
    case 'paragraph': {
      const paragraphContent = processContent(node.content);
      return paragraphContent.trim()
        ? `<p class="mb-4 leading-relaxed">${paragraphContent}</p>`
        : '';
    }

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
      return `<ul class="list-disc list-inside mb-4 space-y-1">${
        Array.isArray(node.content) ? node.content.map(processNode).join('') : ''
      }</ul>`;

    case 'ordered-list':
      return `<ol class="list-decimal list-inside mb-4 space-y-1">${
        Array.isArray(node.content) ? node.content.map(processNode).join('') : ''
      }</ol>`;

    case 'list-item':
      return `<li class="leading-relaxed">${processContent(node.content)}</li>`;

    case 'blockquote':
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/50 rounded-r">${processContent(node.content)}</blockquote>`;

    case 'hr':
      return `<hr class="my-6 border-border">`;

    case 'hyperlink': {
      const url = escapeHTML(node.data?.uri || '#');
      return `<a href="${url}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${processContent(node.content)}</a>`;
    }

    case 'entry-hyperlink':
      // Melhor implementar lógica para links internos
      return `<a href="#" class="text-primary hover:underline">${processContent(node.content)}</a>`;

    case 'asset-hyperlink': {
      const assetUrl = node.data?.target?.fields?.file?.url;
      if (assetUrl) {
        return `<a href="https:${escapeHTML(assetUrl)}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${processContent(node.content)}</a>`;
      }
      return processContent(node.content);
    }

    case 'embedded-asset-block': {
      const asset = node.data?.target;
      const file = asset?.fields?.file;
      if (file?.contentType?.startsWith('image/') && file?.url) {
        const imageUrl = `https:${escapeHTML(file.url)}`;
        const alt = escapeHTML(asset.fields.title || asset.fields.description || '');
        const figcaption = alt ? `<figcaption class="text-sm text-muted-foreground mt-2 text-center">${alt}</figcaption>` : '';
        return `<figure class="my-6"><img src="${imageUrl}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" />${figcaption}</figure>`;
      }
      return '';
    }

    case 'embedded-entry-block':
      return `<div class="my-4 p-4 border border-border rounded-lg bg-muted/30">${processContent(node.content)}</div>`;

    default:
      if (Array.isArray(node.content)) {
        return processContent(node.content);
      }
      console.warn(`RichText: nó não suportado -> ${node.nodeType}`, node);
      return '';
  }
}

// Função para processar o conteúdo de um nó (texto com formatação)
function processContent(content: any[]): string {
  if (!Array.isArray(content)) return '';

  return content
    .map((item: any) => {
      if (item.nodeType === 'text') {
        let text = escapeHTML(item.value || '');

        if (!text.trim()) return '';

        // Aplicar formatações em ordem fixa para consistência
        const marks = Array.isArray(item.marks) ? item.marks.map((m) => m.type) : [];

        if (marks.includes('bold')) text = `<strong>${text}</strong>`;
        if (marks.includes('italic')) text = `<em>${text}</em>`;
        if (marks.includes('underline')) text = `<u>${text}</u>`;
        if (marks.includes('code'))
          text = `<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">${text}</code>`;
        if (marks.includes('superscript')) text = `<sup>${text}</sup>`;
        if (marks.includes('subscript')) text = `<sub>${text}</sub>`;

        return text;
      }

      return processNode(item);
    })
    .filter((html: string) => html.trim() !== '')
    .join('');
}