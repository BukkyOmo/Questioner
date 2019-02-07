const id = sessionStorage.getItem("meetupId");
const token = localStorage.getItem("token");
const meetupContainer = document.getElementsByClassName("meetup-flex")[0];
if (!id) {
    window.location.href = 'meetups.html';
}

let url = `https://bukkyomo-questioner.herokuapp.com/api/v1/meetups/${id}`;

const fetchData = {
    method: 'GET',
    headers: {'Content-type': 'application/json', token}
}

fetch(url, fetchData)
    .then(res => res.json())
    .then((resp) => {
        const { data } = resp;
        if (data) {
           const meetupCard = `<div>

                <img src="${
                  data[0].images
                }" alt="specific-meetup" class="meetup-img">

				</div>

                <div class="meetup-details">

                    <h3>${data[0].topic}</h3>

                    <h4>${data[0].location}</h4>

                    <h5>${new Date(data[0].happeningon).toDateString()}</h5>

                    <h6>Tags: Workshop, React, Node</h6>

                    <div>

                        <button class="btn-bg"><i class="fas fa-calendar-check fa-2x"></i></button>

                        <span>Rsvp this meetup</span>

                    </div>

                </div>`;
            meetupContainer.insertAdjacentHTML('afterbegin', meetupCard)
        }
    })

const title = document.getElementById("question-title");
const body = document.getElementById("ask_questions");
console.log(parseInt(id, 10));
document.getElementById("submit-question").addEventListener("click", (e) => {
  e.preventDefault();
  const newQuestion = {
      id,
      title: 'title',
      body: 'body'
  };
  const fetchData = {
    method: "POST",
      body: JSON.stringify(newQuestion),
      headers: { "Content-Type": "application/json", token }
  };
    fetch('https://bukkyomo-questioner.herokuapp.com/api/v1/questions', fetchData)
    .then(res => res.json())
    .then(resp => {
      const { data } = resp;
      if (data) {
        console.log(data);
      }
    });
});
