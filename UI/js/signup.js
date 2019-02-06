const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/auth/signup";
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

document.getElementById("signup").addEventListener("click", e => {
  e.preventDefault();
    const newUser = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        username: username.value,
        password: password.value,
        phoneNumber: phone.value
    };
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
