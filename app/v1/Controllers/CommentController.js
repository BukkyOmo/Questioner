/* eslint-disable consistent-return */
import Auth from '../helpers/auth';
import pool from '../../../config/database';

const { verifyToken } = Auth;

class CommentController {
	static createComment = (request, response) => {
		const { body, id } = request.body;
		const token = request.headers.token || request.body.token;
		const decodedToken = verifyToken(token);
		const createdBy = decodedToken.id;

		const selectQuery = {
			text: 'SELECT * FROM questions WHERE id = $1',
			values: [id]
		};
		return pool.query(selectQuery).then((result) => {
			if (result.rows.length === 0) {
				return response.status(404).json({
					status: 404,
					error: 'The question you tried to post a comment to cannot be found'
				});
			}

			const insertQuery = {
				text:
					'INSERT INTO comment (user_id, question_id, body) VALUES($1, $2, $3) RETURNING user_id, question_id, body',
				values: [createdBy, id, body]
			};

			return pool
				.query(insertQuery)
				.then((comment) => {
					if (comment.rows) {
						return response.status(201).json({
							status: 201,
							data: [
								{
									comment: comment.rows[0]
								}
							]
						});
					}
				})
				/* istanbul ignore next */
				.catch(error => response.status(500).json({
					status: 500,
					error: 'Something went wrong'
				}));
		});
	};

	// get a comment
	static getComment = (request, response) => {
		const { id } = request.params;

		const selectQuery = {
			text: 'SELECT * FROM comment WHERE id = $1',
			values: [id]
		};

		pool
			.query(selectQuery)
			.then((result) => {
				const comment = result.rows;
				if (comment.length === 1) {
					return response.status(200).json({
						status: 200,
						data: comment
					});
				}
				return response.status(404).json({
					status: 404,
					error: 'Comment cannot be found'
				});
			})
			/* istanbul ignore next */
			.catch((error) => {
				response.status(500).json({
					status: 500,
					error: 'Something unexpected happened'
				});
			});
	};

	// get all comments
	static getCommentsByQuestion = (request, response) => {
		// anyone signed in can get all comments
		// that means we need just the isLogin middleware
		const { id } = request.params;

		const selectQuery = {
			text: 'SELECT * FROM comment where question_id = $1',
			values: [id]
		};

		pool
			.query(selectQuery)
			.then((result) => {
				const comments = result.rows;
				if (comments.length > 0) {
					return response.status(200).json({
						status: 200,
						data: comments
					});
				}
				return response.status(404).json({
					status: 404,
					error: 'There is no comment available'
				});
			})
			/* istanbul ignore next */
			.catch((error) => {
				response.status(500).json({
					status: 500,
					error: 'Something unexpected happened',
				});
			});
	};
}
export default CommentController;
