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
			data: [{
				id: oneMeetup.id,
				topic: oneMeetup.topic,
				location: oneMeetup.location,
				happeningOn: oneMeetup.happeningOn
			}]
		});
	},

	getAllMeetups(req, res) {
		return res.json({
			status: 200,
			message: true,
			data: meetup
		});
	},

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
	}

};

export default meetupController;
