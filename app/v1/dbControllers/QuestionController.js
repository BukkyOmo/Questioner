/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class QuestionController {
	/**
	 *Create a question record
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof QuestionController
	 */
	static createQuestion(request, response) {
		const {
			title, content
		} = request.body;

		const selectQuery = { text: 'SELECT * FROM questions WHERE content = $1', values: [content] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						message: 'Question already exists'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO questions (title, content) VALUES($1, $2) RETURNING *',
					values: [title, content]
				};

				pool.query(insertQuery)
					.then((question) => {
						if (question.rows) {
							return response.status(201).json({
								status: 201,
								message: 'Question was successfully posted',
								data: [{
									question: question.rows[0]
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
	 *Get a question record
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
						success: true,
						message: 'Question successfully retrieved',
						data: question
					});
				}
				return response.status(404).json({
					status: 404,
					success: false,
					error: 'Question cannot be found'
				});
			})
			.catch((error) => {
				response.status(500).json({
					status: 500,
					message: false,
					error: 'Internal server error'
				});
			});
	}
}
export default QuestionController;
