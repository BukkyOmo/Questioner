import meetup from '../models/meetup';

const meetupController = {
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

	getAllMeetups(req, res) {
		return res.json({
			status: 200,
			message: true,
			data: [{ meetup }]
		});
	},

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
	}

};

export default meetupController;
