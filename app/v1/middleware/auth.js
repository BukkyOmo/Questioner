/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Auth from '../helpers/auth';

const { verifyToken } = Auth;

dotenv.config();

class VerifyToken {
	static isLogin = (req, res, next) => {
		const token = req.body.token || req.headers.token;

		try {
			console.log(token)
			const decodedToken = verifyToken(token);
			console.log(decodedToken)
			if (decodedToken.id) {
				return next();
			}
		} catch (err) {
			return res.status(401).json({
				status: 401,
				error: 'Unauthorized User',
			});
		}
		return next();
	}
}
export default VerifyToken;
