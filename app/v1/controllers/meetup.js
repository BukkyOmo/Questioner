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
		const {
			topic, location, happeningOn, tags,
		} = request.body;
		const newMeetup = {
			id: meetup.length + 1,
			createdOn: Date(),
			topic,
			location,
			happeningOn,
			tags
		};
		if (location && topic && happeningOn) {
			meetup.push(newMeetup);
			return response.status(201).json(
				{
					status: 201,
					message: true,
					data: [{ newMeetup }]
				}
			);
		}
		return response.status(400).json(
			{
				status: 400,
				message: false,
				data: ({ message: 'meetup should contain location, topic and happening Date' })
			}
		);
	},

	/**
	 *Get a meetup record
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	getMeetup(request, response) {
		const { meetupId } = request.params;
		const oneMeetup = meetup.find(onemeetup => onemeetup.id === Number(meetupId));
		if (!oneMeetup) {
			return response.status(404).json({
				status: 404,
				message: false,
				error: 'This meetup record cannot be found'
			});
		}
		return response.status(200).json({
			status: 200,
			message: true,
			data: [{ oneMeetup }]
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
		return response.status(200).json({
			status: 200,
			message: true,
			data: [{ meetup }]
		});
	}
};

export default meetupController;
