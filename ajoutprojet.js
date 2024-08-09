

//variable checking//

let selectedCategory = '';
let selectedImage = null;
let inputTitle = '';
let isImageValid = false; 
let isCategoryValid = false; 
let isTitleValid = false; 

export async function formulaireButton() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    //formulaire categories//  je dois créer le label de facon dynamique 

    const uniqueCategories = new Set();
    works.forEach(work => {
        uniqueCategories.add(work.category.name);
    });

    const categoriesArray = Array.from(uniqueCategories);  

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

    // formulaire titre // 

    let inputTitleElement = document.getElementById('title')

    inputTitleElement.addEventListener('change', (event) => {
        inputTitle = event.target.value;
        isTitleValid = !!inputTitle;
        checkFormCompletion();
    });

    // formulaire Image //  
    const changementImg = document.getElementById('changement-img')
    let inputImg = document.querySelector('.photo-upload')
    const selectedImage = document.getElementById('selectedImage')
    const imageContainer = document.getElementById('imageContainer')

    let storedImage = null

    inputImg.addEventListener('change', function(event){
        const file = event.target.files[0]

        if(file){
            const reader = new FileReader()

            reader.onload = (e) => {
                selectedImage.src = e.target.result;
                imageContainer.style.display ='block'
                changementImg.style.display='none'
                storedImage = file
                isImageValid = true
                checkFormCompletion()
            }
            reader.readAsDataURL(file)
        } else {
            imageContainer.style.display = 'none'
            changementImg.style.display= 'block' 
            isImageValid = false  
            checkFormCompletion()        
        }
    })

    
    

    selectedImage.addEventListener('click', () => {
        photoUpload.click(); 
    });

    function getStoredImage() {
        return storedImage;
    }

    

    
    // permet de valider mon if //

    function checkFormCompletion() {
        const submitButton = document.getElementById('form-validation');
        if (isImageValid && isCategoryValid && isTitleValid) {
            submitButton.disabled = false;
            inputSubmit.style.backgroundColor = '#1D6154';
        } else {
            submitButton.disabled = true;            
        }
    }
    
    //bouton submit//

    let  inputSubmit = document.querySelector('.submit-button')

    inputSubmit.addEventListener('click', async () => {
        if (isImageValid && isCategoryValid && isTitleValid) {
            await submitForm();
            console.log('click')
        }
    })
   
        async function submitForm() {

            const token = sessionStorage.getItem('authToken');

            const imageFile = inputImg.files[0];
             
            console.log(imageFile)

            const formPost = {
                title: inputTitle,
                category: selectedCategory,
                image: imageFile,
            }



            const ChargeUtileAjout = JSON.stringify(formPost)
        
             {
                const response = await fetch('http://localhost:5678/api/works', {
                        method: 'POST',
                        headers:{
                            'Authorization': `Bearer ${token}`
                        },
                        body: ChargeUtileAjout

                });
                const data = await response.json();
                console.log(data);
                }
}    
}