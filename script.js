let cartelas = [];

// Função para salvar cartelas no Local Storage
function salvarCartelasNoStorage() {
  localStorage.setItem("cartelas", JSON.stringify(cartelas));
}

// Função para carregar cartelas do Local Storage
function carregarCartelasDoStorage() {
  const cartelasSalvas = localStorage.getItem("cartelas");
  if (cartelasSalvas) {
    cartelas = JSON.parse(cartelasSalvas);
    cartelas.forEach((cartela) => {
      exibirCartela(cartela.nome, cartela.numeros);
    });
  }
}

function limparCartelas() {
  localStorage.removeItem("cartelas"); // Remove as cartelas do armazenamento local
}

// Função para esconder o número sorteado e o botão de sortear
function escondeNum() {
  // Esconde o número sorteado e o botão de sortear
  document.getElementById("numeroSorteado").style.display = "none";
  document.getElementById("botaoSortear").style.display = "none";
}

function irParaOJogo() {
    limparCartelas(); // Limpa as cartelas do armazenamento local
    window.location.href = "jogo.html"; // Redireciona para a página do jogo
  }

// Adiciona o evento de clique no botão "Ir Para o Jogo"
document.getElementById("irParaOJogo").addEventListener("click", irParaOJogo);

// Função para gerar cartelas de 25 números
function gerarCartela() {
  const nomeJogador = document.getElementById("nomeJogador").value.trim();
  if (!nomeJogador) {
    alert("Por favor, insira o nome do jogador.");
    return;
  }

  // Verifica se já existe uma cartela com o mesmo nome
  if (
    cartelas.some(
      (cartela) => cartela.nome.toLowerCase() === nomeJogador.toLowerCase()
    )
  ) {
    alert(
      "Já existe uma cartela com o nome '" +
        nomeJogador +
        "'. Por favor, escolha um nome diferente."
    );
    return;
  }

  const numeros = gerarNumerosAleatorios();
  const novaCartela = { nome: nomeJogador, numeros };
  cartelas.push(novaCartela);

  exibirCartela(nomeJogador, numeros);
  salvarCartelasNoStorage(); // Salva as cartelas atualizadas no Local Storage
  document.getElementById("nomeJogador").value = ""; // Limpa o campo de entrada
}

// Gera 25 números aleatórios e únicos entre 1 e 75
function gerarNumerosAleatorios() {
  const numeros = new Set();
  while (numeros.size < 25) {
    numeros.add(Math.floor(Math.random() * 75) + 1);
  }
  return Array.from(numeros);
}

// Exibe uma cartela em uma seção específica
function exibirCartela(nome, numeros) {
  const divCartelas = document.getElementById("cartelasGeradas");
  const divCartela = document.createElement("div");
  divCartela.classList.add("cartela");

  const cartelaHtml = numeros
    .map((num) => `<div class="numero">${num}</div>`)
    .join("");

  divCartela.innerHTML = `
        <h3>${nome}</h3>
        <div class="numeros">${cartelaHtml}</div>
        <button onclick="imprimirCartela('${nome}', '${numeros.join(
    ","
  )}')">Imprimir Cartela</button>
    `;
  divCartelas.appendChild(divCartela);
}

// Função para imprimir uma cartela
function imprimirCartela(nome, numeros) {
  const cartelaHtml = `
    <html>
    <head>
        <title>Impressão de Cartela</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #e6ffe6;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                border: 2px solid #28a745;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                width: 280px;
            }
            h3 {
                color: #28a745;
            }
            .numeros {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 3px;
            }
            .numero {
                padding: 12px;
                text-align: center;
                border: 1px solid #28a745;
                border-radius: 4px;
                font-size: 18px;
                background-color: #ffffff;
                color: #333;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h3>Cartela de Bingo - ${nome}</h3>
            <div class="numeros">
                ${numeros
                  .split(",")
                  .map((num) => `<div class="numero">${num}</div>`)
                  .join("")}
            </div>
        </div>
        <script>
            window.onload = function() {
                window.print();
                window.onafterprint = function() {
                    window.close();
                };
            };
        </script>
    </body>
    </html>
`;

  const newWindow = window.open("", "_blank", "width=400,height=500");
  newWindow.document.write(cartelaHtml);
  newWindow.document.close();
}

// Exporta as cartelas geradas para um arquivo CSV
function exportarCSV() {
  if (cartelas.length === 0) {
    alert("Nenhuma cartela gerada para exportar.");
    return;
  }

  let csvContent =
    "data:text/csv;charset=utf-8," +
    ["jogador," + Array.from({ length: 25 }, (_, i) => `n${i + 1}`).join(",")];
  cartelas.forEach((cartela) => {
    const linha = [cartela.nome, ...cartela.numeros].join(",");
    csvContent += "\n" + linha;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "cartelas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Carrega as cartelas do Local Storage ao iniciar a página
window.onload = carregarCartelasDoStorage;
