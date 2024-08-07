const changementImg = document.getElementById('changement-img');
let originalContent = changementImg.innerHTML

const response = await fetch('http://localhost:5678/api/works')
const formSelect = await response.json();
        if (response.ok){console.log('bob')}


export function formulaireButton (){

    async function categoryOptions() {
        const response = await fetch(URL)
        if (!response.ok){console.log("c'est bon frero j'ai les infos")}
        
    }
    categoryOptions()



    const photoButton = document.querySelector('.photo-button')

    const inputImg = document.createElement('input')
    inputImg.type='file'
    inputImg.accept='.jpg, .jpeg, .png'
    inputImg.classList.add('photo-upload')
    inputImg.id='photoUpload'
    photoButton.appendChild(inputImg)


inputImg.addEventListener('change', function(event) {
    const clickImg = event.target.files[0]
    const fileRead = new FileReader()
    

    fileRead.onload = function(e) {
        const imgAjoutModal = document.createElement('img');
        imgAjoutModal.src = e.target.result;
        changementImg.innerHTML = '';
        changementImg.appendChild(imgAjoutModal);

        imgAjoutModal.addEventListener('click', function() {
            inputImg.click();
        });
    };

    if (clickImg) {
        fileRead.readAsDataURL(clickImg);
    }else{changementImg.innerHTML = originalContent;
        formulaireButton();
        categoryOptions()
    }
})

//<input type="text" id="title" name="title">
    const titleButton = document.querySelector('.form-catTitle')

    const inputTitle = document.createElement('input')
    inputTitle.type = 'text'
    inputTitle.id='title'
    inputTitle.name = 'title'
    titleButton.appendChild(inputTitle)
    
   
}