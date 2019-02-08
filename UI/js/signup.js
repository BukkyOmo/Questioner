const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("cpassword");
const email = document.getElementById("email");
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const error = document.getElementsByClassName("error");

document.getElementById("signup").addEventListener("click", (e) => {
  e.preventDefault();
  const errorArray = [];
    if (password.value === '') {
    document.getElementById('error-password').style.display = 'block';
    passwordError = "Please enter your password";
    document.getElementById('error-password').innerHTML = passwordError;
    errorArray.push(passwordError)
    }
    if (password.value.length < 6) {
    document.getElementById('error-password').style.display = 'block';
    passwordlenError = "Password must be longer than 11 characters";
    document.getElementById('error-password').innerHTML = passwordlenError;
        errorArray.push(passwordlenError);
    }
    if (confirmpassword.value !== password.value) {
    document.getElementById('error-cpassword').style.display = 'block';
    passwordmatchError = "Password don't match";
    document.getElementById('error-cpassword').innerHTML = passwordmatchError;
    errorArray.push(passwordmatchError)
    }
    if (username.value === '') {
    document.getElementById('error-username').style.display = 'block';
    usernameError = "Username is required";
    document.getElementById('error-username').innerHTML = usernameError;
    errorArray.push(usernameError)
    
    }
    if (email.value === "") {
    document.getElementById('error-email').style.display = "block";
    document.getElementById('error-email').innerHTML = "Email is required";
        errorArray.push('Email is required');
    }
    if(!regex.test(email.value)) {
    document.getElementById('error-email').style.display = "block";
    document.getElementById('error-email').innerHTML = "Email is invalid";
        errorArray.push('Email is invalid');
    }
    console.log(errorArray);
    if (errorArray.length === 0) {
        const newUser = {
            email: email.value,
            username: username.value,
            password: password.value,
            confirmpassword: cpassword.value
        };
        const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/auth/signup";

        const fetchData = {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        };
        fetch(url, fetchData)
            .then(res => res.json())
            .then(resp => {
                const { data } = resp;
                if (data) {
                   const mymsg = document.getElementById('msg');
                   mymsg.innerHTML = 'Registration successful';
                    localStorage.setItem("token", data[0].token);
                    window.location.href = 'userprofile.html';
                }
            })
    }
    });


function removeWarning() {
    document.getElementById('error-' + this.id).innerHTML = "";
}

document.getElementById("password").onkeydown = removeWarning;
document.getElementById("username").onkeydown = removeWarning;
document.getElementById("email").onkeydown = removeWarning;
document.getElementById('cpassword').onkeydown = removeWarning;
