/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class MeetupController {
	/**
	 * To create a meetup record
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @returns {object}
	 * @memberof MeetupController
	 */
	static createMeetup(request, response) {
		const {
			topic, location, happeningOn, tags, images
		} = request.body;

		const selectQuery = { text: 'SELECT * FROM meetup WHERE topic = $1', values: [topic] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						message: 'Meetup already exists'
					});
				}

				const insertQuery = {
					text: 'INSERT into meetup( location, topic, happeningOn, images, tags) VALUES($1, $2, $3, $4, $5) RETURNING *',
					values: [location, topic, happeningOn, images, tags]
				};

				pool.query(insertQuery)
					.then((meetup) => {
						if (meetup.rows) {
							return response.status(201).json({
								status: 201,
								message: 'Your registration was successful',
								data: [{
									meetup: meetup.rows[0]
								}],
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

	/**
	 *To get all meetups
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof MeetupController
	 */
	static getAllMeetups(request, response) {
		const selectQuery = 'SELECT * FROM meetup';

		pool.query(selectQuery)
			.then((result) => {
				const meetups = result.rows;
				if (meetups.length < 1) {
					return response.status(404).json({
						success: false,
						message: 'No meetup was found in the database',
					});
				}
				return response.status(200).json({
					success: true,
					message: 'Successfully Retrieved all meetups',
					data: meetups
				});
			})
			.catch(error => response.status(500).json({
				success: false,
				message: 'Internal Server Error',
				error: error.message,
			}));
	}
	/**
	 *To get a specific meetup
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof MeetupController
	 */

	static getAMeetup(request, response) {
		const { id } = request.params;

		const selectQuery = { text: 'SELECT * FROM meetup WHERE meetup_id = $1', values: [id] };

		pool.query(selectQuery)
			.then((result) => {
				const meetup = result.rows;
				if (meetup.length === 1) {
					return response.status(200).json({
						success: true,
						message: 'Meetup successfully retrieved',
						data: meetup
					});
				}
				return response.status(404).json({
					success: false,
					error: 'Meetup cannot be found'
				});
			})
			.catch(error => response.status(500).json({
				success: false,
				message: 'Internal server Error',
				error: error.message
			}));
	}
}
export default MeetupController;
