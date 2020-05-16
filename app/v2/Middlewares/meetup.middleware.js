import Joi from 'joi';

const createMeetupSchema = Joi.object().keys({
	topic: Joi.string().min(3).max(50).required(),
	description: Joi.string().min(3).max(150).required(),
	location: Joi.string().required(),
	date: Joi.date().required(),
	time: Joi.string().required(),
	image_url: Joi.string().required()
});
const integerSchema = Joi.object().keys({
	params: Joi.number().required()
});
class MeetupMiddleware {
	static async createEditMeetup(req, res, next) {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({
				message: 'Please fill all fields',
				statusCode: 400,
				status: 'Failure'
			});
		}
		try {
			await Joi.validate(req.body, createMeetupSchema);
			return next();
		} catch (error) {
			return res.status(400).json({
				message: error.details[0].message.replace(/"/g, ''),
				statusCode: 400,
				status: 'Failure'
			});
		}
	}

	static async validateParams(req, res, next) {
		try {
			await Joi.validate(req.params, integerSchema);
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


export default MeetupMiddleware;
