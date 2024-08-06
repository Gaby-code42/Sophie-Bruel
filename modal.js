import { modalButton } from './croixmodal.js';

const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();
const modalWrapper = document.querySelector('.modal-wrapper')

export function afficheImages(images){
    
    modalButton();    

    const buttonReturn = document.createElement('button')
    buttonReturn.innerHTML='<i class="fa-solid fa-arrow-left">'
    buttonReturn.classList.add('js-modal-return','modal-ajout')
    modalWrapper.appendChild(buttonReturn)

    const btnClose = document.createElement('button')
    btnClose.classList.add('js-modal-close')
    btnClose.id='close-modal'
    btnClose.innerHTML='<i class="fa-solid fa-xmark">'
    modalWrapper.appendChild(btnClose)

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
        imageModal.id = user.id
        imageModal.classList.add('image-modal','hidden-mod')
        figureModal.appendChild(imageModal)     

        btnSupprimer.addEventListener('click',function(){
            console.log('click')
            supprimerImage(user.id);
        })
    }

    //suppression image//

    async function supprimerImage(imageId) {
        const token = sessionStorage.getItem('authToken'); 
    
            const reponseDelete = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (reponseDelete.ok) {
                console.log('Image supprimée avec succès');
            } else if (reponseDelete.status === 401) {
                console.log('Non autorisé');
            } else if (reponseDelete.status === 404) {
                console.log('Image non trouvée');
            } else {
                console.log('Erreur lors de la suppression de l\'image');
            }
    
            const reponseImages = await fetch('http://localhost:5678/api/works');
            const ApiImages = await reponseImages.json();
            afficheImages(ApiImages);
    
    }
    
    const btnAjout = document.createElement('button')
        btnAjout.classList.add('modal-button-ajout','hidden-mod')
        btnAjout.innerText="Ajouter une photo"
        modalWrapper.appendChild(btnAjout)

}

afficheImages(ApiImages)

export function swapModal() {
       
    const buttonSwap = document.querySelector('.modal-button-ajout');
    const buttonReturn = document.querySelector('.js-modal-return');
    

    buttonSwap.addEventListener('click', function() {
        modalWrapper.style.height = '670px';

        const elementsToHide = document.querySelectorAll('.hidden-mod');
        elementsToHide.forEach(element => {
            element.style.display = 'none';
        });

        const showHideElements = document.querySelectorAll('.modal-ajout');
        showHideElements.forEach(element => {
            element.style.display = 'flex';
        });
    });

        buttonReturn.addEventListener('click', function() {
            const elementsToShow = document.querySelectorAll('.hidden-mod');
            elementsToShow.forEach(element => {
                element.style.display = 'flex';
            });
            const elementsToHide = document.querySelectorAll('.modal-ajout');
            elementsToHide.forEach(element => {
                element.style.display = 'none';
            });
            modalWrapper.style.height = '680px';
        });
    }

document.getElementById('photoUpload').addEventListener('change',function(event){
    const clickImg = event.target.files[0];
    const fileRead = new FileReader();
    const changementImg=document.getElementById('changement-img')

    fileRead.onload = function(e){
        const imgAjoutModal = document.createElement('img')
            imgAjoutModal.src = e.target.result;
            changementImg.innerHTML='';
            changementImg.appendChild(imgAjoutModal);
            
        }
        if (clickImg) {
            fileRead.readAsDataURL(clickImg);
        }
        }
    )
    
