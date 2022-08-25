export class Requisicao {
    static baseUrl = `https://blog-m2.herokuapp.com`

    static headers = {
        'Content-Type': 'application/json'
    }

    static async userLogin(data) {
        const base = await fetch(`${this.baseUrl}/users/login`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('userId', res.userId)
                localStorage.setItem('token', res.token)
                window.location.assign("../pages/dashboard.html")
                console.log(res)
            })
            .catch(err => console.log(err))

        return base
    }

    static async createUser(data) {
        const base = await fetch(`${this.baseUrl}/users/register`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                window.location.assign("../../index.html")
                return res
            })
            .catch(err => console.log(err))
    }

}