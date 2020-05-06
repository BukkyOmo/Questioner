import AuthService from '../Services/authentication.services';

class Authentication {
	static async userSignUp(req, res) {
		try {
			const result = await AuthService.userSignUp(req.body);
			return res.status(201).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	static async userSignIn(req, res) {
		try {
			const result = await AuthService.userSignIn(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	static async forgotPassword(req, res) {
		try {
			const result = await AuthService.forgotPassword(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

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
