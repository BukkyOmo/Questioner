import MeetupService from '../Services/meetups.services';

class Meetup {
	/**
    *  Admin create meetup
    * @static method
    * @param  {object} body - Request object
    * @return {promise} res
    */
	static async createMeetup(req, res) {
		try {
			const result = await MeetupService.createMeetup(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	/**
    *  Admin edit meetup
    * @static method
    * @param  {object} body - Request object
    * @return {promise} res
    */
	static async editMeetup(req, res) {
		try {
			const result = await MeetupService.editMeetup(req.body, req.params);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default Meetup;
