const changementImg = document.getElementById('changement-img');
let originalContent = changementImg.innerHTML;

//variable checking//

let selectedCategory = '';
let imgAjoutModal = null;
let inputTitle = '';
let isImageValid = false; 
let isCategoryValid = false; 
let isTitleValid = false; 



export async function formulaireButton() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    //formulaire categories//

    const uniqueCategories = new Set();
    works.forEach(work => {
        uniqueCategories.add(work.category.name);
    });

    const categoriesArray = Array.from(uniqueCategories);  

    const containerSelect = document.querySelector('.form-catSelect');
    const selectForm = document.createElement('select');
    selectForm.id = 'category';
    selectForm.name = 'category';
    containerSelect.appendChild(selectForm);

    const selectFunction = document.getElementById('category');
    selectFunction.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '';
    selectFunction.appendChild(defaultOption);

    categoriesArray.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        selectFunction.appendChild(option);
    });

    selectFunction.addEventListener('change', (event) => {
        selectedCategory = event.target.value;
        isCategoryValid = !!selectedCategory;
        checkFormCompletion();
    });

    // formulaire Image //
    const photoButton = document.querySelector('.photo-button');
    const inputImg = document.createElement('input');
    inputImg.type = 'file';
    inputImg.accept = '.jpg, .jpeg, .png';
    inputImg.classList.add('photo-upload');
    inputImg.id = 'photoUpload';
    photoButton.appendChild(inputImg);

    inputImg.addEventListener('change', function(event) {
        const clickImg = event.target.files[0];
        const fileRead = new FileReader();

        fileRead.onload = function(e) {
            imgAjoutModal = document.createElement('img');
            imgAjoutModal.src = e.target.result;
            changementImg.innerHTML = '';
            changementImg.appendChild(imgAjoutModal);

            imgAjoutModal.addEventListener('click', function() {
                inputImg.click();
            });

            isImageValid = !!imgAjoutModal.src;
            checkFormCompletion();
        };

        if (clickImg) {
            fileRead.readAsDataURL(clickImg);
        } else {
            changementImg.innerHTML = originalContent;
            formulaireButton();
        }
    });

    // formulaire titre //
    const titleButton = document.querySelector('.form-catTitle');
    const inputTitleElement = document.createElement('input');
    inputTitleElement.type = 'text';
    inputTitleElement.id = 'title';
    inputTitleElement.name = 'title';
    titleButton.appendChild(inputTitleElement);

    inputTitleElement.addEventListener('change', (event) => {
        inputTitle = event.target.value;
        isTitleValid = !!inputTitle;
        checkFormCompletion();
    });

    function checkFormCompletion() {
        const submitButton = document.getElementById('form-validation');
        if (isImageValid && isCategoryValid && isTitleValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    
    //bouton submit//

    const submitCase = document.querySelector('.form-submit');
    const inputSubmit = document.createElement('button');
    inputSubmit.type = 'submit';
    inputSubmit.classList.add('submit-button');
    inputSubmit.id = 'form-validation';
    inputSubmit.innerText = "Valider";
    inputSubmit.disabled = true;
    submitCase.appendChild(inputSubmit);

    inputSubmit.addEventListener('click', () => {
        if (isImageValid && isCategoryValid && isTitleValid) {
            console.log("frero ca marche");
            
        }
    });
}