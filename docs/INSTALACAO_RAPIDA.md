# ⚡ Instalação Rápida - Abregel

## 🚀 **Setup em 5 Minutos**

### **1. Pré-requisitos**
```bash
# Verificar Node.js (versão 18+)
node --version

# Se não tiver, instale via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

### **2. Clone e Instalação**
```bash
# Clone o repositório
git clone <repository-url>
cd abregel

# Instale as dependências
npm install
```

### **3. Configuração do Contentful**

#### **A. Criar Conta no Contentful**
1. Acesse: [app.contentful.com](https://app.contentful.com)
2. Crie uma conta gratuita
3. Crie um novo espaço

#### **B. Obter Credenciais**
1. Vá em **Settings** → **API keys**
2. Copie o **Space ID** e **Content Delivery API - access token**
3. Vá em **Settings** → **Content management tokens**
4. Crie um novo token de gerenciamento

#### **C. Configurar Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite o arquivo .env.local com suas credenciais
nano .env.local
```

**Conteúdo do .env.local:**
```env
CONTENTFUL_SPACE_ID=seu_space_id_aqui
CONTENTFUL_ACCESS_TOKEN=seu_access_token_aqui
CONTENTFUL_MANAGEMENT_TOKEN=seu_management_token_aqui
CONTENTFUL_ENVIRONMENT=master
NEXTAUTH_SECRET=uma_chave_secreta_qualquer
NEXTAUTH_URL=http://localhost:3000
```

### **4. Configurar Contentful Automaticamente**
```bash
# Execute o script de configuração
npm run setup-contentful
# ou
npx tsx setup-contentful.ts
```

**O que este comando faz:**
- ✅ Cria todos os content types
- ✅ Configura campos e validações
- ✅ Insere conteúdo de exemplo
- ✅ Publica tudo automaticamente

### **5. Iniciar o Projeto**
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

## 🎉 **Pronto!**

Seu site está funcionando localmente. Agora você pode:

1. **Editar conteúdo** no painel do Contentful
2. **Ver mudanças** em tempo real no navegador
3. **Personalizar** textos, imagens e configurações

## 📋 **Próximos Passos**

### **Para Produção:**
1. **Deploy no Vercel**:
   - Conecte o repositório ao Vercel
   - Configure as mesmas variáveis de ambiente
   - Deploy automático

2. **Configurar Domínio**:
   - Adicione seu domínio no Vercel
   - Configure DNS se necessário

### **Para Personalização:**
1. **Editar Conteúdo**:
   - Acesse o Contentful
   - Edite textos, imagens e configurações
   - Publique as alterações

2. **Adicionar Conteúdo**:
   - Crie novas notícias
   - Adicione páginas dinâmicas
   - Configure serviços

## 🆘 **Problemas Comuns**

### **Erro: "Variáveis de ambiente não encontradas"**
```bash
# Verifique se o arquivo .env.local existe
ls -la .env.local

# Verifique se as variáveis estão corretas
cat .env.local
```

### **Erro: "Contentful connection failed"**
```bash
# Verifique suas credenciais no Contentful
# Confirme se o token de gerenciamento tem permissões
```

### **Erro: "Module not found"**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### **Site não carrega**
```bash
# Verifique se o servidor está rodando
npm run dev

# Verifique a porta 3000
lsof -i :3000
```

## 📞 **Suporte**

Se encontrar problemas:

1. **Verifique os logs** no terminal
2. **Consulte a documentação** em `/docs`
3. **Entre em contato** com o suporte técnico

---

**Tempo total de instalação: ~5 minutos** ⏱️
