/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

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
			title, body
		} = request.body;

		const selectQuery = { text: 'SELECT * FROM questions WHERE body = $1', values: [body] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						error: 'Question already exists'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO questions (title, body) VALUES($1, $2) RETURNING *',
					values: [title, body]
				};

				pool.query(insertQuery)
					.then((question) => {
						if (question.rows) {
							return response.status(201).json({
								status: 201,
								data: [{
									question: question.rows[0]
								}],
							});
						}
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

		const selectQuery = { text: 'SELECT * FROM questions WHERE question_id = $1', values: [id] };

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
	 *@description- An endpoint to upvote a particular question
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns object
	 * @memberof QuestionController
	 */
	static upvoteQuestion(request, response) {
		const { id } = request.params;

		const selectQuery = { text: 'SELECT * FROM questions WHERE question_id = $1', values: [id] };

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
					text: 'UPDATE questions SET upvotes = $1 WHERE question_id = $2 RETURNING *',
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