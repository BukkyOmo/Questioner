import question from '../models/question';
import user from '../models/users';

const questionController = {
	/** Create a question record
	 *
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	createQuestion(request, response) {
		const { title, content } = request.body;
		const { meetup } = request.params;
		const newQuestion = {
			id: question.length + 1,
			createdOn: Date(),
			createdBy: user.id,
			meetup,
			title,
			content
		};
		if (title && content) {
			question.push(newQuestion);
			return response.status(201).json({
				status: 201,
				message: true,
				data: [{
					user: user.id,
					meetup: request.params,
					title: request.body.title,
					content: request.body.content
				}]
			});
		}
		return response.status(404).json(
			{
				status: 404,
				message: false,
				error: ({ message: 'meetup cannot be created' })
			}
		);
	},

	/**
	 *Get a question record
	 *
	 * @param {object} request
	 * @param {object} response
	 *
	 * @returns {object}
	 */
	getQuestion(request, response) {
		const findQuestion = question.find(onequestion => onequestion.id === Number(request.params.id));
		if (!findQuestion) {
			return response.status(404).json({
				status: 404,
				message: false,
				error: ({ message: 'This quetsion does not exist' })
			});
		}
		return response.status(200).json({
			status: 200,
			message: true,
			data: [{ findQuestion }]
		});
	},

	/**
	 *Upvote a question record
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
			return response.status(404).json({
				status: 404,
				message: false,
				error: 'The question you tried to upvote does not exist'
			});
		}
		findQuestion.upvotes += 1;
		return response.status(201).json({
			status: 201,
			message: true,
			data: [{
				meetup: request.params.meetupId,
				title: findQuestion.title,
				content: findQuestion.content,
				upvotes: findQuestion.upvotes
			}]
		});
	},
	/**
		 *Downvote a question record
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
			return response.status(404).json({
				status: 404,
				message: false,
				error: 'The question you tried to downvote does not exist'
			});
		}
		searchQuestion.downvotes -= 1;
		return response.status(201).json({
			status: 201,
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
