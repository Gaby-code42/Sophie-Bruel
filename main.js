import {afficheImages, setupButtons} from './triage.js'

import { swapModal, modalButton} from './modal.js';

import { formulaireButton } from './ajoutprojet.js';

import {EmailButton, loginButton} from './login.js'

const galleryFigure = document.querySelector(".gallery");
const modalImgList = document.querySelector('.modal-content');


//code pour les images//
async function fetchImages(){
const reponse = await fetch('http://localhost:5678/api/works');
const images = await reponse.json();
    console.log(images)
    return images;
    }

// fonction pour initialiser l'import et le lancement de "l'appli"//

async function init() {
    const ApiImages = await fetchImages();
    
    afficheImages(ApiImages, galleryFigure);
    afficheImages(ApiImages,modalImgList)

    setupButtons(ApiImages, galleryFigure);

    loginButton(); 
    swapModal(); 
    modalButton();
    formulaireButton();
    EmailButton();      
}

init();