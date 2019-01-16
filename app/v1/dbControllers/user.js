import pool from '../dbModel/connection';

class UserController {
	static signup(request, response) {
		const selectQuery = {
			text: 'INSERT INTO users (firstname, lastname, username, phoneNumber, email, password, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			values: ['Bukola', 'Oudnayo', 'freeze2', '080934656878', 'odunayouiok@gmail.com', 'bukky1', false]
		};
		pool.query(selectQuery).then((users) => {
			console.log(users);
			if (users.rows) {
				return response.status(201).json({
					status: 201,
					message: true,
					data: users.rows[0]
				});
			}
		}).catch(error => (
			response.status(500).json(error)
		));
	}
}
export default UserController;
