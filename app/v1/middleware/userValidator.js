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
		request.check('firstname', 'firstname is required').notEmpty();
		request.check('firstname', 'firstname must be a string').isString();
		request.check('lastname', 'lastname is required').notEmpty();
		request.check('lastname', 'lastname must be a string').isString();
		request.check('email', 'email must be a valid email').isEmail();
		request.check('email', 'email is required').notEmpty();
		request.check('phoneNumber', 'phoneNumber must be valid').isNumeric();
		request.check('phoneNumber', 'phoneNumber must be valid').trim().isLength({ min: 11, max: 11 });
		request.check('password', 'password is required').notEmpty();
		request.check('password', 'password must be longer than 5 characters').isLength({ min: 5 });
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
			firstname, lastname, email, password, username
		} = request.body;
		request.body.firstname = firstname.replace(/\s{2,}/g, '').trim();
		request.body.lastname = lastname.replace(/\s{1,}/g, '').trim();
		request.body.email = email.replace(/\s{2,}/g, '').trim();
		request.body.password = password.replace(/\s{1,}/g, '').trim();
		request.body.username = username.replace(/\s{2,}/g, '').trim();
		return next();
	}
}
export default userValidator;
