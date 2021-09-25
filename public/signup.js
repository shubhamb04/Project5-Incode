const signup = document.getElementById('signup');
const fnameError = document.querySelector('.errorMessage.firstname');
const lnameError = document.querySelector('.errorMessage.lastname');
const emailError = document.querySelector('.errorMessage.email');
const passwordError = document.querySelector('.errorMessage.password');
const confirmPasswordError = document.querySelector('.errorMessage.confirmPassword');

signup.addEventListener('submit', async (e) => {   
    e.preventDefault();
    const firstname = signup.firstname.value;
    const lastname = signup.lastname.value;
    const email = signup.email.value;
    const password = signup.password.value;
    const confirmPassword = signup.confirmPassword.value;

    fnameError.textContent = '';
    lnameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    try {
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({firstname, lastname, email, password, confirmPassword}),
            headers: { 'Content-Type': 'application/json'}
        })
        const data = await res.json();

        if(data.errors) {
            fnameError.textContent = data.errors.firstname;
            lnameError.textContent = data.errors.lastname;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            confirmPasswordError.textContent = data.errors.confirmPassword;
        }

        if(data.cleanedEmail) {
            location.assign('/');
        }
    }
    catch(err) {
        console.log(err);
    }

});

