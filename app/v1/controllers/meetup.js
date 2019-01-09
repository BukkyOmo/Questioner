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
		if (newMeetup.location && newMeetup.topic && newMeetup.happeningOn) {
			meetup.push(newMeetup);
			return response.json(
				{
					status: 200,
					message: true,
					data: [{ newMeetup }]
				}
			);
		}
		return response.json(
			{
				status: 404,
				message: false,
				data: ({ message: 'meetup cannot be created' })
			}
		);
	},

	/**
	 *Get a meetup record
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object}
	 */
	getMeetup(req, res) {
		const oneMeetup = meetup.find(onemeetup => onemeetup.id === Number(req.params.meetupId));
		if (!oneMeetup) {
			return res.json({
				status: 404,
				message: false,
				error: 'This meetup record cannot be found'
			});
		}
		return res.json({
			status: 200,
			message: true,
			data: [{ oneMeetup }]
		});
	},

	/**
	 *Get all meetup records
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object}
	 */
	getAllMeetups(req, res) {
		return res.json({
			status: 200,
			message: true,
			data: [{ meetup }]
		});
	},

};

export default meetupController;
