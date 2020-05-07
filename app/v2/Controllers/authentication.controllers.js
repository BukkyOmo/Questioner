import AuthService from '../Services/authentication.services';

class Authentication {
	/**
	*  User signup
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async userSignUp(req, res) {
		try {
			const result = await AuthService.userSignUp(req.body);
			return res.status(201).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	/**
	*  User signin
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async userSignIn(req, res) {
		try {
			const result = await AuthService.userSignIn(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	/**
	*  Reset password begins (request is sent by user)
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async forgotPassword(req, res) {
		try {
			const result = await AuthService.forgotPassword(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	/**
	*  Reset password end
	* @static method
	* @param  {object} body - Request object
	* @return {promise} res
	*/
	static async resetPassword(req, res) {
		try {
			const result = await AuthService.resetPassword(req.body, req.params);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default Authentication;
