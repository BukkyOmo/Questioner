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

	static async getOneQuestion(userPayload) {
		const { question_id } = userPayload;
		const getQuestion = {
			text: questionQueries.getQuestion,
			values: [question_id]
		};
		const queryObj1 = {
			text: questionQueries.getOneQuestion,
			values: [question_id]
		};
		try {
			const { rowCount } = await db.query(getQuestion);
			if (rowCount === 0) {
				return failureResponseFormat('Question you try to retrieve does not exist.', 400, 'Failure');
			}
			const { rows } = await db.query(queryObj1);
			return successResponseFormat('Question retrieved successfully.', 200, 'Success', rows);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async editQuestion(questionPayload, userPayload, params) {
		const { title, body } = questionPayload;
		const { id: user_id } = userPayload;
		const { question_id } = params;
		const queryObj1 = {
			text: questionQueries.getQuestion,
			values: [question_id]
		};
		const queryObj2 = {
			text: questionQueries.getQuestionOwner,
			values: [question_id, user_id]
		};
		const queryObj3 = {
			text: questionQueries.editQuestion,
			values: [title, body, question_id]
		};
		try {
			const { rowCount } = await db.query(queryObj1);
			if (rowCount === 0) {
				return failureResponseFormat('The question you tried to edit does not exist.', 400, 'Failure');
			}
			const checkQuestionUser = await db.query(queryObj2);
			if (checkQuestionUser.rowCount === 0) {
				return failureResponseFormat('You cannot edit this question as it doesn\'t belong to you.', 400, 'Failure');
			}
			const { rows } = await db.query(queryObj3);
			return successResponseFormat('Question edited successfully.', 200, 'Success', rows);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default QuestionService;
