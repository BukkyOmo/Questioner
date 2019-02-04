/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';
import pool from '../dbModel/connection';

const { verifyToken } = Auth;

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
		const decodedToken = verifyToken(token);
		const { isAdmin } = decodedToken;
		const createdBy = decodedToken.id;

		if (isAdmin === true) {
			console.log(isAdmin);
			const insertQuery = {
				text:
          'INSERT into meetup( location, topic, happeningOn, images, tags, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING location, topic, happeningOn, images, tags',
				values: [
					location,
					topic,
					happeningOn,
					'https://res.cloudinary.com/dtzflgnar/image/upload/v1549098474/event4.jpg',
					tags,
					createdBy
				]
			};

			return pool
				.query(insertQuery)
				.then((meetup) => {
					if (meetup.rows) {
						return response.status(201).json({
							status: 201,
							message: 'Your registration was successful',
							data: [
								{
									meetup: meetup.rows[0]
								}
							]
						});
					}
				})
				.catch(error => response.status(500).json({
					status: 500,
					error: 'Internal server error'
				}, console.log(error)));
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
		const selectQuery = 'SELECT meetup_id, location, topic, happeningOn, images, tags FROM meetup';

		pool
			.query(selectQuery)
			.then((result) => {
				const meetups = result.rows;
				if (meetups.length < 1) {
					return response.status(404).json({
						status: 404,
						error: 'No meetup was found in the database'
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

		const selectQuery = {
			text: 'SELECT * FROM meetup WHERE meetup_id = $1',
			values: [id]
		};

		pool
			.query(selectQuery)
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

	/**
   *@description- An endpoint to get all upcoming meetups
   *
   * @static
   * @param {object} request
   * @param {object} response
   * returns {object}
   * @memberof MeetupController
   */
	static getUpcomingMeetups(request, response) {
		const selectQuery = 'SELECT meetup_id, location, topic, happeningOn, images, tags FROM meetup WHERE happeningOn > NOW()';

		pool.query(selectQuery)
			.then((result) => {
				const meetup = result.rows;
				if (meetup.length < 0) {
					return response.status(409).json({
						status: 409,
						error: 'No upcoming meetup'
					});
				}
				return response.status(200).json({
					status: 200,
					data: meetup
				});
			})
			.catch(error => response.status(500).json({
				status: 500,
				error: 'Internal server error'
			}, console.log(error)));
	}

	/**
   *@description- An endpoint to delete a specific meetup
   *
   * @static
   * @param {object} request
   * @param {object} response
   * returns {object}
   * @memberof MeetupController
   */
	static deleteMeetup(request, response) {
		const { id } = request.params;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const { isAdmin } = decodedToken;
		const createdBy = decodedToken.id;

		const selectQuery = {
			text: 'SELECT * FROM meetup WHERE meetup_id = $1',
			values: [id]
		};

		if (isAdmin === true) {
			return pool.query(selectQuery)
				.then((result) => {
					if (result.rows.length === 0) {
						return response.status(409).json({
							status: 409,
							error: 'Meetup you are trying to delete does not exist'
						});
					}
					const deleteQuery = {
						text: 'DELETE FROM meetup WHERE meetup_id = $1',
						values: [id]
					};

					return pool.query(deleteQuery)
						.then((meetup) => {
							if (meetup.rows) {
								return response.status(201).json({
									status: 201,
									message: 'Your have successfully deleted a meetup'
								});
							}
						})
						.catch(error => response.status(500).json({
							status: 500,
							error: 'Internal server error'
						}, console.log(error)));
				});
		}
		return response.status(409).json({
			status: 409,
			error: 'Only an admin can create a meetup'
		});
	}
}

export default MeetupController;
