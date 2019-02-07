const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("cpassword");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const error = document.getElementsByClassName("error")[0];
const popup = document.getElementsByClassName("popup")[0];

document.getElementById("signup").addEventListener("click", e => {
  e.preventDefault();

    if(firstname.value === '') {
    popup.style.display = 'block';
    error.innerHTML = 'firstname is required';
    return;
    }  if (lastname.value === '') {
    popup.style.display = 'block';
    error.innerHTML = 'lastname is required';
    return;
    } if (password.value === '') {
    popup.style.display = 'block';
    error.innerHTML = 'Password is required';
    return;
    }
    if (password.value.length < 11) {
    popup.style.display = 'block';
    error.innerHTML = 'Password must be longer than 11 characters';
    return;
    }
    if (confirmpassword.value !== password.value) {
    popup.style.display = "block";
    error.innerHTML = "Passwords don't match";
    return;
    }
    if (username.value === '') {
    popup.style.display = 'block';
    error.innerHTML = 'Username is required';
    return;
    }
    if (email.value === "") {
    popup.style.display = "block";
    error.innerHTML = "Email is required";
    return;
    }
    const newUser = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        username: username.value,
        password: password.value,
        confirmpassword: cpassword.value,
        phoneNumber: phone.value,
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
            localStorage.setItem("token", data[0].token);
            window.location.href = 'userprofile.html';
        }
      });
    });
