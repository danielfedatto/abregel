# Abregel - Portal Web

Portal web moderno e responsivo para o Abregel, desenvolvido com Next.js 15, TypeScript e integração completa com Contentful CMS.

## 🚀 Características Principais

### ✨ **CMS Totalmente Editável**
- **Página de Serviços**: 100% editável via Contentful
- **Páginas Dinâmicas**: Sistema de páginas com rich text
- **Notícias**: Sistema completo de blog com categorias e tags
- **Configurações Globais**: Logo, contatos, redes sociais editáveis
- **Hero Slider**: Banner principal com suporte a imagens e vídeos

### 🎨 **Design System Avançado**
- **Tailwind CSS**: Estilização moderna e responsiva
- **Componentes Reutilizáveis**: shadcn/ui + componentes customizados
- **Acessibilidade WCAG 2 AA**: Contraste otimizado e navegação por teclado
- **Tipografia Responsiva**: Sistema de fontes Montserrat
- **Dark/Light Mode**: Suporte completo a temas

### 📱 **Responsividade Total**
- **Mobile First**: Design otimizado para todos os dispositivos
- **Breakpoints Inteligentes**: Adaptação automática de layout
- **Imagens Responsivas**: Otimização automática via Next.js Image
- **Touch Friendly**: Interface otimizada para touch

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática completa
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Biblioteca de componentes
- **Lucide React**: Ícones modernos

### **CMS & Backend**
- **Contentful**: Headless CMS
- **Rich Text Renderer**: Renderização avançada de conteúdo
- **Contentful Management API**: Setup automatizado
- **TypeScript Types**: Tipagem completa do Contentful

### **Deploy & Performance**
- **Vercel**: Deploy automático
- **Next.js Image**: Otimização de imagens
- **Static Generation**: Performance otimizada
- **SEO**: Meta tags dinâmicas

## 📋 **Content Types do Contentful**

### **Páginas e Conteúdo**
- `servicesPage`: Página de serviços editável
- `dynamicPage`: Páginas dinâmicas com rich text
- `newsPost`: Sistema de notícias/blog
- `heroSlide`: Slides do banner principal

### **Conteúdo Estruturado**
- `service`: Serviços oferecidos
- `partner`: Parceiros e empresas
- `testimonial`: Depoimentos
- `faqItem`: Perguntas frequentes
- `pricingPlan`: Planos de preços
- `director`: Membros da diretoria

### **Configurações**
- `siteSettings`: Configurações globais do site
- `aboutSection`: Seção "Quem Somos"
- `navigationMenu`: Menus de navegação
- `footer`: Configurações do rodapé

## 🚀 **Instalação e Configuração**

### **1. Pré-requisitos**
```bash
# Node.js 18+ (recomendado: 22.x)
node --version

# npm ou yarn
npm --version
```

### **2. Clone e Instalação**
```bash
# Clone o repositório
git clone <repository-url>
cd sindicato-conecta

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### **3. Configuração do Contentful**

#### **Variáveis de Ambiente (.env.local)**
```env
# Contentful - API de Leitura
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master

# Contentful - API de Gerenciamento (para setup)
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token

# Next.js
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

#### **Setup Automático do Contentful**
```bash
# Execute o script de configuração
npm run setup-contentful
# ou
npx tsx setup-contentful.ts
```

Este script irá:
- ✅ Criar todos os content types
- ✅ Configurar campos e validações
- ✅ Inserir conteúdo de exemplo
- ✅ Publicar automaticamente

### **4. Desenvolvimento**
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

## 📁 **Estrutura do Projeto**

```
sindicato-conecta/
├── app/                          # App Router (Next.js 15)
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Homepage
│   ├── servicos/                # Página de serviços
│   ├── noticias/                # Sistema de blog
│   │   └── [slug]/              # Páginas dinâmicas de notícias
│   ├── pagina/                  # Páginas dinâmicas
│   │   └── [slug]/              # Sistema de páginas
│   └── contato/                 # Página de contato
├── components/                   # Componentes React
│   ├── ui/                      # Componentes shadcn/ui
│   ├── Contentful*.tsx          # Componentes do Contentful
│   ├── ExtractRichText.tsx      # Renderer de Rich Text
│   ├── Header.tsx               # Cabeçalho
│   └── Footer.tsx               # Rodapé
├── lib/                         # Utilitários
│   ├── contentful.ts            # Cliente Contentful
│   ├── contentful-config.ts     # Configurações
│   └── utils.ts                 # Utilitários gerais
├── hooks/                       # React Hooks
│   ├── use-contentful.ts        # Hook para Contentful
│   └── use-site-settings.ts    # Hook para configurações
├── types/                       # Definições TypeScript
│   └── contentful.ts            # Tipos do Contentful
├── setup-contentful.ts          # Script de configuração
└── docs/                        # Documentação
```

## 🎯 **Funcionalidades Implementadas**

### **✅ Página de Serviços**
- **100% Editável**: Todos os textos via Contentful
- **Cards de Serviços**: Com ícones, imagens e características
- **Seção de Benefícios**: Vantagens editáveis
- **CTA Personalizado**: Botões e links editáveis

### **✅ Sistema de Notícias**
- **Rich Text Avançado**: Renderização completa de conteúdo
- **Categorias e Tags**: Organização de conteúdo
- **SEO Otimizado**: Meta tags dinâmicas
- **Imagens Responsivas**: Otimização automática

### **✅ Páginas Dinâmicas**
- **Sistema Flexível**: Criação de páginas via CMS
- **Rich Text**: Editor completo de conteúdo
- **SEO**: Meta tags personalizáveis
- **Slugs**: URLs amigáveis

### **✅ Configurações Globais**
- **Site Settings**: Título, descrição, logo
- **Contatos**: Email, telefone, endereço
- **Redes Sociais**: Links editáveis
- **Newsletter**: Configuração de formulário

## 🎨 **Sistema de Design**

### **Cores Institucionais**
```css
--primary-900: #0F4379    /* Azul escuro principal */
--primary-700: #306BB3    /* Azul médio */
--primary-500: #1A4A6B    /* Azul escurecido */
--accent-400: #4A9BA8     /* Verde água */
```

### **Tipografia**
- **Fonte Principal**: Montserrat (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800
- **Responsiva**: Escalas automáticas por dispositivo

### **Componentes**
- **Botões**: Primary, Secondary, Outline
- **Cards**: Hover effects e sombras
- **Formulários**: Validação e feedback
- **Navegação**: Responsiva e acessível

## 📱 **Responsividade**

### **Breakpoints**
```css
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop small */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Desktop large */
```

### **Otimizações Mobile**
- **Touch Targets**: Mínimo 44px
- **Navegação**: Menu hamburger responsivo
- **Imagens**: Lazy loading e otimização
- **Performance**: Bundle splitting automático

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# 1. Conecte o repositório ao Vercel
# 2. Configure as variáveis de ambiente
# 3. Deploy automático a cada push
```

### **Variáveis de Ambiente (Produção)**
```env
CONTENTFUL_SPACE_ID=your_production_space_id
CONTENTFUL_ACCESS_TOKEN=your_production_token
CONTENTFUL_ENVIRONMENT=master
NEXTAUTH_URL=https://your-domain.com
```

## 🔧 **Comandos Úteis**

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build de produção
npm run start           # Servidor de produção
npm run lint            # Verificação de código

# Contentful
npm run setup-contentful # Configuração inicial
npx tsx setup-contentful.ts # Setup manual
```

## 📚 **Documentação Adicional**

### **Arquivos de Documentação**
- `docs/contentful-integration.md`: Integração com Contentful
- `docs/rich-text-formatting.md`: Sistema de Rich Text
- `docs/accessibility-wcag-fixes.md`: Acessibilidade
- `docs/build-fix-summary.md`: Resolução de problemas

### **Links Úteis**
- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 🆘 **Suporte e Manutenção**

### **Problemas Comuns**
1. **Erro de Build**: Verifique as variáveis de ambiente
2. **Conteúdo não aparece**: Verifique se está publicado no Contentful
3. **Imagens não carregam**: Verifique as configurações de domínio

### **Contato Técnico**
- **Desenvolvedor**: [Seu Nome]
- **Email**: [seu-email@exemplo.com]
- **GitHub**: [seu-usuario]

---

## 📄 **Licença**

Este projeto foi desenvolvido exclusivamente para o Sindicato Industrial. Todos os direitos reservados.

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Contentful**