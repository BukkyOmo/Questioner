import meetup from '../models/meetup';
import rsvpmeetup from '../models/rsvp';

const rsvpController = {
	createRsvp(request, response) {
		const findmeetup = meetup.find(onemeetup => onemeetup.id === Number(request.params.meetupId));
		const rsvpMeetup = {
			id: rsvpmeetup.length + 1,
			meetup: request.params.meetupId,
			user: request.body.email,
			reply: request.body.reply
		};
		const reply = rsvpMeetup.reply.toLowerCase();
		if (reply === 'yes' || reply === 'no' || reply === 'maybe') {
			return response.json(
				{
					status: 200,
					message: true,
					data: [{
						meetup: request.params.meetupId,
						topic: findmeetup.topic,
						reply: request.body.reply
					}]
				}
			);
		}
		return response.json({
			status: 404,
			message: false,
			data: 'Staus field cannot be empty'
		});
	}
};

export default rsvpController;
