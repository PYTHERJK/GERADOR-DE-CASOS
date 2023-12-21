const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const cnpj = evento.target.elements['cnpj']
    const problema = evento.target.elements['problema']
    const contato = evento.target.elements['contato']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "cnpj": cnpj.value,
        "problema": problema.value,
        "contato": contato.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    cnpj.value = ""
    problema.value = ""
    contato.value = ""
})

// CRIAR ELEMENTO NA PÁGINA

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    novoItem.innerHTML +=`ABERTURA DO CASO`+ 
        `<br><br>Nome: ` + item.nome +
        `<br><br>CNPJ: ` + item.cnpj +
        `<br><br>Descrição: ` + item.problema +
        `<br><br>Mensagem de erro: Não Há <br>  
    <br>Ambiente: Microvix POS<br><br>
    =================================================
    <br>
    <br>FINALIZAÇÃO DO CASO 
    <br><br>Validado Por: ` + item.nome +
        `<br>Meio de contato: ` + item.contato +
        `<br>Causa: Dúvida 
        <br>Resolução:
    <br> NPS: Estou muito feliz em concluir mais um chamado,
    e ter resolvido o seu incidente! Mas e você
    ficou satisfeito com meu atendimento? Assim que o chamado for finalizado
    chegará em seu e-mail uma pesquisa para avaliar meu atendimento :-)`

    novoItem.appendChild(botaoDeleta(item.id))
    console.log(item.nome)
    lista.appendChild(novoItem)
    navigator.clipboard.writeText(`Nome: ` + item.nome +
        `\n\nCNPJ: ` + item.cnpj +
        `\n\nDescrição: ` + item.problema +
        `\n\nMensagem de erro: Não Há\n 
Ambiente: Microvix POS`);
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "DELETAR"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}

// function botaoCopiar() {
//     navigator.clipboard.writeText();
// }















