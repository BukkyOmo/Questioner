
class Rsvp {
	constructor() {
		this.rsvps = [];
	}

	create(data) {
		const newRsvp = {
			id: 1,
			meetup: data.meetup,
			user: data.user,
			response: data.response,
		};
		this.rsvps.push(newRsvp);
		return newRsvp;
	}

	findOne(id) {
		return this.rsvps.find(onersvp => onersvp.id === id);
	}

	findAll() {
		return this.rsvps;
	}
}
export default new Rsvp();
