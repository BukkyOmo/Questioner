import database from '../models/database';

const getMeetup = (request, response) => {
	const { meetupId } = request.params;
	const oneMeetup = database.meetup.find(onemeetup => onemeetup.id === parseInt(meetupId, 10));
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
};

export default getMeetup;
