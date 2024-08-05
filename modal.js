import { modalButton } from './croixmodal.js';

//<button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();
const modalWrapper = document.querySelector('.modal-wrapper')


export function afficheImages(images){
    
    modalButton();

    const buttonReturn = document.createElement('button')
    buttonReturn.innerHTML='<i class="fa-solid fa-arrow-left">'
    buttonReturn.classList.add('js-modal-return','modal-ajout')
    modalWrapper.appendChild(buttonReturn)

    const textModal = document.createElement('p')
    textModal.innerText='Galerie photo'
    modalWrapper.appendChild(textModal)
    textModal.classList.add('galerie-photo','hidden-mod')

    const modalImgList = document.createElement('div')
    modalImgList.classList.add('modal-content','hidden-mod')
    modalWrapper.appendChild(modalImgList)

    for (const user of images) {
        
        
        const figureModal = document.createElement('div')
        figureModal.classList.add('image-container','hidden-mod')
        modalImgList.appendChild(figureModal)

        const btnSupprimer = document.createElement('button')
        btnSupprimer.classList.add('modal-button-remove','hidden-mod')
        btnSupprimer.innerHTML='<i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>'
        figureModal.appendChild(btnSupprimer)
                
        const imageModal = document.createElement('img');
        imageModal.src = user.imageUrl
        imageModal.classList.add('image-modal','hidden-mod')
        figureModal.appendChild(imageModal)
    }

    const btnAjout = document.createElement('button')
    btnAjout.classList.add('modal-button-ajout','hidden-mod')
    btnAjout.innerText="Ajouter une photo"
    modalWrapper.appendChild(btnAjout)

}

afficheImages(ApiImages)

export function swapModal() {
    const buttonSwap = document.querySelector('.modal-button-ajout');
    buttonSwap.addEventListener('click', function() {        
        const elementsToHide = document.querySelectorAll('.hidden-mod');
        elementsToHide.forEach(element => {
            element.style.display = 'none';
        
        const showHideElements = document.querySelectorAll('.modal-ajout')
        showHideElements.forEach(element => {
            element.style.display = 'flex';

        const btnClose = document.querySelector(".js-modal-close")
            btnClose.addEventListener('click',function(){
            const elementsToHide = document.querySelectorAll('.hidden-mod');
                elementsToHide.forEach(element => {
                element.style.display = 'flex';
        })
        })
    })

    const buttonReturn = document.querySelector('.js-modal-return')
    buttonReturn.addEventListener('click',function(){
        const elementsToHide = document.querySelectorAll('.hidden-mod');
                elementsToHide.forEach(element => {
                element.style.display = 'flex';})
        
                const showHideElements = document.querySelectorAll('.modal-ajout')
                showHideElements.forEach(element => {
                    element.style.display = 'none';})
    })


})
})
} 
    
