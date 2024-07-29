function connexionSucces (data, token){
        document.getElementById('before-login').style.display ='block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('text-projet').style.display ='block';
        localStorage.setItem('authToken', token);
}

export function EmailButton (){
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
            } else if (response.status === 401) {
              document.getElementById('error-message').innerText = 'Erreur dans l’identifiant ou le mot de passe';;
            } else if (response.status === 404) {
              document.getElementById('error-message').innerText = 'Erreur dans l’identifiant ou le mot de passe';
            } else {


              throw new Error('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
          }) 
          .then(data => {
            const token = data.token;
            connexionSucces(data, token);
            console.log(data)
          })
    })
}
   
