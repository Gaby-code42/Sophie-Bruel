//<button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();



const modalWrapper = document.querySelector('.modal-wrapper')

export function modalButton (){
    const modalWrapper = document.querySelector('.modal-wrapper')
    const buttonClose = document.createElement('button')
    buttonClose.innerHTML='<i class="fa-solid fa-xmark"></i>';
    buttonClose.classList.add('js-modal-close')
    modalWrapper.appendChild(buttonClose)
}

export function afficheImages(images){
    modalButton();

    const modalImgList = document.createElement('div')
    modalImgList.classList.add('modal-content')
    modalWrapper.appendChild(modalImgList)

    for (const user of images) {
        
        
        const figureModal = document.createElement('div')
        figureModal.classList.add('image-container')
        modalImgList.appendChild(figureModal)
        

        
        const imageModal = document.createElement('img');
        imageModal.src = user.imageUrl
        imageModal.classList.add('image-modal')
        figureModal.appendChild(imageModal)
    }
}

afficheImages(ApiImages)








