
  
  export function EmailButton(){
      const formulaireLogin =document.querySelector('.formulaire-login');
      formulaireLogin.addEventListener("submit",function(event){
          event.preventDefault();
  
          const log = {
              email:event.target.querySelector("[name=email]").value,
              password:event.target.querySelector("[name=password]").value,
          };
          console.log(log);
  
          const emailRegex=/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]/;;
          const passwordRegex=/[a-z0-9._-]/;
  
          if (!emailRegex.test(log.email)){
              document.getElementById('error-message').innerText = "format de l'email non conforme";
              return;
          }
          if(!passwordRegex.test(log.password)){
              document.getElementById('error-message').innerText = "format du mot de passe non conforme";
              return;
          }
  
          const chargeUtile = JSON.stringify(log)
          
          fetch('http://localhost:5678/api/users/login', {
              method:"POST",
              body:chargeUtile,
              headers: { "Content-Type": "application/json" }
          })
          .then(response => {
              if (response.status === 200) {
                return response.json();
              }  else {  
                throw new Error('Une erreur s\'est produite. Veuillez réessayer plus tard.');
              }
            }) 
            .then(data => {
              const token = data.token;
              connexionSucces(data, token);
              console.log(data)
              window.location.reload()
            })
  
      })
  }

export function loginButton (){
    const boutonLogin = document.querySelector('#btn-login')

    boutonLogin.addEventListener('click',function(){
        document.getElementById('before-login').style.display ='none';
        document.getElementById('login').style.display = 'block';
    })
}

function connexionSucces(data, token){
    document.getElementById('before-login').style.display ='block';
    document.getElementById('login').style.display = 'none';
    sessionStorage.setItem('authToken', token);
    editButton();
  }

  document.addEventListener("DOMContentLoaded",function(){
    if (sessionStorage.getItem('authToken')){
      editButton();
    }
  })

    function editButton(){
    let editBtn = document.createElement("a")
    editBtn.href="#modal1" 
    editBtn.classList.add('js-modal')
    editBtn.id='text-projet'
    editBtn.innerHTML='<i class="fa-solid fa-pen-to-square"></i> modifier'
  
    const adminAction = document.querySelector('.admin-action')
    adminAction.appendChild(editBtn)
  }