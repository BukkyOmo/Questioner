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
}

export default Authentication;
