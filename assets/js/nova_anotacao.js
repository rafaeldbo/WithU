const characters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', 'ç', 'Ç', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', ';', ':', '-', '+', ]
const emotions = {
    "Emoção muito feliz": "emocao_muito_feliz",
    "Emoção feliz": "emocao_feliz",
    "Emoção normal": "emocao_normal",
    "Emoção triste": "emocao_triste",
    "Emoção muito triste": "emocao_muito_triste"
}

document.addEventListener('DOMContentLoaded', function() {
    const notes = JSON.parse(localStorage.getItem("notas"))
    const index = localStorage.getItem("index note")

    function get_note(index) {
        let note = notes[index]
        document.querySelector("h1").innerHTML = note['titulo']
        document.querySelector("#texto").innerHTML = note['texto']
        document.querySelector("#emocao").alt = note['emocao']
        document.querySelector("#emocao").src = `./assets/img/${emotions[note['emocao']]}.png`
    }

    if (index != "new") {get_note(index)}

    var write_spaces = {
        "title": document.querySelector("h1"),
        "text": document.querySelector("#texto"),
    }

    var write = "not selected"
    for (let [name, space] of Object.entries(write_spaces)) {
        space.addEventListener("click", function() {
            write = this == name ? "not selected" : name
        })
    }

    document.addEventListener("keydown", function(event) {
        if (write != "not selected") {
            if (characters.includes(event.key)) {
                write_spaces[write].innerHTML += event.key
            } else if (event.key == "Backspace") {
                write_spaces[write].innerHTML = write_spaces[write].innerHTML.slice(0, -1)
            } else if (event.key == "Enter") {
                write_spaces[write].innerHTML += "<br>"
            }
        }
    })
    
    function save_note(index) {
        if (index != "new") {
            let note = notes[index]
            note["titulo"] = document.querySelector('h1').innerHTML
            note["emocao"] = document.querySelector('#emocao').alt
            note["texto"] = document.querySelector('#texto').innerHTML
            notes[index] = note
        } else {
            let DATE = new Date()
            let note = {
                "data": `${DATE.getDate()}/${DATE.getMonth()+1}/${DATE.getFullYear()}`,
                "tipo": "texto",
                "titulo": document.querySelector('h1').innerHTML,
                "emocao": document.querySelector('#emocao').alt,
                "texto": document.querySelector('#texto').innerHTML
            }
            notes.push(note)
        }

        localStorage.setItem("notas", JSON.stringify(notes))
        window.location = "./tela_anotacoes.html"
    }
    function switch_screen(sreen) {
        document.querySelector('#texto').style.display = (sreen == "note") ? "flex" : "none" 
        document.querySelector('#classificar').style.display = (sreen == "classify") ? "flex" : "none" 
        
        let save_buttons = document.querySelectorAll(".salvar")
        for (b of save_buttons) {b.disabled = (sreen == "note") ? false : true}
    }

    var exit = false
    var save_buttons = document.querySelectorAll(".salvar")
    for (button of save_buttons) {
        button.addEventListener("click", function(event) {
            event.stopPropagation()
            let emotion = document.querySelector("#emocao")
            if (index == "new" && emotion.alt == "Indefinido") {
                exit = true
                switch_screen("classify")
            } else {
                save_note(index)
            }
        })
    }
    var classify_buttons = document.querySelectorAll(".classificar")
    for (button of classify_buttons) {
        button.addEventListener("click", function() {
            if (this.innerHTML == "Salvar" && selected != "") {
                document.querySelector("#emocao").alt = selected
                document.querySelector("#emocao").src = `./assets/img/${emotions[selected]}.png`
                if (exit) {
                    save_note(index)
                } else {
                    switch_screen("note")
                }

            } else if (this.innerHTML == "Cancelar") {
                switch_screen("note")

            } else {
                switch_screen("classify")
            }
        })
    }
    
    var emotion_buttons = document.querySelectorAll(".botao_emocao")
    var selected = ""
    for (button of emotion_buttons) {
        button.addEventListener('click', function(event) {
            event.stopPropagation()

            selected = this.querySelector('img').alt
        
            let list_img_emotions = document.querySelector("#classificar").querySelectorAll("img")
            for (img of list_img_emotions) {
                if (img.alt == selected && !(img.src.includes("_color.png"))) {
                    img.src = img.src.replace(".png", "_color.png")
                } else if (img.alt != selected && (img.src.includes("_color.png"))) {
                    img.src = img.src.replace("_color.png", ".png")
                }
            }
        })
    }

})