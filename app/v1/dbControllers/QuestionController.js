/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';
import pool from '../dbModel/connection';

const { verifyToken } = Auth;

dotenv.config();

class QuestionController {
	/**
	 *@description- An endpoint to create a question record
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof QuestionController
	 */
	static createQuestion(request, response) {
		const {
			title, body, id
		} = request.body;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const createdBy = decodedToken.id;

		const selectQuery = { text: 'SELECT * FROM meetup WHERE id = $1', values: [id] };
		return pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length === 0) {
					return response.status(404).json({
						status: 404,
						error: 'The meetup you tried to post a question to cannot be found'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO questions (createdBy, meetup_id, title, body) VALUES($1, $2, $3, $4) RETURNING createdBy, meetup_id, title, body',
					values: [createdBy, id, title, body]
				};

				return pool.query(insertQuery)
					.then((question) => {
						if (question.rows) {
							return response.status(201).json({
								status: 201,
								data: [{
									question: question.rows[0]
								}],
							});
						}
						return response.status(204).json({
							status: 204,
							error: 'Question was not created',
						});
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							error: 'Internal server error'
						})
					));
			});
	}

	/**
	 *@description - An endpoint to get a question record
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof QuestionController
	 */
	static getQuestion(request, response) {
		const { id } = request.params;

		const selectQuery = { text: 'SELECT * FROM questions WHERE id = $1', values: [id] };

		pool.query(selectQuery)
			.then((result) => {
				const question = result.rows;
				if (question.length === 1) {
					return response.status(200).json({
						status: 200,
						data: question
					});
				}
				return response.status(404).json({
					status: 404,
					error: 'Question cannot be found'
				});
			})
			.catch((error) => {
				response.status(500).json({
					status: 500,
					error: 'Internal server error'
				});
			});
	}

	/**
	 *@description- An endpoint to downvote a question
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof QuestionController
	 */
	static downvoteQuestion(request, response) {
		const { id } = request.params;

		const selectQuery = {
			text: 'SELECT * FROM questions WHERE id = $1',
			values: [id]
		};

		pool.query(selectQuery)
			.then((result) => {
				const { rows } = result;
				if (rows.length < 1) {
					return response.status(404).json({
						status: 404,
						error: 'The question you wish to downvote does not exist'
					});
				}
				// eslint-disable-next-line no-param-reassign
				result.rows[0].downvotes += 1;
				const updateQuery = {
					text: 'UPDATE questions SET downvotes = $1 WHERE id = $2 RETURNING *',
					values: [result.rows[0].downvotes, id],
				};
				pool.query(updateQuery)
					.then((downvote) => {
						if (downvote.rows.length > 0) {
							return response.status(200).json({
								status: 200,
								data: downvote.rows
							});
						}
					})
					.catch((error) => {
						response.status(500).json({
							status: 500,
							error: 'Internal server error'
						});
					});
			});
	}

	/**
	 *@description- An endpoint to upvote a particular question
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof QuestionController
	 *
	 * returns object
	 * @memberof QuestionController
	 */
	static upvoteQuestion(request, response) {
		const { id } = request.params;

		const selectQuery = { text: 'SELECT * FROM questions WHERE id = $1', values: [id] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length < 1) {
					return response.status(404).json({
						status: 404,
						error: 'Question you wish to upvote does not exist'
					});
				}
				// eslint-disable-next-line no-param-reassign
				result.rows[0].upvotes += 1;
				const updateQuery = {
					text: 'UPDATE questions SET upvotes = $1 WHERE id = $2 RETURNING *',
					values: [result.rows[0].upvotes, id],
				};

				pool.query(updateQuery)
					.then((upvote) => {
						if (upvote.rows.length > 0) {
							return response.status(200).json({
								status: 200,
								data: upvote.rows
							});
						}
					})
					.catch((error) => {
						response.status(500).json({
							status: 500,
							error: 'Internal server error'
						});
					});
			});
	}
}
export default QuestionController;
