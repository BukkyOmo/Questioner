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
	static rsvpValidator(request, response, next) {
		let { status } = request.body;
		status = status.toLowerCase();
		const rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';
		if (!rsvpStatus) {
			return response.status(400).json({
				status: 400,
				error: 'Rsvp status should be yes, no or maybe'
			});
		}
		return next();
	}
}
export default RsvpValidator;
