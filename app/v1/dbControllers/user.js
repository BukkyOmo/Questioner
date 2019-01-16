import pool from '../dbModel/connection';

class UserController {
	static signup(request, response) {
		const {
			firstname, lastname, username, phoneNumber, email, password
		} = request.body;
		const selectQuery = {
			text: 'INSERT INTO users (firstname, lastname, username, phoneNumber, email, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			values: [firstname, lastname, username, phoneNumber, email, password, false]
		};
		pool.query(selectQuery).then((users) => {
			console.log(users);
			if (users.rows) {
				return response.status(201).json({
					status: 201,
					message: true,
					data: [users.rows[0]]
				});
			}
		}).catch(error => (
			response.status(400).json({
				status: 400,
				message: false,
				error: ({ message: 'username or email already exists' })
			})
		));
	}
}
export default UserController;
