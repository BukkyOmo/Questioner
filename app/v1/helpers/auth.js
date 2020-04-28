/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import config from '../../../config';

class Auth {
	static generateToken (id, isAdmin) {
		const token = jwt.sign({ id, isAdmin },
			config.SECRET,
			{ expiresIn: '24h' });

		return token;
	}

	static verifyToken(token) {
		return jwt.verify(token, config.SECRET)
	}
}
export default Auth;
