

import question from '../models/question';
import user from '../models/users';

const questionController = {
	createQuestion(request, response) {
		const newQuestion = {
			id: question.length + 1,
			createdOn: Date(),
			createdBy: user.id,
			meeetup: request.params,
			title: request.body.title,
			content: request.body.content
		};
		if (newQuestion.title && newQuestion.content) {
			question.push(newQuestion);
			return response.json(
				{
					status: 200,
					message: true,
					data: {
						user: user.id,
						meetup: request.params,
						title: request.body.title,
						content: request.body.content
					}
				}
			);
		}
		return response.json(
			{
				status: 404,
				message: false,
				data: 'meetup cannot be created'
			}
		);
	}
};

export default questionController;
