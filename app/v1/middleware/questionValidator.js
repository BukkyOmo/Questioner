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
	static createQuestionValidator(request, response, next) {
		request.check('title', 'Title is required').notEmpty();
		request.check('title', 'Title must be a string').isString();
		request.check('body', 'Body is required').notEmpty();
		request.check('body', 'Body must be a string').isString();
		const errors = request.validationErrors();
		const validationErrors = [];
		if (errors) {
			errors.map(err => validationErrors.push(err.msg));
			return response.status(400).json({
				errors: validationErrors,
				error: true,
			});
		}
		const {
			title, body
		} = request.body;
		request.body.title = title.replace(/\s{2,}/g, '').trim();
		request.body.body = body.replace(/\s{1,}/g, '').trim();
		return next();
	}
}
export default questionValidator;
