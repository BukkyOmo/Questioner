class questionValidator {
	/**
	 *@description - Checks the request parameters for creating new question are of the right formart
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}- status code and error message or next()
	 * @memberof createQuestionValidator
	 */
	static createQuestionValidator = (request, response, next) => {
		request.check('title', 'Title is required')
			.trim()
			.notEmpty()
			.withMessage('Title is required')
			.isString()
			.withMessage('Title must be a string')
			.isLength({ min: 10 })
			.withMessage('Title should have a minimum of ten characters')
			.not()
			.isNumeric()
			.withMessage('Title should not be a number');
		request.check('body', 'Body is required')
			.trim()
			.notEmpty()
			.withMessage('Body is required')
			.isString()
			.withMessage('Body must be a string')
			.isLength({ min: 10 })
			.withMessage('Body should have a minimum of ten characters')
			.not()
			.isNumeric()
			.withMessage('Body should not be a number');

		const errors = request.validationErrors();
		const validationErrors = [];
		if (errors) {
			errors.map(err => validationErrors.push(err.msg));
			return response.status(400).json({
				errors: validationErrors,
				error: true,
			});
		}
		return next();
	}
}
export default questionValidator;
