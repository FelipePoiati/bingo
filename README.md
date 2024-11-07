
# **Jogo de Bingo - Web App**

## **Descrição**

O Jogo de Bingo é um aplicativo web simples que permite aos usuários jogar Bingo de forma interativa. O jogo possui uma interface amigável com funcionalidades como sorteio de números, geração de cartelas, e exibição de vencedores. Ideal para ser utilizado em telões para eventos ou jogos em grupo.

## **Funcionalidades**

- **Geração de Cartelas**: O usuário pode gerar cartelas de bingo aleatórias ou importar cartelas de um arquivo CSV.
- **Sorteio de Números**: Números são sorteados aleatoriamente, sendo exibidos em tempo real.
- **Marcação Automática de Cartelas**: À medida que os números são sorteados, as cartelas dos jogadores são atualizadas automaticamente.
- **Exibição do Vencedor**: Quando um jogador vence, sua cartela é destacada, e uma mensagem de parabéns é exibida, com o fundo embaçado para dar ênfase ao vencedor.

## **Tecnologias Usadas**

- **HTML**: Estrutura da página web.
- **CSS**: Estilização e design responsivo.
- **JavaScript**: Funcionalidades do jogo, incluindo sorteio de números, marcação de cartelas e controle de fluxo de jogo.
- **LocalStorage**: Armazenamento das cartelas geradas no navegador para persistência de dados.

## **Funcionalidades e Componentes**

### **Tela de Jogo**

- **Número Sorteado**: O número sorteado é exibido em destaque com a possibilidade de ser aumentado para telões.
- **Cartelas**: O jogador pode ver suas cartelas de bingo geradas ou importadas.
- **Sorteio de Número**: Um botão para iniciar o sorteio de números e atualizar as cartelas.
- **Mensagem de Vencedor**: Quando um jogador vence, a cartela do vencedor é destacada e uma mensagem de parabéns é exibida.

### **Tela de Gerador de Cartelas**

- **Gerar Cartelas Aleatórias**: O usuário pode gerar cartelas de bingo de forma aleatória.
- **Importar Cartelas**: O usuário pode importar cartelas a partir de um arquivo CSV.
- **Salvar Cartelas**: As cartelas geradas são salvas no armazenamento local para persistência entre as sessões.

### **Exibição de Vencedor**

- Quando um vencedor é encontrado, o jogo exibe uma mensagem de parabéns com a cartela vencedora e aplica um efeito de **blur** no fundo da tela, destacando o vencedor.

## **Como Usar**

### **Instalação**

1. **Clone este repositório:**

```bash
git clone https://github.com/FelipePoiati/bingo.git
```

2. **Abra o arquivo `index.html` ou `jogo.html` no seu navegador:**

- Acesse diretamente no navegador para jogar no modo local.

### **Uso no Navegador**

1. **Tela de Gerador**: 
   - Clique em **"Gerar Cartelas"** para criar cartelas aleatórias ou **"Importar CSV"** para carregar suas próprias cartelas.
   - Salve as cartelas no armazenamento local.

2. **Tela de Jogo**:
   - Clique em **"Sortear Número"** para iniciar o sorteio dos números.
   - O número sorteado será exibido no topo da tela.
   - As cartelas serão atualizadas automaticamente conforme os números são sorteados.

3. **Final do Jogo**:
   - Quando um jogador completar a cartela, uma mensagem de vencedor será exibida.

### **Funcionalidades Extras**

- **Tela em Telão**: A interface foi projetada para funcionar bem em uma tela grande, com o número sorteado sendo exibido em destaque.
- **Efeito de Blur**: Quando um vencedor é encontrado, o fundo é desfocado para destacar o vencedor, sem afetar sua cartela.

## **Exemplo de Tela**

![bingo](https://github.com/user-attachments/assets/2c40c21a-86b3-473c-a5b7-91b9a333c255)

## **Arquitetura**

A estrutura do projeto é composta pelos seguintes arquivos:

```
/jogo-bingo
│
├── index.html          # Página principal (Gerador de Cartelas)
├── jogo.html           # Página de Jogo
├── estilos.css         # Arquivo de estilização
├── jogo.js             # Lógica do Jogo
├── gerador.js          # Lógica para Gerar Cartelas
└── README.md           # Documentação do projeto
```

### **CSS**

O arquivo `estilos.css` contém o estilo base para o jogo, incluindo responsividade para se adaptar a diferentes tamanhos de tela. Há também um estilo especial para **exibição em telões** e **efeitos visuais** como o **blur** no fundo.

### **JavaScript**

O arquivo `jogo.js` gerencia toda a lógica do sorteio de números, verificação de vencedores e atualização das cartelas. O arquivo `gerador.js` lida com a geração e importação de cartelas.

## **Contribuindo**

1. **Faça um Fork do Repositório**
2. **Crie uma Nova Branch** (`git checkout -b feature/nova-funcionalidade`)
3. **Realize as Mudanças** necessárias
4. **Faça o Commit** (`git commit -am 'Adicionando nova funcionalidade'`)
5. **Envie para o Repositório Remoto** (`git push origin feature/nova-funcionalidade`)
6. **Abra um Pull Request**

## **Licença**

Distribuído sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.
