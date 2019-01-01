
class Meetup {
	constructor() {
		this.meetup = [];
	}

	create(data) {
		const newMeetup = {
			id: 1,
			createdOn: Date(),
			location: data.location,
			images: data.images || null,
			topic: data.topic,
			happeningOn: data.happeningOn,
			tags: data.tags || null,
		};
		this.meetup.push(newMeetup);
		return newMeetup;
	}

	findOne(id) {
		return this.meetup.find(onemeetup => onemeetup.id === id);
	}

	findAll() {
		return this.meetup;
	}
}
export default new Meetup();
