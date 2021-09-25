const login = document.getElementById('login');
const emailError = document.querySelector('.errorMessage.email');
const passwordError = document.querySelector('.errorMessage.password');
const credentialsError = document.querySelector('.errorMessage.credentials');

login.addEventListener('submit', async (e) => {   
    e.preventDefault();
    const email = login.email.value;
    const password = login.password.value;

    emailError.textContent = '';
    passwordError.textContent = '';
    credentialsError.textContent = '';

    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json'}
        })
        const data = await res.json();

        if(data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;

            if(data.errors.email === '' && data.errors.password === '') {
                credentialsError.textContent = data.errors.credentials;
            }
        }

        if(data.cleanedEmail) {
            location.assign('/');
        }
    }
    catch(err) {
        console.log(err);
    }

});

