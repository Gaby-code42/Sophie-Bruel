function connexionSucces (data){

        document.getElementById('before-login').style.display ='block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('text-projet').style.display ='block';
}

export function Emailbutton (){
    const formulaireLogin =document.querySelector('.formulaire-login');
    formulaireLogin.addEventListener("submit",function(event){
        event.preventDefault();

        const log = {
            email:event.target.querySelector("[name=email-login]").value,
            password:event.target.querySelector("[name=password-login]").value,
        };
        console.log(log);

        const chargeUtile = JSON.stringify(log)
        
        fetch('http://localhost:5678/api/users/login', {
            method:"POST",
            body:chargeUtile,
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 401) {
              throw new Error('Non autorisé. Vérifiez votre nom d\'utilisateur et votre mot de passe.');
            } else if (response.status === 404) {
              throw new Error('Utilisateur non trouvé.');
            } else {
              throw new Error('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
          }) 
          .then(data => {
            connexionSucces(data);
          })
    })
}
   
