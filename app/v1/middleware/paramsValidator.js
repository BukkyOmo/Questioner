class paramsValidator {
	/**
	 *@description - Checks the request parameters for the ID sent via url
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}
	 * @memberof getParamsValidator
	 */
	static getParamsValidator = (request, response, next) => {
		const { id } = request.params;
		const validateId = /^[0-9]+$/;
		const validateParams = (params) => {
			if (!params.match(validateId)) {
				return response.status(400).json({
					status: 400,
					error: 'Invalid ID. ID must be a number'
				});
			}
			return next();
		};
		if (id) {
			validateParams(id);
		}
	}
}
export default paramsValidator;
