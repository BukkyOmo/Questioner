/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';
import pool from '../Model/connection';

const { verifyToken } = Auth;

dotenv.config();

class CommentController {
	static createComment = (request, response) => {
		const {
			body, id
		} = request.body;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const createdBy = decodedToken.id;

		const selectQuery = { text: 'SELECT * FROM questions WHERE id = $1', values: [id] };
		return pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length === 0) {
					return response.status(404).json({
						status: 404,
						error: 'The question you tried to post a question to cannot be found'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO comment (user_id, question_id, body) VALUES($1, $2, $3) RETURNING user_id, question_id, body',
					values: [createdBy, id, body]
				};

				return pool.query(insertQuery)
					.then((comment) => {
						if (comment.rows) {
							return response.status(201).json({
								status: 201,
								data: [{
									comment: comment.rows[0]
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
}
export default CommentController;
