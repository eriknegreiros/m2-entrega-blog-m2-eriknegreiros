export class Requisicao {
    static baseUrl = `https://blog-m2.herokuapp.com`

    static token = localStorage.getItem('token')

    static headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
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
        return base
    }

    static async renderPage(data, page) {
        const base = await fetch(`${this.baseUrl}/posts?page=${page}`, {
                method: 'GET',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base
    }

    static async renderPage(data, id) {
        const base = await fetch(`${this.baseUrl}/users/${id}`, {
                method: 'GET',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base
    }

    static async postById(id) {
        const base = await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'GET',
                headers: this.headers
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base
    }

    static async createPost(data) {
        const base = await fetch(`${this.baseUrl}/posts`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base
    }


    static async editPost(data, id) {
        const base = await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base
    }

    static async deletePost(data, id) {
        const base = await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'DELETE',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => err)

        return base
    }

}