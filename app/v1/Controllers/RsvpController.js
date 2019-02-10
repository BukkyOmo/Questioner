/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';
import pool from '../Model/connection';

dotenv.config();

const { verifyToken } = Auth;

class RsvpController {
	static rsvpMeetup = (request, response) => {
		const { body } = request.body;
		const { id } = request.params;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const userId = decodedToken.id;
		const myStatus = body.toLowerCase();

		const selectQuery = {
			text: 'SELECT * FROM meetup WHERE id = $1',
			values: [id],
		};
		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length === 0) {
					return response.status(404).json({
						status: 404,
						error: 'The meetup you try to rsvp does not exist'
					});
				}

				const userQuery = {
					text: 'SELECT * FROM rsvp WHERE meetup_id = $1 AND user_id = $2',
					values: [id, userId],
				};
				pool.query(userQuery)
					.then((user) => {
						if (user.rows.length > 0) {
							return response.status(409).json({
								status: 409,
								error: 'You have already given a response once'
							});
						}
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							error: 'Something went wrong'
						})
					));

				const insertQuery = {
					text: 'INSERT INTO rsvp(response, meetup_id, user_id) VALUES($1, $2, $3) RETURNING *',
					values: [myStatus, id, userId],
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
							error: 'Something went wrong'
						})
					))
			})
			.catch(error => (
				response.status(500).json({
					status: 500,
					error: 'Something went wrong'
				})
			));
	}
}
export default RsvpController;
