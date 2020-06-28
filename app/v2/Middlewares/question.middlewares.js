import Joi from 'joi';

const createQuestionSchema = Joi.object().keys({
	title: Joi.string().min(3).max(100).required(),
	body: Joi.string().required(),
});

const editQuestionSchema = Joi.object().keys({
	title: Joi.string().min(3).max(100).required(),
	body: Joi.string().required(),
});

class QuestionMiddleware {
	static async createQuestion(req, res, next) {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({
				message: 'Please fill all fields',
				statusCode: 400,
				status: 'Failure'
			});
		}
		try {
			await Joi.validate(req.body, createQuestionSchema);
			return next();
		} catch (error) {
			return res.status(400).json({
				message: error.details[0].message.replace(/"/g, ''),
				statusCode: 400,
				status: 'Failure'
			});
		}
	}

	static async editQuestion(req, res, next) {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({
				message: 'Please fill all fields',
				statusCode: 400,
				status: 'Failure'
			});
		}
		try {
			await Joi.validate(req.body, editQuestionSchema);
			return next();
		} catch (error) {
			return res.status(400).json({
				message: error.details[0].message.replace(/"/g, ''),
				statusCode: 400,
				status: 'Failure'
			});
		}
	}
}

export default QuestionMiddleware;
