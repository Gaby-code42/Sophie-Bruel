
export function loginButton (){
    const boutonLogin = document.querySelector('#btn-login')

    boutonLogin.addEventListener('click',function(){
        document.getElementById('before-login').style.display ='none';
        document.getElementById('login').style.display = 'block';
    })
}

