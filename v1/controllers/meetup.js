import meetup from '../models/database';

const getMeetup = (req, res) => {
	// console.log(Number(req.params.meetupId));
	// const { meetupId } = request.params;
	const oneMeetup = meetup.find(onemeetup => onemeetup.id === Number(req.params.meetupId));
	if (!oneMeetup) {
		res.json({
			status: 404,
			message: false,
			error: 'This meetup record cannot be found'
		});
	} else {
		res.json({
			status: 200,
			message: true,
			data: [{
				id: oneMeetup.id,
				topic: oneMeetup.topic,
				location: oneMeetup.location,
				happeningOn: oneMeetup.happeningOn
			}]
		});
	}
};
export default getMeetup;
