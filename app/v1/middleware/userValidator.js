class userValidator {
	/**
	 *@description - Checks the request parameters for creating new meetup are of the right formart
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * @param {object} next
	 * @returns {object}- status code and error message or next()
	 * @memberof signupValidator
	 */
	static signupValidator = (request, response, next) => {
		request.check('email', 'email must be a valid email').isEmail();
		request.check('email', 'email is required').notEmpty();
		request.check('password', 'password is required').notEmpty();
		request.check('password', 'password must be longer than 6 characters').isLength({ min: 6 });
		request.check('username', 'username must be a string').isString();
		request.check('username', 'username is required').notEmpty();
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
			email, password, username
		} = request.body;
		request.body.email = email.replace(/\s{2,}/g, '').trim();
		request.body.password = password.replace(/\s{1,}/g, '').trim();
		request.body.username = username.replace(/\s{2,}/g, '').trim();
		return next();
	}

	/**
 *@description - Checks the request parameters for creating new meetup are of the right formart
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object}- status code and error message or next()
 * @memberof signupValidator
 */
	static signinValidator = (request, response, next) => {
		request.check('email', 'email must be a valid email').isEmail();
		request.check('email', 'email is required').notEmpty();
		request.check('password', 'password is required').notEmpty();
		request.check('password', 'password must be longer than 6 characters').isLength({ min: 6 });
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
			email, password
		} = request.body;
		request.body.email = email.replace(/\s{2,}/g, '').trim();
		request.body.password = password.replace(/\s{1,}/g, '').trim();
		return next();
	}
}
export default userValidator;
