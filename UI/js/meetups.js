const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/meetups/upcoming";
const token = localStorage.getItem("token");
const meetupContainer = document.getElementsByClassName("main")[0];
fetchData = {
  method: "GET",
  headers: { "Content-Type": "application/json", token }
};
fetch(url, fetchData)
    .then(res => res.json())
    .then((resp) => {
        const { data } = resp;
        if (data) {
            data.forEach(meetup => {
                const meetupCard = `<div class="flex3">
            <a href="single-meetup.html"><img src="${meetup.images}" alt="eventimage"></a>
            <div class="flex-item">
            <h3>${meetup.topic}</h3>
            <p>${new Date(meetup.happeningon).toDateString()}</p>
            <p>${meetup.location}</p>
            <p class="flex-item2"><a href="single-meetup.html">View Details</a></p>
            </div>
            </div>`;
                meetupContainer.insertAdjacentHTML('afterbegin', meetupCard)
            });
        }
    })