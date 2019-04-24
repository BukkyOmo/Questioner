/* eslint-disable consistent-return */
import passwordhash from 'password-hash';
import Auth from '../helpers/auth';
import pool from '../Model/connection';

const { generateToken } = Auth;


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
	static signup = (request, response) => {
		const {
			username, email, password
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
					text: 'INSERT INTO users (username, email, password, isadmin) VALUES($1, $2, $3, $4) RETURNING *',
					values: [username, email, hash, false]
				};

				pool.query(insertQuery)
					.then((users) => {
						if (users.rows) {
							const token = generateToken(users.rows[0].id, users.rows[0].isadmin);
							return response.status(201).json({
								status: 201,
								data: [{
									token,
									userId: users.rows[0].id,
									user: users.rows[0].username
								}],
							});
						}
					})
					.catch(error => (
						response.status(500).json({
							status: 500,
							error: 'Something went wrong'
						})
					));
			});
	}

	static signin = (request, response) => {
		const { email, password } = request.body;

		const selectQuery = { text: 'SELECT * from users WHERE email = $1', values: [email] };

		pool.query(selectQuery)
			.then((result) => {
				if (result.rows.length === 0) {
					return response.status(404).json({
						status: 404,
						error: 'Incorrect email or password'
					});
				}
				if (passwordhash.verify(password, result.rows[0].password)) {
					const token = generateToken(result.rows[0].id, result.rows[0].isadmin);
					return response.status(200).json({
						status: 200,
						data: [{
							token,
							user: result.rows[0].username
						}],
					});
				}
				return response.status(409).json({
					status: 409,
					error: 'Incorrect email or password'
				});
			})
			.catch(err => (
				response.status(500).json({
					status: 500,
					error: 'Something went wrong'
				})
			));
	}
}
export default UserController;
