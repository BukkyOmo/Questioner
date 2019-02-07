const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/meetups";
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
            <a class="meetup-id" id="${meetup.id}" href=""><img src="${meetup.images}" alt="eventimage"></a>
            <div class="flex-item">
            <h3>${meetup.topic}</h3>
            <p>${new Date(meetup.happeningon).toDateString()}</p>
            <p>${meetup.location}</p>
            <p id="${meetup.id}" class="flex-item2 meetup-id"><a href="">View Details</a></p>
            </div>
            </div>`;
                meetupContainer.insertAdjacentHTML('afterbegin', meetupCard)
            });
        }
        const meetupId = document.getElementsByClassName('meetup-id');
        for (let i = 0; i < meetupId.length; i += 1) {
            if(meetupId[i].id) {
                meetupId[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    const Id = sessionStorage.setItem('meetupId', meetupId[i].id);
                    window.location.href =
                      "single-meetup.html";
                })
            }
        }
    })