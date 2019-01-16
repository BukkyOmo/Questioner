import pool from '../dbModel/connection';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

class UserController {
	static signup(request, response) {
		const {
			firstname, lastname, username, phoneNumber, email, password
		} = request.body;
		pool.query({ text: 'SELECT email FROM users WHERE email = $1', values: [email] })
			.then((result) => {
				console.log(result);
				if (result.rows.length > 0) {
					return response.status(409).json({
						status: 409,
						message: false,
						error: ({ message: 'user already exists' })
					});
				}
				const selectQuery = {
					text: 'INSERT INTO users (firstname, lastname, username, phoneNumber, email, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
					values: [firstname, lastname, username, phoneNumber, email, password, false]
				};
				pool.query(selectQuery).then((users) => {
					if (users.rows) {
						const token = jwt.sign({ id: users.rows[0].id, isAdmin: users.rows[0].isadmin}, secret, { expiresIn: 'hrs' });
						return response.status(201).json({
							token, 
							status: 201,
							message: true,
							data: [users.rows[0]]
						});
					}
				}).catch(error => (
					response.status(500).json({
						status: 500,
						message: false,
						error: ({ message: 'Internal server error' })
					})
				));
			});
	}
}
export default UserController;
