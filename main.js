import { afficheImages } from './images.js'

import { setupButtons } from './bouton.js'

import {loginButton} from './login.js'

import { Emailbutton } from './Email&Password.js';

import { modalbutton} from './modal.js';


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
    loginButton();
    Emailbutton();
    modalbutton();
}

init();