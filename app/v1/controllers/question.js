import question from '../models/question';
import user from '../models/users';

const questionController = {
	/**
	 *
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	createQuestion(request, response) {
		const { title, content } = request.body;
		const newQuestion = {
			id: question.length + 1,
			createdOn: Date(),
			createdBy: user.id,
			meeetup: request.params,
			title,
			content
		};
		if (newQuestion.title && newQuestion.content) {
			question.push(newQuestion);
			return response.json({
				status: 200,
				message: true,
				data: {
					user: user.id,
					meetup: request.params,
					title: request.body.title,
					content: request.body.content
				}
			});
		}
		return response.json(
			{
				status: 404,
				message: false,
				data: ({ message: 'meetup cannot be created' })
			}
		);
	},
	/**
	 *
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	upvoteQuestion(request, response) {
		const findQuestion = question
			.find(onequestion => onequestion.id === Number(request.params.id));
		if (!findQuestion) {
			return response.json({
				status: 404,
				message: false,
				error: 'The question you tried to upvote does not exist'
			});
		}
		findQuestion.votes += 1;
		return response.json({
			status: 200,
			message: true,
			data: [{
				meetup: request.params.meetupId,
				title: findQuestion.title,
				content: findQuestion.content,
				votes: findQuestion.votes
			}]
		});
	},
	/**
		 * Downvote a question record
		 *
		 * @param {object} request
		 * @param {object} response
		 *
		 * @returns {object}
		 */
	downvoteQuestion(request, response) {
		const searchQuestion = question
			.find(onequestion => onequestion.id === Number(request.params.id));
		if (!searchQuestion) {
			return response.json({
				status: 404,
				message: false,
				error: 'The question you tried to downvote does not exist'
			});
		}
		searchQuestion.votes -= 1;
		return response.json({
			status: 200,
			message: true,
			data: [{
				meetup: request.params.meetupId,
				title: searchQuestion.title,
				content: searchQuestion.content,
				votes: searchQuestion.votes
			}]
		});
	},
};
export default questionController;
