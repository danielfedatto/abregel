# Hero Slider - Links em Imagens

## Visão Geral

Foi adicionada a funcionalidade de links clicáveis nas imagens do hero slider. Agora é possível configurar um link para cada imagem através do Contentful, permitindo que os usuários cliquem nas imagens para navegar para outras páginas ou sites externos.

## Configuração no Contentful

### 1. Adicionar o Campo no Content Type

Para ativar esta funcionalidade, você precisa adicionar um novo campo no content type `heroSlide` no Contentful:

1. Acesse o Contentful
2. Vá para **Content model** > **heroSlide**
3. Clique em **Add field**
4. Configure o campo:
   - **Field ID**: `imageLink`
   - **Field name**: `Link da Imagem`
   - **Field type**: `Short text`
   - **Help text**: `URL para onde o usuário será direcionado ao clicar na imagem (opcional)`
   - **Validation**: Marque como **Optional**

### 2. Configurar os Slides

Após adicionar o campo, você pode configurar os links para cada slide:

1. Edite um slide existente ou crie um novo
2. No campo **Link da Imagem**, insira a URL desejada
3. Exemplos de URLs válidas:
   - `https://www.exemplo.com.br`
   - `https://www.exemplo.com.br/pagina-especifica`
   - `/servicos` (link interno)
   - `mailto:contato@exemplo.com.br`

### 3. Comportamento

- **Com link**: A imagem se torna clicável e abre o link em uma nova aba
- **Sem link**: A imagem permanece como antes, sem funcionalidade de clique
- **Efeito visual**: Imagens com link têm um efeito de hover (escala 105%) para indicar que são clicáveis

## Implementação Técnica

### Arquivos Modificados

1. **`types/contentful.ts`**
   - Adicionado campo `imageLink?: string` na interface `HeroSlide`

2. **`components/HeroSlider.tsx`**
   - Implementada lógica condicional para envolver imagens com links
   - Adicionado efeito hover para imagens clicáveis
   - Suporte para imagens desktop e mobile

3. **`components/ContentfulHeroSlider.tsx`**
   - Implementada mesma lógica para o componente alternativo
   - Mantida consistência entre os componentes

### Características Técnicas

- **Acessibilidade**: Links incluem `aria-label` descritivo
- **Segurança**: Links externos abrem com `target="_blank"` e `rel="noopener noreferrer"`
- **Responsividade**: Funciona tanto em desktop quanto mobile
- **Performance**: Efeitos CSS otimizados com `transition-transform`

## Exemplos de Uso

### Link Externo
```
https://www.sindicato.com.br/beneficios
```

### Link Interno
```
/servicos
/quem-somos
/contato
```

### Email
```
mailto:contato@sindicato.com.br
```

### Telefone
```
tel:+5511999999999
```

## Notas Importantes

1. **Opcional**: O campo é opcional, slides sem link continuam funcionando normalmente
2. **Validação**: URLs são validadas pelo navegador, mas é recomendado testar os links
3. **SEO**: Links externos não afetam o SEO do site principal
4. **Analytics**: Considere configurar tracking para links importantes

## Troubleshooting

### Link não funciona
- Verifique se a URL está correta e completa (incluindo `https://`)
- Teste o link em uma nova aba do navegador
- Verifique se não há espaços extras na URL

### Efeito hover não aparece
- Verifique se o CSS está carregando corretamente
- Teste em diferentes navegadores
- Verifique se não há conflitos de CSS

### Imagem não é clicável
- Confirme que o campo `imageLink` foi preenchido no Contentful
- Verifique se o conteúdo foi publicado no Contentful
- Teste em modo de desenvolvimento para verificar os dados
