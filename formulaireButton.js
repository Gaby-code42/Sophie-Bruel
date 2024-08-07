const changementImg = document.getElementById('changement-img');
let originalContent = changementImg.innerHTML


    


export async function formulaireButton (){
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    
    const uniqueCategories = new Set();

    works.forEach(work => {
        uniqueCategories.add(work.category.name);
      });

    const categoriesArray = Array.from(uniqueCategories);  
    
    console.log(categoriesArray)

    const containerSelect = document.querySelector('.form-catSelect')

    const selectForm = document.createElement('select')
    selectForm.id='category'
    selectForm.name='category'
    containerSelect.appendChild(selectForm)

    const selectFunction = document.getElementById('category')

    selectFunction.innerHTML=''

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.text = ''
    selectFunction.appendChild(defaultOption)

    categoriesArray.forEach(category => {
        const option = document.createElement('option')
        option.value = category
        option.text = category
        selectFunction.appendChild(option)

        selectFunction.addEventListener('change', async (event) => {
            const selectedCategory = event.target.value
            if(selectedCategory){console.log(selectedCategory)}
        })
    })

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
    const titleButton = document.querySelector('.form-catTitle')

    const inputTitle = document.createElement('input')
    inputTitle.type = 'text'
    inputTitle.id = 'title'
    inputTitle.name = 'title'
    titleButton.appendChild(inputTitle)

    inputTitle.addEventListener('change',async (event) =>{
        const inputTitle = event.target.value
        if(inputTitle){console.log(inputTitle)}

    })
    
    //<button type="submit" class="submit-button" id="form-validation">Valider</button>

    const submitCase = document.querySelector('.form-submit')
    const inputSummit = document.createElement('button')
    inputSummit.type = 'submit'
    inputSummit.classList.add('submit-button')
    inputSummit.id = 'form-validation'
    inputSummit.innerText = "Valider"
    submitCase.appendChild(inputSummit)

    function validation (){

    }
}