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
    // const quantidade = 0

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

    novoItem.innerHTML += `Nome: ` + item.nome
    novoItem.innerHTML += `<br><br>CNPJ: ` + item.cnpj
    novoItem.innerHTML += `<br><br>Descrição: ` + item.problema
    novoItem.innerHTML += `<br><br>Mensagem de erro: Não Há <br>  
    <br>Ambiente: Microvix ERP
    =================================================`

    novoItem.innerHTML += `<br>FINALIZAÇÃO DO CASO`
    novoItem.innerHTML += `<br><br>Validado Por: ` + item.nome
    novoItem.innerHTML += `<br>Meio de contato: ` + item.contato
    novoItem.innerHTML += `<br>Causa: Dúvida `
    novoItem.innerHTML += `<br>Resolução:`
    novoItem.innerHTML += `<br> NPS: Estou muito feliz em concluir,mais um chamado,
    e ter resolvido o seu incidente! Mas e você
    ficou satisfeito com meu atendimento? Assim que o chamado for finalizado<
    chegará em seu em-mail uma pesquisa para avaliar meu atendimento :-)`

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
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