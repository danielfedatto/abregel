# 🚀 Guia de Configuração Rápida - Contentful

## ⚡ Configuração em 5 Minutos

### **1. Criar Conta no Contentful**
- Acesse [contentful.com](https://contentful.com)
- Crie uma conta gratuita
- Crie um novo Space para o projeto

### **2. Obter Credenciais**
- **Space ID**: Settings > General settings
- **Content Delivery API Token**: Settings > API keys > Content Delivery API
- **Content Management API Token**: Settings > API keys > Content Management API

### **3. Configurar Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite .env.local com suas credenciais
CONTENTFUL_SPACE_ID=abc123...
CONTENTFUL_ACCESS_TOKEN=xyz789...
CONTENTFUL_MANAGEMENT_TOKEN=def456...
```

### **4. Executar Script de Configuração**
```bash
# Instalar dependências (se ainda não instalou)
bun install

# Executar script de configuração automática
bun run setup-contentful
```

### **5. Verificar no Contentful**
- Acesse seu Space
- Vá para **Content Model**
- Verifique se todos os Content Types foram criados

## 🎯 Content Types Criados Automaticamente

✅ **Hero Slide** - Slides do banner principal  
✅ **Service** - Serviços oferecidos  
✅ **Partner** - Parceiros e empresas  
✅ **News Post** - Notícias e artigos  
✅ **FAQ Item** - Perguntas frequentes  
✅ **Pricing Plan** - Planos de preço  
✅ **Testimonial** - Depoimentos  
✅ **Director** - Membros da diretoria  
✅ **Site Settings** - Configurações gerais  

## 🔧 Configuração Manual (Alternativa)

Se preferir configurar manualmente:

1. **Content Model** > **Add Content Type**
2. Use as especificações em `docs/contentful-content-types.md`
3. Configure campos, validações e aparência
4. Publique cada Content Type

## 📱 Criar Conteúdo de Exemplo

### **Hero Slide**
1. **Content** > **Add entry** > **Hero Slide**
2. Preencha:
   - Título: "Bem-vindo ao Sindicato Conecta"
   - Imagem: Upload de imagem
   - Tipo: "image"
   - Ordem: 1

### **Service**
1. **Content** > **Add entry** > **Serviço**
2. Preencha:
   - Título: "Assessoria Jurídica"
   - Descrição: "Suporte legal especializado..."
   - Slug: "assessoria-juridica"
   - Ordem: 1

## 🚀 Testar a Integração

### **1. Verificar Build**
```bash
bun run build
```

### **2. Testar em Desenvolvimento**
```bash
bun run dev
```

### **3. Verificar Console**
- Abra DevTools
- Verifique se não há erros de Contentful
- Confirme se os dados estão sendo carregados

## 🐛 Troubleshooting

### **Erro: "Access token invalid"**
- Verifique se `CONTENTFUL_ACCESS_TOKEN` está correto
- Confirme se o token tem permissões de leitura

### **Erro: "Space not found"**
- Verifique se `CONTENTFUL_SPACE_ID` está correto
- Confirme se o Space existe e você tem acesso

### **Erro: "Content type not found"**
- Execute `bun run setup-contentful` novamente
- Verifique se os Content Types foram criados no Contentful

### **Erro: "Image domain not allowed"**
- Verifique se o `next.config.js` está configurado corretamente
- Confirme se os domínios do Contentful estão incluídos

## 📚 Próximos Passos

1. **Criar conteúdo** para cada Content Type
2. **Configurar permissões** em Settings > Roles & Permissions
3. **Testar a integração** com dados reais
4. **Configurar workflow** de publicação
5. **Implementar preview mode** para editores

## 🆘 Suporte

- **Documentação**: `docs/contentful-integration.md`
- **Content Types**: `docs/contentful-content-types.md`
- **Script de Setup**: `scripts/setup-contentful.ts`
- **Exemplos**: `app/page-contentful.tsx`

---

*Configuração concluída! 🎉*
