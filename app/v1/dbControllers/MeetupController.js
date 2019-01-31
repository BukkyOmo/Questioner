/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../dbModel/connection';

dotenv.config();

class MeetupController {
	/**
	 * @description- An endpoint to create a meetup record
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

		const token = request.headers.token || request.body.token;
		const decodedToken = jwt.decode(token);
		const { isAdmin } = decodedToken;

		if (isAdmin) {
			const insertQuery = {
				text: 'INSERT into meetup( location, topic, happeningOn, images, tags) VALUES($1, $2, $3, $4, $5) RETURNING *',
				values: [location, topic, happeningOn, images, tags]
			};

			return pool.query(insertQuery)
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
		}
		return response.status(409).json({
			status: 409,
			error: 'Only an admin can create a meetup'
		});
	}

	/**
	 *@description- An endpoint to get all meetups
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
						status: 404,
						error: 'No meetup was found in the database',
					});
				}
				return response.status(200).json({
					status: 200,
					data: meetups
				});
			})
			.catch(error => response.status(500).json({
				status: 500,
				error: 'Internal server error'
			}));
	}
	/**
	 *@description- An endpoint to get a specific meetup
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
						status: 200,
						data: meetup
					});
				}
				return response.status(404).json({
					status: 404,
					error: 'Meetup cannot be found'
				});
			})
			.catch(error => response.status(500).json({
				status: 500,
				error: 'Internal server error'
			}));
	}
}
export default MeetupController;
