import MeetupService from '../Services/meetups.services';

class Meetup {
	/**
    * Admin creates meetup
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
    * Admin edits meetup
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

	/**
	* Admin deletes meetup
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async deleteMeetup(req, res) {
		try {
			const result = await MeetupService.deleteMeetup(req.params);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	/**
	* User gets all meetup
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async getAllMeetups(req, res) {
		try {
			const result = await MeetupService.getAllMeetups();
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default Meetup;
