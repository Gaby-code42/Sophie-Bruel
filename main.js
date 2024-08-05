import {afficheImages} from './images.js'

import {setupButtons} from './bouton.js'

import { EmailButton} from './formulaire.js'

import { swapModal } from './modal.js';

import { loginButton } from './login.js';

import { modalButton } from './croixmodal.js';




const galleryFigure = document.querySelector(".gallery");

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
    setupButtons(ApiImages, galleryFigure);
    modalButton();
    EmailButton();
    loginButton();    
    swapModal();
}

init();