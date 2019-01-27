class paramsValidator {
	/**
	 *@description - Checks the request parameters for the ID sent via url
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}
	 * @memberof paramsValidator
	 */
	static getParamsValidator(request, response, next) {
		const {
			meetupId, userId, questionId, commentId
		} = request.params;
		const validateId = /^[0-9]+$/;
		const validateParams = (params) => {
			if (!params.match(validateId)) {
				return response.status(400).json({
					status: 400,
					message: false,
					error: ({ message: 'ID must be a number' })
				});
			}
			return next();
		};
		if (meetupId) validateParams(meetupId);
		if (questionId) validateParams(questionId);
		if (userId) validateParams(userId);
		if (commentId) validateParams(commentId);
	}
}
export default paramsValidator;
