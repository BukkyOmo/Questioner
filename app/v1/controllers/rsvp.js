import meetup from '../models/meetup';
import rsvpmeetup from '../models/rsvp';

const rsvpController = {
	/**
	 *Create an rsvp for an upcoming meetup
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	createRsvp(request, response) {
		const { user, reply } = request.body;
		const { meetupId } = request.params;
		const findmeetup = meetup.find(onemeetup => onemeetup.id === Number(request.params.meetupId));
		const rsvpMeetup = {
			id: rsvpmeetup.length + 1,
			meetupId,
			user,
			reply
		};
		if (reply === 'yes' || reply === 'no' || reply === 'maybe') {
			return response.status(201).json(
				{
					status: 201,
					message: true,
					data: [{
						meetup: meetupId,
						topic: findmeetup.topic,
						reply
					}]
				}
			);
		}
		return response.status(400).json({
			status: 400,
			message: false,
			error: ({ message: 'Reply must be either yes, no or maybe' })
		});
	}
};

export default rsvpController;
