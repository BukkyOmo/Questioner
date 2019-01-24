/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class MeetupController {
	static createMeetup(request, response) {
		const {
			topic, location, happeningOn, tags, images
		} = request.body;
		pool.query({ text: 'SELECT * FROM meetup WHERE topic = $1', values: [topic] })
			.then((result) => {
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						message: 'Meetup already exists'
					});
				}
				const selectQuery = {
					text: 'INSERT into meetup( location, topic, happeningOn, images, tags) VALUES($1, $2, $3, $4, $5) RETURNING *',
					values: [location, topic, happeningOn, images, tags]
				};
				pool.query(selectQuery).then((meetup) => {
					if (meetup.rows) {
						return response.status(201).json({
							status: 201,
							message: 'Your registration was successful',
							data: [{
								meetup: meetup.rows[0]
							}],
						});
					}
				}).catch(error => (
					response.status(500).json({
						status: 500,
						message: false,
						error: 'Internal server error'
					})
				));
			});
	}

	static getAllMeetups(request, response) {
		pool.query('SELECT * FROM meetup')
			.then((allmeetups) => {
				const meetups = allmeetups.rows;
				if (meetups.length < 1) {
					return response.status(404).json({
						success: false,
						message: 'No meetup was found in the database',
					});
				}
				return response.status(200).json({
					success: true,
					message: 'Successfully Retrived all meetups',
					data: meetups
				});
			})
			.catch(error => response.status(500).json({
				success: false,
				message: 'Internal Server Error',
				error: error.message,
			}));
	}
}
export default MeetupController;