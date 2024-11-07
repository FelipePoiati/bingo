// Variáveis globais
let cartelas = [];
let numerosSorteados = new Set();
let jogoFinalizado = false; // Flag para indicar o fim do jogo

// Função chamada ao carregar a página
window.onload = function () {
  carregarCartelasDoStorage();
};

// Função para marcar o número nas cartelas
function marcarNumero(numero) {
  cartelas.forEach((cartela) => {
    if (cartela.numeros.includes(numero)) {
      // Seleciona o elemento correspondente dentro da cartela
      const numeroElement = document.querySelector(
        `#cartela-${cartela.nome} .numero[data-numero="${numero}"]`
      );

      // Verifica se o elemento foi encontrado e o marca
      if (numeroElement) {
        numeroElement.classList.add("marcado"); // Adiciona a classe para mudar a cor
        numeroElement.style.background = "#28a745";
        numeroElement.style.color = "#fff";
      }
    }
  });
}

// Função para sortear um número
function sortearNumero() {
  if (jogoFinalizado || numerosSorteados.size >= 75) {
    alert("O jogo terminou ou todos os números já foram sorteados!");
    return;
  }

  let numero;
  do {
    numero = Math.floor(Math.random() * 75) + 1;
  } while (numerosSorteados.has(numero));

  numerosSorteados.add(numero);
  exibirNumeroSorteado(numero);
  marcarNumero(numero);
  verificarVencedor(); // Verifica o vencedor após marcar o número
}

// Função para exibir o número sorteado e narrá-lo
function exibirNumeroSorteado(numero) {
  const divNumeroSorteado = document.getElementById("numeroSorteado");
  divNumeroSorteado.textContent = `Número Sorteado: ${numero}`;
  narrarNumero(numero); // Chama a função para narrar apenas o número
}

// Função para narrar apenas o número sorteado
function narrarNumero(numero) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(numero.toString());

  // Configura a voz masculina, se disponível
  const voices = synth.getVoices();
  utterance.voice =
    voices.find(
      (voice) => voice.lang === "pt-BR" && voice.name.includes("male")
    ) || voices[0];
  utterance.lang = "pt-BR";
  synth.speak(utterance);
}

// Função para verificar se há um vencedor
function verificarVencedor() {
  cartelas.forEach((cartela) => {
    const todosMarcados = cartela.numeros.every((num) =>
      document
        .querySelector(`#cartela-${cartela.nome} .numero[data-numero="${num}"]`)
        ?.classList.contains("marcado")
    );

    if (todosMarcados && !jogoFinalizado) {
      jogoFinalizado = true; // Marca o jogo como finalizado para evitar novas chamadas
      exibirMensagemDeVencedor(cartela); // Exibe a mensagem de vencedor
      esconderElementosDeSorteio(); // Esconde os elementos de sorteio
    }
  });
}

// Função para exibir a mensagem do vencedor na tela
function exibirMensagemDeVencedor(cartela) {
  // Adiciona efeito de blur apenas ao conteúdo
  const conteudo = document.getElementById("conteudo");
  conteudo.classList.add("blur-fundo");

  // Cria o elemento para a mensagem de vencedor
  const mensagemDiv = document.createElement("div");
  mensagemDiv.id = "mensagemVencedor";
  mensagemDiv.innerHTML = `
    <h2>Parabéns, ${cartela.nome}!</h2>
    <p>Você venceu o Bingo!</p>
    <div class="cartela-vencedora">
        ${cartela.numeros
          .map(
            (num) =>
              `<div class="numero ${numerosSorteados.has(num) ? "marcado" : ""}">${num}</div>`
          )
          .join("")}
    </div>
    <button id="botaoFechar">Fechar</button>
    <button id="botaoVoltarInicio">Voltar para o início</button>
  `;
  document.body.appendChild(mensagemDiv);

  // Estilos para a mensagem de vencedor e a cartela
  mensagemDiv.style.position = "fixed";
  mensagemDiv.style.top = "50%";
  mensagemDiv.style.left = "50%";
  mensagemDiv.style.transform = "translate(-50%, -50%)";
  mensagemDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  mensagemDiv.style.border = "3px solid #28a745";
  mensagemDiv.style.borderRadius = "10px";
  mensagemDiv.style.padding = "20px";
  mensagemDiv.style.textAlign = "center";
  mensagemDiv.style.color = "#333";
  mensagemDiv.style.fontSize = "24px";
  mensagemDiv.style.zIndex = "1000";

  // Estilos da cartela do vencedor
  const style = document.createElement("style");
  style.innerHTML = `
    .blur-fundo {
      filter: blur(5px);
    }
    #mensagemVencedor .cartela-vencedora {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
      margin-top: 15px;
    }
    #mensagemVencedor .cartela-vencedora .numero {
      padding: 15px;
      border: 1px solid #28a745;
      border-radius: 5px;
      font-weight: bold;
      color: #333;
      background-color: #ffffff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #mensagemVencedor .cartela-vencedora .numero.marcado {
      background-color: #28a745;
      color: #fff;
    }
    #mensagemVencedor button {
      margin-top: 15px;
      padding: 10px 20px;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    #botaoFechar {
      background-color: #f44336;
      color: white;
      margin-right: 10px;
    }
    #botaoVoltarInicio {
      background-color: #28a745;
      color: white;
    }
  `;
  document.head.appendChild(style);

  // Event listeners para os botões
  document.getElementById("botaoFechar").addEventListener("click", () => fecharMensagemVencedor());
  document.getElementById("botaoVoltarInicio").addEventListener("click", () => {
    fecharMensagemVencedor();
    window.location.href = "gerador.html";
  });
}

// Função para fechar a mensagem de vencedor e remover o efeito de blur
function fecharMensagemVencedor() {
  const mensagemDiv = document.getElementById("mensagemVencedor");
  if (mensagemDiv) {
    mensagemDiv.remove();
  }

  // Remove o efeito de blur do conteúdo
  const conteudo = document.getElementById("conteudo");
  conteudo.classList.remove("blur-fundo"); // Remove o efeito de blur
}


// Função para esconder os elementos de sorteio
function esconderElementosDeSorteio() {
  document.getElementById("botaoSortear").style.display = "none";
  document.getElementById("numeroSorteado").style.display = "none";
}

// Carrega as cartelas do localStorage e exibe
function carregarCartelasDoStorage() {
  const cartelasSalvas = localStorage.getItem("cartelas");
  if (cartelasSalvas) {
    cartelas = JSON.parse(cartelasSalvas);
    exibirCartelas(); // Exibe as cartelas ao carregar a página
  }
}

// Função para ler e processar o arquivo CSV
function lerArquivoCSV(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const linhas = e.target.result.split("\n").map((linha) => linha.split(","));
    importarCartelas(linhas);
  };

  reader.readAsText(file);
}

// Função para importar cartelas a partir dos dados do CSV
function importarCartelas(linhas) {
  for (let i = 1; i < linhas.length; i++) {
    // Ignora o cabeçalho
    const [nome, ...numeros] = linhas[i].map((item) => item.trim());
    if (numeros.length === 25 && nome) {
      cartelas.push({ nome, numeros: numeros.map(Number) });
    }
  }

  localStorage.setItem("cartelas", JSON.stringify(cartelas));
  exibirCartelas(); // Exibe as cartelas importadas
}

// Função para exibir as cartelas na tela
function exibirCartelas() {
  const container = document.getElementById("cartelasJogadores");
  container.innerHTML = ""; // Limpa o conteúdo anterior

  cartelas.forEach((cartela) => {
    const divCartela = document.createElement("div");
    divCartela.classList.add("cartela");
    divCartela.id = `cartela-${cartela.nome}`;
    divCartela.innerHTML = `
            <h3>${cartela.nome}</h3>
            <div class="numeros">
                ${cartela.numeros
                  .map(
                    (num) =>
                      `<div class="numero" data-numero="${num}">${num}</div>`
                  )
                  .join("")}
            </div>
        `;
    container.appendChild(divCartela);
  });
}

// Função para voltar à página do gerador
function voltarParaGerador() {
  window.location.href = "gerador.html";
}

// Função para iniciar o sorteio ao clicar no botão
document
  .getElementById("botaoSortear")
  .addEventListener("click", sortearNumero);
