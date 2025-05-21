# Instruções para Personalização e Publicação da Página

## Como Adicionar e Gerenciar suas 50 Fotos

Esta versão do carrossel foi otimizada para suportar até 50 fotos com carregamento eficiente (lazy loading). Para adicionar suas próprias fotos:

1. Acesse a pasta `images` dentro do diretório principal do projeto
2. Substitua os arquivos existentes (`imagem1.jpg`, `imagem2.jpg`, etc.) por suas próprias fotos
3. Nomeie suas fotos seguindo o padrão: `imagem1.jpg`, `imagem2.jpg`, `imagem3.jpg`... até `imagem50.jpg`
4. Recomendamos usar imagens com proporção similar (preferencialmente paisagem ou quadrada)
5. Tamanho recomendado: 1200x800 pixels para melhor desempenho e qualidade visual

### Dicas para gerenciar muitas fotos:

- Organize suas fotos em ordem cronológica ou temática antes de renomeá-las
- Use um programa de edição em lote para redimensionar todas as imagens de uma vez
- Comprima as imagens para melhorar o desempenho da página (sites como TinyJPG podem ajudar)
- Verifique se todas as imagens estão no formato JPG para consistência

## Navegação do Carrossel

Esta versão do carrossel foi projetada sem botões visíveis, conforme solicitado. A navegação funciona da seguinte forma:

- **Em dispositivos móveis**: Deslize para a esquerda ou direita para navegar entre as fotos
- **Em computadores**: Clique na metade esquerda da imagem para voltar ou na metade direita para avançar
- **Automático**: O carrossel avança automaticamente a cada 5 segundos
- **Indicador de progresso**: A barra na parte inferior mostra a posição atual no conjunto de fotos

## Opções de Hospedagem

### 1. GitHub Pages (Gratuito)
- Crie uma conta no GitHub (se ainda não tiver)
- Crie um novo repositório
- Faça upload de todos os arquivos do projeto
- Vá para a aba "Settings" do repositório
- Role até a seção "GitHub Pages"
- Em "Source", selecione "Deploy from a branch"
- Em "Branch", selecione "main" e mantenha "/ (root)" selecionado
- Clique em "Save"
- Aguarde alguns minutos para que o site seja publicado
- A URL será exibida na mesma seção (formato: https://seuusuario.github.io/nome-do-repositorio/)

### 2. Netlify (Gratuito)
- Crie uma conta no Netlify
- Arraste e solte a pasta do projeto na interface do Netlify
- A página será publicada automaticamente com um URL aleatório
- Você pode personalizar o domínio nas configurações

## Personalizando a Mensagem

Para alterar a mensagem exibida junto ao contador:
1. Abra o arquivo `index.html`
2. Localize a linha com a classe `message` (aproximadamente linha 40)
3. Modifique o texto conforme desejado, mantendo as tags `<span>` para os números

## Personalizando as Cores

Para alterar as cores da página:
1. Abra o arquivo `styles.css`
2. Localize as variáveis de cores no início do arquivo (`:root`)
3. Modifique os códigos de cores conforme sua preferência

## Adicionando Mais de 50 Fotos

Se desejar adicionar mais de 50 fotos:
1. Abra o arquivo `script.js`
2. Localize a linha `this.images = Array.from({length: 50}, (_, i) => `images/imagem${i + 1}.jpg`);`
3. Altere o número 50 para a quantidade desejada
4. Adicione as fotos adicionais na pasta `images` seguindo o mesmo padrão de nomenclatura

## Suporte

Se precisar de ajuda adicional para personalizar ou publicar sua página, não hesite em entrar em contato novamente.
