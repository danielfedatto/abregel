#!/usr/bin/env tsx

import { createClient } from 'contentful-management';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Erro: CONTENTFUL_SPACE_ID e CONTENTFUL_MANAGEMENT_TOKEN são obrigatórios');
  process.exit(1);
}

// Cliente de gerenciamento do Contentful
const client = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

// Definir os content types
const contentTypes = [
  {
    id: 'heroSlide',
    name: 'Hero Slide',
    description: 'Slides do banner principal da página inicial',
    fields: [
      {
        id: 'title',
        name: 'Título',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'subtitle',
        name: 'Subtítulo',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'description',
        name: 'Descrição',
        type: 'Text',
        required: false,
        localized: false,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'image',
        name: 'Imagem',
        type: 'Link',
        required: true,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'imageMobile',
        name: 'Imagem Mobile',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'video',
        name: 'Vídeo',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['video'],
          },
        ],
      },
      {
        id: 'poster',
        name: 'Poster do Vídeo',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'type',
        name: 'Tipo de Mídia',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            in: ['image', 'video'],
          },
        ],
      },
      {
        id: 'ctaText',
        name: 'Texto do Botão CTA',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'ctaLink',
        name: 'Link do Botão CTA',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^https?://.*',
              flags: '',
            },
          },
        ],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
  {
    id: 'service',
    name: 'Serviço',
    description: 'Serviços oferecidos pelo sindicato',
    fields: [
      {
        id: 'title',
        name: 'Título do Serviço',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'description',
        name: 'Descrição',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'icon',
        name: 'Ícone (Lucide)',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'image',
        name: 'Imagem do Serviço',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'features',
        name: 'Características',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 100 } }],
        },
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^[a-z0-9-]+$',
              flags: '',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'partner',
    name: 'Parceiro',
    description: 'Parceiros e empresas associadas',
    fields: [
      {
        id: 'name',
        name: 'Nome da Empresa',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'logo',
        name: 'Logo',
        type: 'Link',
        required: true,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'website',
        name: 'Website',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^https?://.*',
              flags: '',
            },
          },
        ],
      },
      {
        id: 'description',
        name: 'Descrição',
        type: 'Text',
        required: false,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'category',
        name: 'Categoria',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
  {
    id: 'newsPost',
    name: 'Notícia',
    description: 'Notícias e artigos do sindicato',
    fields: [
      {
        id: 'title',
        name: 'Título da Notícia',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 150 } }],
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^[a-z0-9-]+$',
              flags: '',
            },
          },
        ],
      },
      {
        id: 'excerpt',
        name: 'Resumo',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'content',
        name: 'Conteúdo',
        type: 'RichText',
        required: true,
        localized: false,
        validations: [
          {
            enabledMarks: ['bold', 'italic', 'underline', 'code'],
          },
          {
            enabledNodeTypes: ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6', 'ordered-list', 'unordered-list', 'hr', 'blockquote', 'table', 'hyperlink'],
          },
        ],
      },
      {
        id: 'featuredImage',
        name: 'Imagem de Destaque',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'author',
        name: 'Autor',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'publishDate',
        name: 'Data de Publicação',
        type: 'Date',
        required: true,
        localized: false,
      },
      {
        id: 'tags',
        name: 'Tags',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 50 } }],
        },
      },
      {
        id: 'category',
        name: 'Categoria',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
    ],
  },
  {
    id: 'faqItem',
    name: 'FAQ',
    description: 'Perguntas frequentes',
    fields: [
      {
        id: 'question',
        name: 'Pergunta',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'answer',
        name: 'Resposta',
        type: 'RichText',
        required: true,
        localized: false,
        validations: [
          {
            enabledMarks: ['bold', 'italic', 'underline'],
          },
          {
            enabledNodeTypes: ['heading-3', 'heading-4', 'ordered-list', 'unordered-list', 'paragraph'],
          },
        ],
      },
      {
        id: 'category',
        name: 'Categoria',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
  {
    id: 'pricingPlan',
    name: 'Plano de Preço',
    description: 'Planos de preço e associações',
    fields: [
      {
        id: 'name',
        name: 'Nome do Plano',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'price',
        name: 'Preço',
        type: 'Number',
        required: true,
        localized: false,
        validations: [{ range: { min: 0 } }],
      },
      {
        id: 'currency',
        name: 'Moeda',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 3 } }],
      },
      {
        id: 'period',
        name: 'Período',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 20 } }],
      },
      {
        id: 'description',
        name: 'Descrição',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'features',
        name: 'Características',
        type: 'Array',
        required: true,
        localized: false,
        items: {
          type: 'Symbol',
          validations: [{ size: { max: 100 } }],
        },
      },
      {
        id: 'isPopular',
        name: 'Plano Popular',
        type: 'Boolean',
        required: false,
        localized: false,
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
      {
        id: 'ctaText',
        name: 'Texto do Botão',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'ctaLink',
        name: 'Link do Botão',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^https?://.*',
              flags: '',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'testimonial',
    name: 'Depoimento',
    description: 'Depoimentos de clientes e associados',
    fields: [
      {
        id: 'name',
        name: 'Nome',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'role',
        name: 'Cargo/Função',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'company',
        name: 'Empresa',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'content',
        name: 'Depoimento',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'avatar',
        name: 'Avatar',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'rating',
        name: 'Avaliação',
        type: 'Integer',
        required: false,
        localized: false,
        validations: [{ range: { min: 1, max: 5 } }],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
  {
    id: 'director',
    name: 'Diretor',
    description: 'Membros da diretoria',
    fields: [
      {
        id: 'name',
        name: 'Nome Completo',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'role',
        name: 'Cargo',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'company',
        name: 'Empresa',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'bio',
        name: 'Biografia',
        type: 'Text',
        required: false,
        localized: false,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'photo',
        name: 'Foto',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
  {
    id: 'siteSettings',
    name: 'Configurações do Site',
    description: 'Configurações gerais do site',
    fields: [
      {
        id: 'siteTitle',
        name: 'Título do Site',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'siteDescription',
        name: 'Descrição do Site',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'logo',
        name: 'Logo Principal',
        type: 'Link',
        required: true,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'logoWhite',
        name: 'Logo Branca',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'favicon',
        name: 'Favicon',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'contactEmail',
        name: 'Email de Contato',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^[^@]+@[^@]+\\.[^@]+$',
              flags: '',
            },
          },
        ],
      },
      {
        id: 'contactPhone',
        name: 'Telefone de Contato',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'contactAddress',
        name: 'Endereço',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 200 } }],
      },
      {
        id: 'socialLinks',
        name: 'Redes Sociais',
        type: 'Object',
        required: false,
        localized: false,
      },
      {
        id: 'newsletterTitle',
        name: 'Título da Newsletter',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'newsletterDescription',
        name: 'Descrição da Newsletter',
        type: 'Text',
        required: false,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
    ],
  },
  {
    id: 'aboutSection',
    name: 'Seção Quem Somos',
    description: 'Seção sobre a empresa/sindicato na homepage',
    fields: [
      {
        id: 'title',
        name: 'Título',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 100 } }],
      },
      {
        id: 'subtitle',
        name: 'Subtítulo',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'description',
        name: 'Descrição',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 500 } }],
      },
      {
        id: 'ctaText',
        name: 'Texto do Botão',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ size: { max: 50 } }],
      },
      {
        id: 'ctaLink',
        name: 'Link do Botão',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^https?://.*',
              flags: '',
            },
          },
        ],
      },
      {
        id: 'mission',
        name: 'Missão',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'vision',
        name: 'Visão',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'values',
        name: 'Valores',
        type: 'Text',
        required: true,
        localized: false,
        validations: [{ size: { max: 300 } }],
      },
      {
        id: 'image',
        name: 'Imagem',
        type: 'Link',
        required: false,
        localized: false,
        linkType: 'Asset',
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'order',
        name: 'Ordem',
        type: 'Integer',
        required: true,
        localized: false,
        validations: [{ range: { min: 1 } }],
      },
    ],
  },
];

async function updateHeroSlideContentType() {
  try {
    console.log('🔄 Atualizando Hero Slide Content Type...');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    
    // Buscar o content type existente
    const contentType = await environment.getContentType('heroSlide');
    
    // Verificar se o campo imageMobile já existe
    const existingFields = contentType.fields.map(field => field.id);
    if (existingFields.includes('imageMobile')) {
      console.log('✅ Campo "imageMobile" já existe no Hero Slide');
      return;
    }
    
    // Adicionar o novo campo
    const newField = {
      id: 'imageMobile',
      name: 'Imagem Mobile',
      type: 'Link',
      required: false,
      localized: false,
      linkType: 'Asset',
      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],
    };
    
    // Adicionar o campo ao content type
    contentType.fields.push(newField);
    
    // Salvar as mudanças
    const updatedContentType = await contentType.update();
    await updatedContentType.publish();
    
    console.log('✅ Campo "imageMobile" adicionado ao Hero Slide com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao atualizar Hero Slide:', error);
  }
}

async function createContentTypes() {
  try {
    console.log('🚀 Iniciando configuração do Contentful...');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    
    console.log(`✅ Conectado ao Space: ${space.name}`);
    console.log(`✅ Usando Environment: ${environment.name}`);
    
    for (const contentTypeDef of contentTypes) {
      try {
        console.log(`\n📝 Criando Content Type: ${contentTypeDef.name}...`);
        
        // Verificar se já existe
        try {
          await environment.getContentType(contentTypeDef.id);
          console.log(`⚠️  Content Type "${contentTypeDef.name}" já existe, pulando...`);
          continue;
        } catch {
          // Content type não existe, continuar com a criação
        }
        
        
        
        console.log(`✅ Content Type "${contentTypeDef.name}" criado e publicado com sucesso!`);
      } catch (error) {
        console.error(`❌ Erro ao criar Content Type "${contentTypeDef.name}":`, error);
      }
    }
    
    console.log('\n🎉 Configuração concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Acesse o Contentful e verifique os Content Types criados');
    console.log('2. Configure as permissões em Settings > Roles & Permissions');
    console.log('3. Crie conteúdo de exemplo para cada Content Type');
    console.log('4. Teste a integração no seu projeto');
    
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error);
    process.exit(1);
  }
}

// Executar o script
async function main() {
  await updateHeroSlideContentType();
  await createContentTypes();
}

main();
