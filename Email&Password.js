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
        .then(response => response.json())
        
    })
    




}
   
       