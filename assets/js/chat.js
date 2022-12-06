document.addEventListener('DOMContentLoaded', function() {
    let submit = document.querySelector(".botao-enviar")
    submit.addEventListener("click", function () {
        let input_text = document.querySelector(".entrada-msg")
        let message_list = document.querySelector("#mensagens")
        let last_message = message_list.querySelectorAll("li")[message_list.children.length-1]

        let li_new_message = document.createElement("li")
        li_new_message.classList.add("mensagem_usuario")

        let p_message_text = document.createElement("p")
        p_message_text.innerHTML = input_text.value
        input_text.value = ""

        if (last_message.className == "mensagem_usuario") {
            p_message_text.classList.add('balao_depois')
            li_new_message.appendChild(p_message_text)

        } else {
            p_message_text.classList.add('balao_antes')
            li_new_message.appendChild(p_message_text)

            let img_user = document.createElement("img")
            img_user.classList.add("perfil")
            img_user.src = src="./assets/img/usuario_anonimo.png"
            img_user.alt = "Usuário em anônimo"
            li_new_message.appendChild(img_user)

        }
        message_list.appendChild(li_new_message)
    })
});

{/* <li>
    <p  class=" balao_antes">Hoje o dia ta sendo cansativo. Estou no intervalo do cursinho e me sinto mentalmente esgotado...</p>
    <img class="perfil" src="./assets/img/perfil.png"   alt="Perfil"> 
</li> */}