    
    // Sert à ouvrir la modal //
    
    export function modalButton (){
    const changementImg = document.getElementById('changement-img')
    const imageContainer = document.getElementById('imageContainer')  
    let modal = null
      
      const openModal = function(e){
          e.preventDefault()
          const target = document.querySelector(e.target.getAttribute('href'))
          target.style.display = null;
          target.removeAttribute('aria-hidden')
          target.setAttribute('aria-modal', 'true')
          modal = target
          modal.addEventListener('click',closeModal)
          modal.querySelector('.js-modal-close-ajout').addEventListener('click',closeModal)
          modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
          modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)    
          
      }
      
      const closeModal = function(e){
        if (modal === null) return
        e.preventDefault()
        modal.style.display = "none"
        modal.setAttribute('aria-hidden','true')
        modal.removeAttribute('aria-modal')
        modal.removeEventListener('click',closeModal)
        modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
        modal.querySelector('.js-modal-stop').removeEventListener('click',stopPropagation)
        modal = null
        imageContainer.style.display = 'none'
        changementImg.style.display= 'flex' 
        }
      
      const stopPropagation=function(e){
        e.stopPropagation()
      }
      
      document.querySelectorAll('.js-modal').forEach(a=>{
        a.addEventListener('click',openModal)
        }
      )
    }

const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();
const modalWrapper = document.querySelector('.modal-wrapper')



export function afficheImages(images){
    
    const modalImgList = document.querySelector('.modal-content')
    modalImgList.innerHTML = ''
    
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

            modalWrapper.style.height = '680px';

            const elementsToShow = document.querySelectorAll('.hidden-mod');
            elementsToShow.forEach(element => {
                element.style.display = 'block';
            });
            const elementsToHide = document.querySelectorAll('.modal-ajout');
            elementsToHide.forEach(element => {
                element.style.display = 'none';
            });
            modalWrapper.style.height = '680px';

            const changementImg = document.getElementById('changement-img')
            const imageContainer = document.getElementById('imageContainer')
            imageContainer.style.display = 'none'
            changementImg.style.display= 'flex'           
             
        });

        
}

        
          
          
    

    