/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class RsvpController {
	static rsvpMeetup(request, response) {
		const { status } = request.body;
		const { id } = request.params;

		const selectQuery = {
			text: 'SELECT FROM meetup WHERE meetup_id = $1',
			values: [id],
		};
		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length < 1) {
					console.log(result.rows);
					return response.status(404).json({
						status: 404,
						success: false,
						message: 'The meetup you try to rsvp does not exist'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO rsvp(response) VALUES($1) RETURNING*',
					values: [status],
				};
				pool.query(insertQuery)
					.then((rsvp) => {
						if (rsvp.rows) {
							return response.status(200).json({
								status: 200,
								message: 'You have successfully rsvp this meetup',
								data: rsvp.rows[0]
							});
						}
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							message: false,
							error: 'Internal server error'
						})
					));
			});
	}
}
export default RsvpController;
