export function setupButtons(images, galleryFigure) {
    const boutonObjet = document.querySelector('.btn-objet');
    const boutonAppartement = document.querySelector('.btn-appartement');
    const boutonHotel = document.querySelector('.btn-hotel');
    const boutonTous = document.querySelector('.btn-default');

    boutonObjet.addEventListener("click", function() {
        const objetFiltrees = images.filter(userImg => userImg.category.name === 'Objets');
        afficheImages(objetFiltrees, galleryFigure);
    });

    boutonAppartement.addEventListener("click", function() {
        const appartementFiltrees = images.filter(userImg => userImg.category.name === 'Appartements');
        afficheImages(appartementFiltrees, galleryFigure);
    });

    boutonHotel.addEventListener("click", function() {
        const hotelFiltrees = images.filter(userImg => userImg.category.name === 'Hotels & restaurants');
        afficheImages(hotelFiltrees, galleryFigure);
    });

    boutonTous.addEventListener("click", function() {
        afficheImages(images, galleryFigure);
    });

    const boutonsHover = document.querySelectorAll('.bouton');

    boutonsHover.forEach(boutonHover => {
        boutonHover.addEventListener('click', () => {
            boutonsHover.forEach(bouton => bouton.classList.remove('bouton-active'));
            boutonHover.classList.add('bouton-active');
        });
    });

    boutonTous.click()
}

const galleryFigure = document.querySelector(".gallery");

const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();

export function afficheImages(images){

    galleryFigure.textContent=""
    

    for (const image of images) {

        const figure = document.createElement('figure')
        galleryFigure.appendChild(figure)

        const imgFigure = document.createElement('img');
        imgFigure.src = image.imageUrl;
        figure.appendChild(imgFigure)
    
        const figureElement = document.createElement("p");
        figureElement.innerText = image.title;
        figure.appendChild(figureElement)
        }
}

afficheImages(ApiImages)