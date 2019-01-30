/* eslint-disable consistent-return */
import passwordhash from 'password-hash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../dbModel/connection';


dotenv.config();

const secret = process.env.SECRET;

class UserController {
	/**
	 *@description- An endpoint to create a user account
	 *
	 * @static
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof UserController
	 */
	static signup(request, response) {
		const {
			firstname, lastname, username, phoneNumber, email, password
		} = request.body;
		const hash = passwordhash.generate(password);

		const selectQuery = { text: 'SELECT * FROM users WHERE email = $1 OR username = $2', values: [email, username] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						error: 'user already exists'
					});
				}

				const insertQuery = {
					text: 'INSERT INTO users (firstname, lastname, username, phoneNumber, email, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
					values: [firstname, lastname, username, phoneNumber, email, hash, false]
				};

				pool.query(insertQuery)
					.then((users) => {
						if (users.rows) {
							const token = jwt.sign({ id: users.rows[0].user_id, isAdmin: users.rows[0].isadmin }, secret, { expiresIn: '1h' });
							return response.status(201).json({
								status: 201,
								data: [{
									token,
									user: users.rows[0]
								}],
							});
						}
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							error: 'Internal server error'
						})
					));
			});
	}

	static signin(request, response) {
		const { email, password } = request.body;

		const selectQuery = { text: 'SELECT * from users WHERE email = $1', values: [email] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length > 0) {
					if (passwordhash.verify(password, result.rows[0].password)) {
						const token = jwt.sign({ id: result.rows[0].user_id, isAdmin: result.rows[0].isadmin }, secret, { expiresIn: '432h' });
						return response.status(200).json({
							status: 200,
							data: [{
								token,
								user: result.rows[0]
							}],
						});
					}
					return response.status(409).json({
						status: 409,
						error: 'Invalid credentials'
					});
				}

				return response.status(404).json({
					status: 404,
					error: 'No user found'
				});
			})
			.catch(err => (
				response.status(500).json({
					status: 500,
					error: 'Internal server error'
				})
			));
	}
}
export default UserController;
