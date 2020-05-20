import Joi from 'joi';

const createCommentSchema = Joi.object().keys({
	comment: Joi.string().required()
});

class CommentMiddleware {
	static async createComment(req, res, next) {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({
				message: 'Please fill all fields',
				statusCode: 400,
				status: 'Failure'
			});
		}
		try {
			await Joi.validate(req.body, createCommentSchema);
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

export default CommentMiddleware;
