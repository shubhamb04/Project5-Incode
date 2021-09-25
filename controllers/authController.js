const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.'\-]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function validateInput(regex, input) {
    return regex.test(input);
}

/* Validation for signup form */
const handleErrorSignup = async (firstname, lastname, email, password, confirmPassword) => {
    let errors = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

    if(firstname === '') {
        errors.firstname = 'First name cannot be blank';
    }
    else if(!validateInput(regexName, firstname)) {
        errors.firstname = 'Invalid first name';
    }

    if(lastname === '') {
        errors.lastname = 'Last name cannot be blank';
    }
    else if(!validateInput(regexName, lastname)) {
        errors.lastname = 'Invalid first name';
    }

    if(email === '') { 
        errors.email = 'Email cannot be blank';
    }
    else if(!validateInput(regexEmail, email)) {
        errors.email = 'Invalid email';
    }

    if(password.length < 6 ) {
        errors.password = 'Password needs to be six characters or more';
    }

    if(password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
    }

    try {
        const user = await db.oneOrNone('SELECT email FROM users WHERE email = $1', [email]);

        if(user) {
            errors.email = 'Email already exists';
        }
    }
    catch(err) {
        console.log(err);
    }

    return errors;
}

/* Validation for login form */
const handleErrorLogin = async (email, password) => {
    let errors = { email: '', password: '', credentials: '' };

    if(email === '') { 
        errors.email = 'Email cannot be blank';
    }
    else if(!validateInput(regexEmail, email)) {
        errors.email = 'Invalid email';
    }

    if(password.length < 6 ) {
        errors.password = 'Password needs to be six characters or more';
    }

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

        if(user) {
            if(!bcrypt.compareSync(password, user.password)) {
                errors.credentials = "Email or password is incorrect";
            }
        }
        else {
            errors.credentials = "Email or password is incorrect";
        }  
    }
    catch(err) {
        console.log(err);

    }

    return errors;
}

const maxAge = 24 * 60 * 60;
const createToken = (email) => {
    return jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
}

/* Signup form */
module.exports.signup_get = (req, res ) => {
    res.render('pages/signup');
}

/* Login form */
module.exports.login_get = (req, res ) => {
    res.render('pages/login');
}

/* Accept data from the signup form and signup user if fields are valid */
module.exports.signup_post = (req, res ) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    
    const cleanedFname = firstname.trim().capitalize();
    const cleanedLname = lastname.trim().capitalize();
    const cleanedEmail = email.toLowerCase().trim();

    handleErrorSignup(cleanedFname, cleanedLname, cleanedEmail, password, confirmPassword)
        .then( async (errors) => {

            if(errors.firstname === '' && errors.lastname === '' && errors.email === '' && errors.password === '' && errors.confirmPassword === '') {
                const hash = bcrypt.hashSync('password', 10);
                try {
                    await db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', [cleanedFname, cleanedLname, cleanedEmail, hash]);
                    const token = createToken(cleanedEmail);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(201).json({ cleanedEmail });
                }               
                catch(err) {
                    res.status(400).send('Error, user not created');
                }
            }
            else {
                res.status(400).json({ errors });
            }
        });        
}

/* Accept data from the login form and check if credentials/fields are valid */
module.exports.login_post = (req, res ) => {
    const { email, password} = req.body;
    const cleanedEmail = email.toLowerCase().trim();

    const errors = handleErrorLogin(cleanedEmail, password)
    .then( errors => {
        if(errors.email === '' && errors.password === '' && errors.credentials === '')
        {   
            const token = createToken(cleanedEmail);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ cleanedEmail });
        }
        else {
            res.status(400).json({ errors });
        }
    })
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

