import passwordHash from 'password-hash';
import pool from './connection';

const password = passwordHash.generate('testing');
const email = 'testing@gmail.com';
const username = 'testing1';

const user = `INSERT INTO users(email, username, password, isadmin) values('${email}', '${username}', '${password}', ${true})`;

pool.query(user)
	.then((result) => {
		if (result) {
			console.log('seeder created');
		}
	})
	.catch((error) => {
		console.log(error);
	});
