/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../dbModel/connection';

dotenv.config();
class Auth {
	static generateToken(id, isAdmin) {
		const token = jwt.sign({
			id, isAdmin
		},
		process.env.SECRET,
		{ expiresIn: '24h' });

		return token;
	}

	static isLogin(req, res, next) {
		const token = req.headers.token || req.body.token;
		if (!token) {
			return res.status(409).json({ error: 'Unauthorized' });
		}
		return next();
	}

	static verifyToken(token) {
		return jwt.verify(token, process.env.SECRET);
	}
}
export default Auth;
