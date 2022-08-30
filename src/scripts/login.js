import {
    Request
} from "../controller/request.js"




class LoginPage {

    static renderLoginPage() {
        const inputEmail = document.querySelector('.login_email')
        const inputPassword = document.querySelector('.login_password')
        const button = document.querySelector('.login_btn')

        button.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                email: inputEmail.value,
                password: inputPassword.value
            }

            await Request.userLogin(data)
                window.location.assign('./src/pages/dashboard.html')
        })
    }
}

LoginPage.renderLoginPage()