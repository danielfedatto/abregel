# Configuração de Variáveis de Ambiente

## Problema Identificado

O header não está conseguindo carregar os dados da logo porque as variáveis de ambiente do Contentful não estão configuradas.

## Solução

### 1. Criar arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=seu_space_id_aqui
CONTENTFUL_ACCESS_TOKEN=seu_access_token_aqui
CONTENTFUL_ENVIRONMENT=master

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Obter credenciais do Contentful

1. Acesse o [painel do Contentful](https://app.contentful.com)
2. Vá para **Settings** > **API keys**
3. Copie o **Space ID** e **Content Delivery API - access token**

### 3. Configurar as variáveis

Substitua `seu_space_id_aqui` e `seu_access_token_aqui` pelas credenciais reais do seu projeto Contentful.

### 4. Reiniciar o servidor

Após configurar as variáveis, reinicie o servidor de desenvolvimento:

```bash
bun run dev
```

## Verificação

Para verificar se a configuração está funcionando, execute:

```bash
node test-contentful-connection.js
```

## Estrutura esperada no Contentful

Certifique-se de que existe uma entrada do tipo `siteSettings` no Contentful com os seguintes campos:

- `siteTitle` (Texto)
- `siteDescription` (Texto)
- `logo` (Asset - Imagem)
- `logoWhite` (Asset - Imagem, opcional)
- `contactEmail` (Texto)
- `contactPhone` (Texto)
- `contactAddress` (Texto)
- `socialLinks` (Objeto JSON)
- `newsletterTitle` (Texto, opcional)
- `newsletterDescription` (Texto, opcional)

## Fallback

Se as variáveis não estiverem configuradas, o header usará as imagens estáticas:
- Logo normal: `/assets/logo.svg`
- Logo branco: `/assets/white_logo.svg`

