const galleryFigure = document.querySelector(".gallery");
//code pour les images//
const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();
console.log(ApiImages)

function afficheImages(images){

    galleryFigure.textContent=""

    for (const user of images) {

        const figure = document.createElement('figure')
        galleryFigure.appendChild(figure)

        const imgFigure = document.createElement('img');
        imgFigure.src = user.imageUrl;
        figure.appendChild(imgFigure)
    
        const figureElement = document.createElement("p");
        figureElement.innerText = user.title;
        figure.appendChild(figureElement)
       
    }
}

afficheImages(ApiImages)


const boutonObjet = document.querySelector('.btn-objet');
const boutonAppartement = document.querySelector('.btn-appartement');
const boutonHotel = document.querySelector('.btn-hotel');
const boutonTous = document.querySelector('.btn-default')

    boutonObjet.addEventListener("click",function(){
        const objetFiltrees = ApiImages.filter(function(userImg){
            return userImg.category.name === 'Objets';})
            afficheImages(objetFiltrees)
    });


    boutonAppartement.addEventListener("click",function(){
        const appartementFiltrees = ApiImages.filter(function(userImg){
            return userImg.category.name === 'Appartements';})
            afficheImages(appartementFiltrees)
    });
    
    boutonHotel.addEventListener("click",function(){
        const hotelFiltrees = ApiImages.filter(function(userImg){
            return userImg.category.name === 'Hotels & restaurants';})
            afficheImages(hotelFiltrees)
    });
//triche ?//
    boutonTous.addEventListener("click",function(){
        const defaultFiltrees = ApiImages.filter(function(userImg){
            return userImg.category.name !=='';
        })
        afficheImages(defaultFiltrees)
    })








