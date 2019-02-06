const url = "https://bukkyomo-questioner.herokuapp.com/api/v1/meetups";
const topic = document.getElementById("topic");
const loc = document.getElementById("location");
const happeningOn = document.getElementById("date");
const token = localStorage.getItem("token");

document.getElementById('create-meetup').addEventListener("click", e => {
    e.preventDefault();
    if (topic.value === "") {
      console.log("Topic is required");
    } else if (loc.value === "") {
      return console.log("Location is required");
    } else if (happeningOn.value === "") {
      return console.log("Date is required");
    } else {
        const meetup = {
            topic: topic.value,
            location: loc.value,
            happeningOn: happeningOn.value,
        };
        const fetchData = {
            method: "POST",
            body: JSON.stringify(meetup),
            headers: { "Content-Type": "application/json", token }
        };
        fetch(url, fetchData)
            .then(res => res.json())
            .then(resp => {
                const { data } = resp;
                if (data) {
                    return console.log(resp);
                }
            })
    }
})
