import passwordHash from 'password-hash';
import pool from './connection';

const firstname = 'testfirstname';
const lastname = 'testlastname';
const password = passwordHash.generate('testing');
const phoneNumber = '09045678698';
const email = 'testing@gmail.com';
const username = 'testing1';

const user = `INSERT INTO users(firstname, lastname, email, username, phoneNumber, password, isadmin) values('${firstname}', '${lastname}','${email}', '${username}', '${phoneNumber}', '${password}', ${true})`;

pool.query(user)
	.then((result) => {
		if (result) {
			console.log('seeder created');
		}
	})
	.catch((error) => {
		console.log(error);
	});
