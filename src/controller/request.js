import {
    Popup
} from "../scripts/popup.js"

export class Request {
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
                return res
            })
            .catch(err => console.log(err))

        return base
    }

    static async createUser(data) {
        return await fetch(`${this.baseUrl}/users/register`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(async res => {
                return {
                    res: await res.json(),
                    ok: res.ok
                }
            })
            .then(res => {
                if (!res.ok) {
                    const popup = Popup.popupError()
                    popup[0].innerText = res.res.message
                } else if (res.ok) {
                    Popup.popupSucees()
                }
            })
            .catch(err => console.log(err))
    }

    static async renderPage(page) {
        return await fetch(`${this.baseUrl}/posts?page=${page}`, {
                method: 'GET',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }

    static async userById(id) {
        return await fetch(`${this.baseUrl}/users/${id}`, {
                method: 'GET',
                headers: this.headers,

            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

    }

    static async postById(id) {
        return await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'GET',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
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
        return await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }

    static async deletePost(id) {
        const base = await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => err)

        return base
    }

}