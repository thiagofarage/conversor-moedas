// Inputs e Selects
const inputValor = document.querySelector("#valor");
const selectOrigem = document.querySelector("#moedaOrigem");
const selectDestino = document.querySelector("#moedaDestino");

// Botões
const btnConverter = document.querySelector("#converter");
const btnTrocar = document.querySelector("#trocar");

// Resultado
const loading = document.querySelector("#loading");
const resultado = document.querySelector("#resultadoContent");
const valorConvertido = document.querySelector("#valorConvertido");
const infoConversao = document.querySelector("#infoConversao");
const taxaInfo = document.querySelector("#taxaInfo");

// Conversão de Moedas
async function converterMoeda() {
  const valor = inputValor.value;
  const origem = selectOrigem.value;
  const destino = selectDestino.value;

  if (valor === "" || valor <= 0) {
    alert("Digite um valor válido!");
    return;
  }

  loading.classList.add("active");
  resultadoContent.classList.remove("show");

  try {
    const url = `https://economia.awesomeapi.com.br/json/last/${origem}-${destino}`;
    const response = await fetch(url);
    const dados = await response.json();

    const chave = `${origem}${destino}`;
    const taxa = parseFloat(dados[chave].bid);
    const resultado = (valor * taxa).toFixed(2);

    loading.classList.remove("active");
    resultadoContent.classList.add("show");

    valorConvertido.textContent = `${destino} ${resultado}`;
    infoConversao.textContent = `${valor} ${origem} = ${resultado} ${destino}`;
    taxaInfo.textContent = `Taxa: 1 ${origem} = ${taxa.toFixed(4)} ${destino}`;
  } catch (erro) {
    loading.classList.remove("active");
    resultadoContent.classList.add("show");
    valorConvertido.innerHTML = '<span class="error">Erro ao converter</span>';
    infoConversao.textContent = "Tente novamente";
    console.error("Erro:", erro);
  }
}

// Evento no botão
btnConverter.addEventListener("click", converterMoeda);

// Botão trocar Moedas
btnTrocar.addEventListener("click", function () {
  const temp = selectOrigem.value;

  selectOrigem.value = selectDestino.value;

  selectDestino.value = temp;
});
