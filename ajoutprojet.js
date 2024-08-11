

//variable checking//

let selectedCategory = '';
let inputTitle = '';
let isImageValid = false; 
let isCategoryValid = false; 
let isTitleValid = false; 
let storedImage = null

export async function formulaireButton() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    //formulaire categories//  je dois créer le label de facon dynamique 

    const uniqueCategories = new Map();
    works.forEach(work => {
        uniqueCategories.set(work.category.id, work.category.name);
    });

    const selectFunction = document.getElementById('category');
    selectFunction.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '';
    selectFunction.appendChild(defaultOption);

    uniqueCategories.forEach((name, id) => {
        const option = document.createElement('option');
        option.value = id;
        option.text = name;
        selectFunction.appendChild(option);
    });

    selectFunction.addEventListener('change', (event) => {
        selectedCategory = event.target.value;

        console.log('Selected Category ID:', selectedCategory);

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
    const imageContainer = document.getElementById('imageContainer')
    const changementImg = document.getElementById('changement-img')
    let inputImg = document.querySelector('.photo-upload')
    const selectedImage = document.getElementById('selectedImage')
    

    

    inputImg.addEventListener('change', function(event){
        const file = event.target.files[0]

        if(file){
            const reader = new FileReader()

            reader.onload = (e) => {
                selectedImage.src = e.target.result;
                imageContainer.style.display ='flex'
                changementImg.style.display='none'
                storedImage = file
                isImageValid = true
                checkFormCompletion()
            }
            reader.readAsDataURL(file)
            inputImg.value = ''
        } else {
            imageContainer.style.display = 'none'
            changementImg.style.display= 'flex' 
            isImageValid = false  
            checkFormCompletion()        
        }
    })

    selectedImage.addEventListener('click', () => {
        photoUpload.click(); 
    });

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
            const formData = new FormData();        
            
            formData.append('title', inputTitle);
            formData.append('category', selectedCategory);
            formData.append('image', storedImage);
            
                const response = await fetch('http://localhost:5678/api/works', {
                        method: 'POST',
                        headers:{
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData

                });
                const data = await response.json();
                console.log(data);

                window.location.reload();
                }
}    
