const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/auth/signin";
const email = document.getElementById('email');
const password = document.getElementById('password');

document.getElementById('login').addEventListener("click", e => {
    e.preventDefault();
    const user = {
        email: email.value,
        password: password.value,
    };
    const fetchData = {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
    };
fetch(url, fetchData)
    .then(res => res.json())
    .then(resp => {
        const { data } = resp;
        if (data) {
            localStorage.setItem("token", data[0].token);
            window.location.href = 'meetups.html';
        }
    })
})
