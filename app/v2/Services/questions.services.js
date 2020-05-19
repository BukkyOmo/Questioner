import meetupQueries from '../Queries/meetup.queries';
import questionQueries from '../Queries/question.queries';
import db from '../../../config/database';
import ResponseFormat from '../Utils/responseFormat.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

class QuestionService {
	static async createQuestion(userPayload, questionBody, user) {
		const { meetup_id } = userPayload;
		const { title, body } = questionBody;
		const { id: user_id } = user;

		const queryObj = {
			text: meetupQueries.findMeetupById,
			values: [meetup_id]
		};
		const queryObj1 = {
			text: questionQueries.checkQuestion,
			values: [body, meetup_id]
		};
		const queryObj2 = {
			text: questionQueries.saveQuestion,
			values: [title, body, user_id, meetup_id]
		};

		try {
			const { rowCount } = await db.query(queryObj);
			if (rowCount === 0) {
				return failureResponseFormat('Meetup you try to post a question to does not exist in database.', 400, 'Failure');
			}

			const data = await db.query(queryObj1);
			if (data.rowCount === 1) {
				return failureResponseFormat('Question already exists in database.', 400, 'Failure');
			}

			const { rows } = await db.query(queryObj2);
			return successResponseFormat('Question saved successfully.', 200, 'Success', rows);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async getAllUserQuestion(user) {
		const { id } = user;
		const queryObj = {
			text: questionQueries.getAllUserQuestion,
			values: [id]
		};
		try {
			const { rows, rowCount } = await db.query(queryObj);
			return successResponseFormat('User questions fetched successfully.', 200, 'Success', rows, rowCount);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default QuestionService;
