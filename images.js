

const galleryFigure = document.querySelector(".gallery");

const reponse = await fetch('http://localhost:5678/api/works');
const ApiImages = await reponse.json();
      console.log(ApiImages)

export function afficheImages(images){

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