/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class RsvpController {
	static rsvpMeetup(request, response) {
		const { status } = request.body;
		const { id } = request.params;
		const token = request.headers.token || request.body.token;
		const decodedToken = jwt.decode(token);
		const userId = decodedToken.id;

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
						error: 'The meetup you try to rsvp does not exist'
					});
				}

				const userQuery = {
					text: 'SELECT FROM rsvps WHERE meetup_id = $1 AND user_id = $2',
					values: [id, userId],
				};
				pool.query(userQuery)
					.then((user) => {
						if (user.rows.length === 1) {
							return response.status(409).json({
								status: 409,
								error: 'You have already given a response'
							});
						}
					});

				const insertQuery = {
					text: 'INSERT INTO rsvp(response, meetup_id, user_id) VALUES($1, $2, $3) RETURNING*',
					values: [status, id, userId],
				};
				pool.query(insertQuery)
					.then((rsvp) => {
						if (rsvp.rows) {
							return response.status(200).json({
								status: 200,
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
