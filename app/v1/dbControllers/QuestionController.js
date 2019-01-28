/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import pool from '../dbModel/connection';

dotenv.config();

class QuestionController {
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
}
export default QuestionController;
