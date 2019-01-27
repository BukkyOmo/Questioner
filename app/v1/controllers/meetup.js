import moment, { now } from 'moment';
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
			createdOn: moment(Date.now()),
			topic,
			location,
			happeningOn: moment(happeningOn),
			tags
		};
		const findMeetup = meetup.find(onemeetup => onemeetup.topic === request.body.topic);
		if (findMeetup) {
			return response.status(400).json(
				{
					status: 400,
					message: false,
					data: ({ message: 'meetup already exist in database' })
				}
			);
		}
		meetup.push(newMeetup);
		return response.status(201).json(
			{
				status: 201,
				message: true,
				data: [{ newMeetup }]
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
	},

	/**
	 *Delete a specific meetup record
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	deleteMeetup(request, response) {
		const meetupId = parseInt(request.params.meetupId, 10);
		const oneMeetup = meetup.find(onemeetup => onemeetup.id === meetupId);
		if (oneMeetup) {
			const removeMeetup = meetup
				.filter(onemeetup => onemeetup.id !== meetupId);
			return response.status(200).json({
				status: 200,
				message: true,
				data: removeMeetup
			});
		}
		return response.status(404).json({
			status: 404,
			message: false,
			error: ({ message: 'The meetup record does not exist' })
		});
	},

	getAllUpcomingMeetups(request, response) {
		const upcoming = meetup
			.filter(comingmeetups => moment(comingmeetups.happeningOn) > moment(Date.now()));
		return response.status(200).json({
			status: 200,
			message: true,
			data: upcoming
		});
	}
};

export default meetupController;
