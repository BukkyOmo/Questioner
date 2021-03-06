class meetupValidator {
	/**
	 *@description - Checks the request parameters for creating new meetup are of the right formart
	 *
	 * @static
	 *
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}- status code and error message or next()
	 * @memberof createMeetupValidator
	 */
	static createMeetupValidator(request, response, next) {
		request.check('topic', 'Topic is required').notEmpty();
		request.check('topic', 'Topic must be a string').isString();
		request.check('location', 'Location is required').notEmpty();
		request.check('location', 'Location must be a string').isString();
		request.check('happeningOn', 'HappeningOn is required').notEmpty();
		request.check('happeningOn', 'HappeningOn must be a string').isString();
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
			topic, location, happeningOn,
		} = request.body;
		request.body.topic = topic.replace(/\s{2,}/g, '').trim();
		request.body.location = location.replace(/\s{1,}/g, '').trim();
		request.body.happeningOn = happeningOn.replace(/\s{2,}/g, '').trim();
		return next();
	}
}
export default meetupValidator;
