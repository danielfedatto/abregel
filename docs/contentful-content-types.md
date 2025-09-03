# 📋 Content Types do Contentful

## 🎯 Visão Geral

Este documento define todos os Content Types que precisam ser criados no Contentful para o funcionamento completo do website do Sindicato Conecta.

## 🏗️ Estrutura dos Content Types

### **1. Hero Slide** (`heroSlide`)

**Descrição**: Slides do banner principal da página inicial

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título"
  - Validação: Máximo 100 caracteres
  
- **subtitle** (Text, Short text, Optional)
  - Nome: "Subtítulo"
  - Validação: Máximo 200 caracteres
  
- **description** (Text, Long text, Optional)
  - Nome: "Descrição"
  - Validação: Máximo 500 caracteres
  
- **image** (Media, Single media, Required)
  - Nome: "Imagem"
  - Validação: Apenas imagens (jpg, png, webp)
  
- **video** (Media, Single media, Optional)
  - Nome: "Vídeo"
  - Validação: Apenas vídeos (mp4, webm)
  
- **poster** (Media, Single media, Optional)
  - Nome: "Poster do Vídeo"
  - Validação: Apenas imagens
  
- **type** (Symbol, Required)
  - Nome: "Tipo de Mídia"
  - Validação: Valores permitidos: "image", "video"
  
- **ctaText** (Text, Short text, Optional)
  - Nome: "Texto do Botão CTA"
  - Validação: Máximo 50 caracteres
  
- **ctaLink** (Text, Short text, Optional)
  - Nome: "Link do Botão CTA"
  - Validação: URL válida
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo

---

### **2. Service** (`service`)

**Descrição**: Serviços oferecidos pelo sindicato

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título do Serviço"
  - Validação: Máximo 100 caracteres
  
- **description** (Text, Long text, Required)
  - Nome: "Descrição"
  - Validação: Máximo 500 caracteres
  
- **icon** (Text, Short text, Optional)
  - Nome: "Ícone (Lucide)"
  - Validação: Nome do ícone Lucide
  
- **image** (Media, Single media, Optional)
  - Nome: "Imagem do Serviço"
  - Validação: Apenas imagens
  
- **features** (Array, Text items, Optional)
  - Nome: "Características"
  - Validação: Array de textos curtos
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo
  
- **slug** (Text, Short text, Required)
  - Nome: "Slug"
  - Validação: Apenas letras minúsculas, números e hífens

---

### **3. Partner** (`partner`)

**Descrição**: Parceiros e empresas associadas

**Campos**:
- **name** (Text, Short text, Required)
  - Nome: "Nome da Empresa"
  - Validação: Máximo 100 caracteres
  
- **logo** (Media, Single media, Required)
  - Nome: "Logo"
  - Validação: Apenas imagens
  
- **website** (Text, Short text, Optional)
  - Nome: "Website"
  - Validação: URL válida
  
- **description** (Text, Long text, Optional)
  - Nome: "Descrição"
  - Validação: Máximo 300 caracteres
  
- **category** (Text, Short text, Optional)
  - Nome: "Categoria"
  - Validação: Máximo 50 caracteres
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo

---

### **4. News Post** (`newsPost`)

**Descrição**: Notícias e artigos do sindicato

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título da Notícia"
  - Validação: Máximo 150 caracteres
  
- **slug** (Text, Short text, Required)
  - Nome: "Slug"
  - Validação: Apenas letras minúsculas, números e hífens
  
- **excerpt** (Text, Long text, Required)
  - Nome: "Resumo"
  - Validação: Máximo 300 caracteres
  
- **content** (Rich Text, Required)
  - Nome: "Conteúdo"
  - Validação: Conteúdo rico com formatação
  
- **featuredImage** (Media, Single media, Optional)
  - Nome: "Imagem de Destaque"
  - Validação: Apenas imagens
  
- **author** (Text, Short text, Optional)
  - Nome: "Autor"
  - Validação: Máximo 100 caracteres
  
- **publishDate** (Date, Required)
  - Nome: "Data de Publicação"
  - Validação: Data válida
  
- **tags** (Array, Text items, Optional)
  - Nome: "Tags"
  - Validação: Array de textos curtos
  
- **category** (Text, Short text, Optional)
  - Nome: "Categoria"
  - Validação: Máximo 50 caracteres

---

### **5. FAQ Item** (`faqItem`)

**Descrição**: Perguntas frequentes

**Campos**:
- **question** (Text, Short text, Required)
  - Nome: "Pergunta"
  - Validação: Máximo 200 caracteres
  
- **answer** (Rich Text, Required)
  - Nome: "Resposta"
  - Validação: Conteúdo rico
  
- **category** (Text, Short text, Optional)
  - Nome: "Categoria"
  - Validação: Máximo 50 caracteres
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo

---

### **6. Pricing Plan** (`pricingPlan`)

**Descrição**: Planos de preço e associações

**Campos**:
- **name** (Text, Short text, Required)
  - Nome: "Nome do Plano"
  - Validação: Máximo 100 caracteres
  
- **price** (Number, Decimal, Required)
  - Nome: "Preço"
  - Validação: Número positivo com 2 casas decimais
  
- **currency** (Text, Short text, Required)
  - Nome: "Moeda"
  - Validação: Código da moeda (BRL, USD, etc.)
  
- **period** (Text, Short text, Required)
  - Nome: "Período"
  - Validação: "Mensal", "Anual", etc.
  
- **description** (Text, Long text, Required)
  - Nome: "Descrição"
  - Validação: Máximo 300 caracteres
  
- **features** (Array, Text items, Required)
  - Nome: "Características"
  - Validação: Array de textos curtos
  
- **isPopular** (Boolean, Optional)
  - Nome: "Plano Popular"
  - Validação: Verdadeiro/Falso
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo
  
- **ctaText** (Text, Short text, Required)
  - Nome: "Texto do Botão"
  - Validação: Máximo 50 caracteres
  
- **ctaLink** (Text, Short text, Optional)
  - Nome: "Link do Botão"
  - Validação: URL válida

---

### **7. Testimonial** (`testimonial`)

**Descrição**: Depoimentos de clientes e associados

**Campos**:
- **name** (Text, Short text, Required)
  - Nome: "Nome"
  - Validação: Máximo 100 caracteres
  
- **role** (Text, Short text, Required)
  - Nome: "Cargo/Função"
  - Validação: Máximo 100 caracteres
  
- **company** (Text, Short text, Required)
  - Nome: "Empresa"
  - Validação: Máximo 100 caracteres
  
- **content** (Text, Long text, Required)
  - Nome: "Depoimento"
  - Validação: Máximo 500 caracteres
  
- **avatar** (Media, Single media, Optional)
  - Nome: "Avatar"
  - Validação: Apenas imagens
  
- **rating** (Number, Integer, Optional)
  - Nome: "Avaliação"
  - Validação: 1 a 5 estrelas
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo

---

### **8. Director** (`director`)

**Descrição**: Membros da diretoria

**Campos**:
- **name** (Text, Short text, Required)
  - Nome: "Nome Completo"
  - Validação: Máximo 100 caracteres
  
- **role** (Text, Short text, Required)
  - Nome: "Cargo"
  - Validação: Máximo 100 caracteres
  
- **company** (Text, Short text, Required)
  - Nome: "Empresa"
  - Validação: Máximo 100 caracteres
  
- **bio** (Text, Long text, Optional)
  - Nome: "Biografia"
  - Validação: Máximo 500 caracteres
  
- **photo** (Media, Single media, Optional)
  - Nome: "Foto"
  - Validação: Apenas imagens
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo

---

### **9. Site Settings** (`siteSettings`)

**Descrição**: Configurações gerais do site

**Campos**:
- **siteTitle** (Text, Short text, Required)
  - Nome: "Título do Site"
  - Validação: Máximo 100 caracteres
  
- **siteDescription** (Text, Long text, Required)
  - Nome: "Descrição do Site"
  - Validação: Máximo 300 caracteres
  
- **logo** (Media, Single media, Required)
  - Nome: "Logo Principal"
  - Validação: Apenas imagens
  
- **logoWhite** (Media, Single media, Optional)
  - Nome: "Logo Branca"
  - Validação: Apenas imagens
  
- **favicon** (Media, Single media, Optional)
  - Nome: "Favicon"
  - Validação: Apenas imagens (ico, png)
  
- **contactEmail** (Text, Short text, Required)
  - Nome: "Email de Contato"
  - Validação: Email válido
  
- **contactPhone** (Text, Short text, Required)
  - Nome: "Telefone de Contato"
  - Validação: Formato brasileiro
  
- **contactAddress** (Text, Long text, Required)
  - Nome: "Endereço"
  - Validação: Máximo 200 caracteres
  
- **socialLinks** (Object, Optional)
  - Nome: "Redes Sociais"
  - Campos:
    - facebook (Text, URL)
    - twitter (Text, URL)
    - linkedin (Text, URL)
    - instagram (Text, URL)
  
- **newsletterTitle** (Text, Short text, Optional)
  - Nome: "Título da Newsletter"
  - Validação: Máximo 100 caracteres
  
- **newsletterDescription** (Text, Long text, Optional)
  - Nome: "Descrição da Newsletter"
  - Validação: Máximo 300 caracteres

---

### **10. Page** (`page`)

**Descrição**: Páginas dinâmicas do site

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título da Página"
  - Validação: Máximo 100 caracteres
  
- **slug** (Text, Short text, Required)
  - Nome: "Slug"
  - Validação: Apenas letras minúsculas, números e hífens
  
- **content** (Rich Text, Required)
  - Nome: "Conteúdo"
  - Validação: Conteúdo rico
  
- **seoTitle** (Text, Short text, Optional)
  - Nome: "Título SEO"
  - Validação: Máximo 60 caracteres
  
- **seoDescription** (Text, Long text, Optional)
  - Nome: "Descrição SEO"
  - Validação: Máximo 160 caracteres
  
- **featuredImage** (Media, Single media, Optional)
  - Nome: "Imagem de Destaque"
  - Validação: Apenas imagens
  
- **sections** (Array, Reference, Optional)
  - Nome: "Seções"
  - Validação: Referências para PageSection

---

### **11. Page Section** (`pageSection`)

**Descrição**: Seções de páginas dinâmicas

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título da Seção"
  - Validação: Máximo 100 caracteres
  
- **type** (Symbol, Required)
  - Nome: "Tipo de Seção"
  - Validação: "hero", "content", "gallery", "cta", "form"
  
- **content** (Rich Text, Required)
  - Nome: "Conteúdo"
  - Validação: Conteúdo rico
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo
  
- **settings** (Object, Optional)
  - Nome: "Configurações"
  - Validação: Objeto JSON com configurações específicas

---

### **12. Navigation Menu** (`navigationMenu`)

**Descrição**: Menus de navegação

**Campos**:
- **name** (Text, Short text, Required)
  - Nome: "Nome do Menu"
  - Validação: Máximo 100 caracteres
  
- **items** (Array, Object, Required)
  - Nome: "Itens do Menu"
  - Campos:
    - label (Text, Short text)
    - link (Text, Short text)
    - children (Array, Object, Optional)
      - label (Text, Short text)
      - link (Text, Short text)
      - description (Text, Long text, Optional)

---

### **13. Event** (`event`)

**Descrição**: Eventos e encontros

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título do Evento"
  - Validação: Máximo 150 caracteres
  
- **slug** (Text, Short text, Required)
  - Nome: "Slug"
  - Validação: Apenas letras minúsculas, números e hífens
  
- **description** (Text, Long text, Required)
  - Nome: "Descrição"
  - Validação: Máximo 500 caracteres
  
- **startDate** (Date, Required)
  - Nome: "Data de Início"
  - Validação: Data válida
  
- **endDate** (Date, Optional)
  - Nome: "Data de Fim"
  - Validação: Data válida
  
- **location** (Text, Short text, Optional)
  - Nome: "Local"
  - Validação: Máximo 200 caracteres
  
- **image** (Media, Single media, Optional)
  - Nome: "Imagem do Evento"
  - Validação: Apenas imagens
  
- **registrationRequired** (Boolean, Optional)
  - Nome: "Inscrição Obrigatória"
  - Validação: Verdadeiro/Falso
  
- **registrationLink** (Text, Short text, Optional)
  - Nome: "Link de Inscrição"
  - Validação: URL válida
  
- **category** (Text, Short text, Optional)
  - Nome: "Categoria"
  - Validação: Máximo 50 caracteres

---

### **14. Download** (`download`)

**Descrição**: Arquivos para download

**Campos**:
- **title** (Text, Short text, Required)
  - Nome: "Título do Arquivo"
  - Validação: Máximo 100 caracteres
  
- **description** (Text, Long text, Optional)
  - Nome: "Descrição"
  - Validação: Máximo 300 caracteres
  
- **file** (Media, Single media, Required)
  - Nome: "Arquivo"
  - Validação: Qualquer tipo de arquivo
  
- **category** (Text, Short text, Optional)
  - Nome: "Categoria"
  - Validação: Máximo 50 caracteres
  
- **order** (Number, Integer, Required)
  - Nome: "Ordem"
  - Validação: Número positivo
  
- **downloadCount** (Number, Integer, Optional)
  - Nome: "Contador de Downloads"
  - Validação: Número não negativo

---

## 🔧 Configuração no Contentful

### **1. Criar Space**
- Acesse [contentful.com](https://contentful.com)
- Crie um novo Space ou use um existente

### **2. Criar Content Types**
- Vá para **Content Model**
- Clique em **Add Content Type**
- Use as configurações acima para cada tipo

### **3. Configurar Validações**
- Para cada campo, configure as validações especificadas
- Use **Appearance** para melhorar a interface

### **4. Configurar Permissões**
- Vá para **Settings > Roles & Permissions**
- Configure permissões de leitura/escrita

### **5. Gerar API Keys**
- Vá para **Settings > API keys**
- Crie uma chave de **Content Delivery API**
- Anote o **Space ID** e **Access Token**

---

## 📱 Exemplo de Uso

### **Criar um Hero Slide**
1. Vá para **Content**
2. Clique em **Add entry**
3. Selecione **Hero Slide**
4. Preencha os campos obrigatórios
5. Publique o conteúdo

### **Buscar no Código**
```typescript
import { getHeroSlides } from '@/lib/contentful-queries';

const slides = await getHeroSlides();
console.log(slides[0].fields.title); // "Título do Slide"
```

---

## 🚀 Próximos Passos

1. **Configurar o Contentful** com os content types acima
2. **Criar conteúdo de exemplo** para cada tipo
3. **Testar a integração** no desenvolvimento
4. **Migrar conteúdo existente** para o Contentful
5. **Configurar workflow** de publicação

---

*Última atualização: $(date)*
*Versão: 1.0*
