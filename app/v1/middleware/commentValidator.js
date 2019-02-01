class CommentValidator {
	/**
	 *@description - Checks the request parameters for creating new meetup are of the right formart
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}- status code and error message or next()
	 * @memberof createCommentValidator
	 */
	static createCommentValidator(request, response, next) {
		request.check('body', 'Comment body is required').notEmpty();
		request.check('body', 'Comment body should be a string').isString();
		const errors = request.validationErrors();
		const validationErrors = [];
		if (errors) {
			errors.map(err => validationErrors.push(err.msg));
			return response.status(400).json({
				errors: validationErrors,
			});
		}
		const { body } = request.body;
		request.body.body = body.replace(/\s{2,}/g, '').trim();
		return next();
	}
}
export default CommentValidator;
