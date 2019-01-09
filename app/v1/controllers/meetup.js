import meetup from '../models/meetup';

const meetupController = {
	/**
	 *Create a meetup record
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	createMeetup(request, response) {
		const newMeetup = {
			id: meetup.length + 1,
			createdOn: Date(),
			location: request.body.location,
			topic: request.body.topic,
			happeningOn: Date(request.body.happeningOn),
			tags: request.body.tags || null
		};
		if (newMeetup.location && newMeetup.topic && newMeetup.happeningOn) {
			meetup.push(newMeetup);
			return response.json(
				{
					status: 200,
					message: true,
					data: {
						topic: request.body.topic,
						location: request.body.location,
						happeningOn: newMeetup.happeningOn,
						tags: request.body.tags
					}
				}
			);
		}
		return response.json(
			{
				status: 404,
				message: false,
				data: 'meetup cannot be created'
			}
		);
	},

	/**
	 * Get a particular meetup record
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	getMeetup(request, response) {
		const oneMeetup = meetup.find(onemeetup => onemeetup.id === Number(request.params.meetupId));
		if (!oneMeetup) {
			return response.json({
				status: 404,
				message: false,
				error: 'This meetup record cannot be found'
			});
		}
		return response.json({
			status: 200,
			message: true,
			data: [{
				id: oneMeetup.id,
				topic: oneMeetup.topic,
				location: oneMeetup.location,
				happeningOn: oneMeetup.happeningOn
			}]
		});
	},

	/**
	 *Get all meetup records
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	getAllMeetups(request, response) {
		return response.json({
			status: 200,
			message: true,
			data: meetup
		});
	},
};

export default meetupController;
