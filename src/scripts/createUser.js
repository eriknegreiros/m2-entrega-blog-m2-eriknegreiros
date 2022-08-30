import {
    Requisicao
} from "../controller/request.js"

class CreateUser {

    static create() {

        const username = document.querySelector('.createUser_username')
        const email = document.querySelector('.createUser_email')
        const foto = document.querySelector('.createUser_foto')
        const pasword = document.querySelector('.createUser_senha')
        const button = document.querySelector('.createUser_btn')

        button.addEventListener('click', async (event) => {
            event.preventDefault()

            const data = {
                username: username.value,
                email: email.value,
                avatarUrl: foto.value,
                password: pasword.value
            }
            await Requisicao.createUser(data)
        })


    }

}

CreateUser.create()