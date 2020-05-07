import jwt from 'jsonwebtoken';
import config from '../../../config';

class Authorization {
	/**
    * Validate user
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {object|void} response object
    */
	static async isLoggedIn(req, res, next) {
		const token = req.headers['x-access-token'] || req.headers.authorization;
		if (!token) {
			return res.status(401).json({
				message: 'Access denied. No token provided.',
				statusCode: 401,
				status: 'Failure'
			});
		}
		try {
			const decoded = jwt.verify(token, config.SECRET);
			req.user = decoded;
			return next();
		} catch (error) {
			return res.status(400).json({
				message: 'Invalid token. Please provide a valid token',
				statusCode: 400,
				status: 'Failure'
			});
		}
	}

	/**
    * Check Admin
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {object|void} response object
    */
	static async isAdmin(req, res, next) {
		if (req.user && req.user.role !== 'admin') {
			return res.status(401).json({
				message: 'Permission denied, You do not have authorized access.',
				statusCode: 401,
				status: 'Failure'
			});
		}
		return next();
	}
}

export default Authorization;
