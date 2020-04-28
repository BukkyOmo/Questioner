class RsvpValidator {
	/**
	 *@description - Checks the request parameters for creating rsvp are of the right formart
	 *
	 * @static
	 *
	 * @param {object} request
	 * @param {object} response
	 * @returns {object}
	 * @memberof RsvpValidator
	 */
	static rsvpValidator (request, response, next) {
		const { body } = request.body;
		const myStatus = body.toLowerCase();
		if (myStatus === 'yes' || myStatus === 'no' || myStatus === 'maybe') {
			return next();
		}
		return response.status(400).json({
			status: 400,
			error: 'Rsvp status should be yes, no or maybe',
		});
	}
}
export default RsvpValidator;
