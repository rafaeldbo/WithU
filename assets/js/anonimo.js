document.addEventListener('DOMContentLoaded', function() {
    let submit = document.querySelector(".botao-enviar")
    let input_text = document.querySelector(".entrada-msg")
    submit.addEventListener("click", function () {
        let li_new_message = document.createElement("li")
        li_new_message.classList.add('balao_depois')
        let p_msg_text = document.createElement("p")
        p_msg_text = input_text.value
        li_new_message.appendChild(p_msg_text)
        document.main.appendChild(li_new_message)
    })
});