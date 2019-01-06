import meetup from '../models/database';

const getMeetup = (req, res) => {
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
};
export default getMeetup;
