import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../dbModel/connection';


dotenv.config();

const secret = process.env.SECRET;

class UserController {
	static signup(request, response) {
		const {
			firstname, lastname, username, phoneNumber, email, password
		} = request.body;
		pool.query({ text: 'SELECT * FROM users WHERE email = $1 OR username = $2', values: [email, username] })
			.then((result) => {
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
						const token = jwt.sign({ id: users.rows[0].user_id, isAdmin: users.rows[0].isadmin }, secret, { expiresIn: '1h' });
						return response.status(201).json({
							status: 201,
							message: 'Your registration was successful',
							data: [{
								token,
								user: users.rows[0]
							}],
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
