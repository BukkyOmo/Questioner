/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';
import pool from '../dbModel/connection';

const { verifyToken } = Auth;

dotenv.config();

class CommentController {
	static createComment(request, response) {
		const { body } = request.body;
		const { id } = request.params;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const createdBy = decodedToken.id;

		const selectQuery = { text: 'SELECT * FROM questions WHERE question_id = $1', values: [id] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length === 0) {
					return response.status(404).json({
						status: 404,
						error: 'Question you wish to comment on does not exist'
					});
				}
				const insertQuery = `INSERT INTO comment (user_id, question_id, body) VALUES (${createdBy}, ${id}, '${body}') RETURNING *`;
				pool.query(insertQuery)
					.then((comment) => {
						if (comment.rows) {
							return response.status(201).json({
								status: 201,
								data: comment.rows[0]
							});
						}
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							error: 'Internal server error'
						}, console.log(error))
					));
			});
	}
}
export default CommentController;
