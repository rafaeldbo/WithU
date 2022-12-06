const emotions = {
    "Emoção muito feliz": "emocao_muito_feliz",
    "Emoção feliz": "emocao_feliz",
    "Emoção normal": "emocao_normal",
    "Emoção triste": "emocao_triste",
    "Emoção muito triste": "emocao_muito_triste"
}

document.addEventListener('DOMContentLoaded', function() {
    const DATE = new Date()
    var current_date = `${DATE.getDate()}/${DATE.getMonth()+1}/${DATE.getFullYear()}`

    function create_new_note(type, title, emotion, date, index) {
        let note_list = document.querySelector('#anotacoes')

        let new_note = document.createElement("a")
        new_note.id = index
        new_note.className = "linha alinhada"
        new_note.href = "./tela_anotacao_texto.html"
        new_note.addEventListener('click', function (event) {
            event.stopPropagation()
            localStorage.setItem('index note', this.id)
        })

        let type_note = document.createElement("img")
        type_note.src = `./assets/img/${type}.png`
        type_note.alt = type
        new_note.appendChild(type_note)

        let title_note = document.createElement("h2")
        title_note.innerHTML = title
        new_note.appendChild(title_note)

        let emotion_note = document.createElement('img')
        emotion_note.src = `./assets/img/${emotions[emotion]}.png`
        emotion_note.alt = emotion
        new_note.appendChild(emotion_note)

        let date_note = document.createElement('div')
        date_note.classList.add("dados")
        date_note.innerHTML = date
        new_note.appendChild(date_note)

        note_list.appendChild(new_note)
    }

    if (localStorage.getItem("notas") == null) {
        let init_notes = [{
            "data": current_date,
            "tipo": "texto",
            "titulo": "Minha Primeira Anotação",
            "emocao": "Emoção feliz",
            "texto": "Bom, meu nome é Max, tenho 19 anos e estou fazendo cursinho (eu nem sei porque estou me apresentando já que só eu vou ter acesso a isso - espero ao menos :,,,) ), desde muito pequeno eu sofri de uma ansiedade muito intensa, e na maioria das vezes as pessoas não me compreendiam, e isso foi e é muito doloroso, essa solidão. Espero que com esse aplicativo eu possa trabalhar na minha saúde mental e aproveitar melhor a minha terapia. Hoje foi um dia muito puxado, a maioria das aulas do cursinho foram de exatas e a maior parte do conteúdo eu não consegui pegar. Eu me sinto muito culpado por não estar acompanhando tão bem a matéria, isso me faz questionar se eu sou realmente capaz de entrar numa faculdade. Tenho muito medo de ser visto como um fracasso, eu só não quero falhar. Eu também tenho me sentido muito ansioso, minhas pernas tremem o dia inteiro, minhas mãos suam tanto que eu mal consigo anotar no papel. Eu preciso de ajuda, ainda bem que tenho esse aplicativo como refúgio dessas situações ^^"
        }]
        init_notes = JSON.stringify(init_notes)
        localStorage.setItem("notas", init_notes)
    }
    
    var notes = JSON.parse(localStorage.getItem("notas"))
    for (let note of notes) {
        let i = notes.indexOf(note)
        if (note["data"] == current_date) {
            create_new_note(note["tipo"], note["titulo"], note["emocao"], note["data"], i)
        }
    }

    document.querySelector("#anotacao_texto").addEventListener('click', function (event) {
        event.stopPropagation()
        localStorage.setItem('index note', "new")
    })

    document.querySelector("#titulo_data").innerHTML = `Anotações de ${DATE.getDate()} de ${DATE.toLocaleString('default', { month: 'long' })} `
})