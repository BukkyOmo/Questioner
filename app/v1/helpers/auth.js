/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class Auth {
	static generateToken = (id, isAdmin) => {
		const token = jwt.sign({ id, isAdmin },
			process.env.SECRET,
			{ expiresIn: '24h' });

		return token;
	}

	static verifyToken = token => jwt.verify(token, process.env.SECRET)
}
export default Auth;
