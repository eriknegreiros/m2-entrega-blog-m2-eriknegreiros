export class Popup{

    static popupError (){
       const body = document.querySelector('body')
        const popup = document.createElement('div')
        const errorPopup = document.createElement('p')
        const errorMsg = document.createElement('p')


        popup.classList.add('popup')
        errorPopup.classList.add('error_popup')
        errorMsg.classList.add('error_msg')

        errorPopup.innerText = 'Erro ao Cadastrar Usuário'

        popup.append(errorPopup, errorMsg)
        body.append(popup)

        return [errorMsg]
    }

    static popupSucees (){
        const body = document.querySelector('body')
         const popup = document.createElement('div')
         const errorPopup = document.createElement('p')
         const errorMsg = document.createElement('p')
 
 
         popup.classList.add('popup_sucess')
         errorPopup.classList.add('text_popup')
        

         errorPopup.innerText = 'Sucesso ao Cadastrar Usuário'
 
         popup.append(errorPopup, errorMsg)
         body.append(popup)
 
    
     }

}

