import db from '../../../config/database';
import questionQueries from '../Queries/question.queries';
import commentQueries from '../Queries/comment.queries';
import ResponseFormat from '../Utils/responseFormat.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;
class CommentService {
	static async createComment(commentBody, params, userPayload) {
		const { id } = userPayload;
		const { comment } = commentBody;
		const { question_id } = params;

		const queryObj = {
			text: questionQueries.getQuestion,
			values: [question_id]
		};
		const queryObj1 = {
			text: commentQueries.getComment,
			values: [comment]
		};
		const queryObj2 = {
			text: commentQueries.saveComment,
			values: [comment, id, question_id]
		};

		try {
			const { rowCount } = await db.query(queryObj);
			if (rowCount === 0) {
				return failureResponseFormat('The question you try to post to does not exist in database.', 400, 'Failure');
			}
			const commentExist = await db.query(queryObj1);
			if (commentExist.rowCount === 1) {
				return failureResponseFormat('This comment already exist in database.', 400, 'Failure');
			}
			const { rows } = await db.query(queryObj2);
			return successResponseFormat('Comment saved successfully.', 201, 'Success', rows[0]);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default CommentService;
