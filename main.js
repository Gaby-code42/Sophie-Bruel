import {afficheImages} from './triage.js'

import {setupButtons} from './triage.js'

import { swapModal} from './modal.js';

import { modalButton } from './croixmodal.js';

import { formulaireButton } from './Ajoutprojet.js';

import {EmailButton, loginButton} from './login.js'

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
    formulaireButton();
    EmailButton();
    loginButton();    
    swapModal();    
}

init();