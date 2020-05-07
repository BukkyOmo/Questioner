import MeetupService from '../Services/meetups.services';

class Meetup {
	static async createMeetup(req, res) {
		try {
			const result = await MeetupService.createMeetup(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default Meetup;
