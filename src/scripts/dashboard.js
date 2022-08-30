import {
    Requisicao
} from "../controller/request.js";


class RenderPagePosts {

    static userId = localStorage.getItem('userId')

    static renderHeader(data) {
        const container = document.querySelector('.container')
        const userContainer = document.querySelector('.user_container')

        const userAvatar = document.createElement('img')
        const userName = document.createElement('p')
        const userLogoutBtn = document.createElement('logout')
        userLogoutBtn.addEventListener('click', (event) =>{
            event.preventDefault()
            localStorage.clear()
            window.location.assign('../../index.html')
        })

        userAvatar.classList.add('user_avatar')
        userName.classList.add('user_name')
        userLogoutBtn.classList.add('user_logout_btn')

        userAvatar.src = data.avatarUrl
        userName.innerText = data.username
        userLogoutBtn.innerText = 'Logout'

        userContainer.append(userAvatar, userName)
        container.append(userContainer, userLogoutBtn)

    }

    static renderPosts(base) {
        const postContainerDiv = document.querySelector('.post_container_div')
        postContainerDiv.innerHTML = ''

           base.data.forEach((element) => {
            const postBgColor = document.createElement('div')
            const postDivImgBtn = document.createElement('div')
            const postAvatar = document.createElement('img')
            const postContainerBtn = document.createElement('div')


            const postDivText = document.createElement('div')
            const postUser = document.createElement('h2')
            const postText = document.createElement('p')
            const divData = document.createElement('div')
            const postData = document.createElement('p')

            postBgColor.classList.add('post_bg_color')
            postDivImgBtn.classList.add('post_div_img_btn')
            postAvatar.classList.add('post_avatar')
            postContainerBtn.classList.add('post_container_btn')

            postDivText.classList.add('post_div_text')
            postUser.classList.add('post_user')
            postText.classList.add('post_text')
            postData.classList.add('post_data')
            divData.classList.add('div_data')

            postAvatar.src = element.user.avatarUrl
            postUser.innerText = element.user.username
            postText.innerText = element.content
            postData.innerText = element.createdAt.substring(1, 10).split('-').reverse().join('/') 

            postDivText.append(postUser, postText)

            postDivImgBtn.append(postAvatar, postContainerBtn)
            divData.append(postData)
            postBgColor.append(postDivImgBtn, postDivText, divData)
            postContainerDiv.append(postBgColor)

            if (this.userId == element.user.id) {
                const postEditBtn = document.createElement('button')
                const postDeleteBtn = document.createElement('button')
                const imgEdit = document.createElement('img')
                const imgDelete = document.createElement('img')

                imgEdit.src = "../assets/edit.png"
                imgEdit.width = 15

                imgDelete.src = "../assets/delete.png"
                imgDelete.width = 15



                postEditBtn.classList.add('post_edit_btn')
                postDeleteBtn.classList.add('post_delete_btn')

                postDeleteBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    const deletar = document.querySelector('.delete')
                    deletar.classList.remove('close_modal')

                    const deletBtn = document.querySelector('.delete_btn') 
                    deletBtn.addEventListener('click', async (event) =>{
                        event.preventDefault()

                        await Requisicao.deletePost(element.id)

                        deletar.classList.add('close_modal')

                        const arrayDados = await Requisicao.renderPage(1)

                        RenderPagePosts.renderPosts(arrayDados)

                    })
                })

                postEditBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    const edit = document.querySelector('.edit')
                    edit.classList.remove('close_modal')

                    const editPostBtn = document.querySelector('.edit_post_btn')
                    editPostBtn.addEventListener('click', async (event) => {
                        event.preventDefault()
                        const newContent = document.querySelector('.new_content')

                        const base = {
                            content: newContent.value
                        }
                        await Requisicao.editPost(base, element.id)

                        edit.classList.add('close_modal')

                        const arrayDados = await Requisicao.renderPage(1)

                        RenderPagePosts.renderPosts(arrayDados)

                    })
                })

                postDeleteBtn.append(imgDelete)
                postEditBtn.append(imgEdit)
                postContainerBtn.append(postEditBtn, postDeleteBtn)
            }
        })
    }
    static createPost() {
        const userPost = document.querySelector('.user_post')
        const userPostBtn = document.querySelector('.user_post_btn')

        userPostBtn.addEventListener('click', async (event) => {
            event.preventDefault()

            const base = {
                content: userPost.value
            }
            await Requisicao.createPost(base)
            const page = await Requisicao.renderPage(1)
            const homePage = RenderPagePosts.renderPosts(page)
            
            userPost.value = ''
            
            return homePage

        })
    }
}

const arrayDados = await Requisicao.renderPage(1)

const userById = await Requisicao.userById(RenderPagePosts.userId)

RenderPagePosts.renderPosts(arrayDados)
RenderPagePosts.renderHeader(userById)
RenderPagePosts.createPost()