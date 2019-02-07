const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/meetups/:id";
const token = localStorage.getItem("token");

const fetchData = {
    method: 'GET',
    headers: {'Content-type': 'application/json', token}
}

fetch(url, fetchData)
    .then(res => res.json())
    .then((resp) => {
        const { data } = resp;
        if (data) {
         console.log(data);
        }
    })
