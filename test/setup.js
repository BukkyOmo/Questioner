import cmd from 'node-cmd';
import db from '../config/database';

before('SETUP MIGRATIONS BEFORE TESTING', (done) => {
	console.log(`RUNNING MIGRATIONS [${process.env.NODE_ENV}] + UP`);
	cmd.get('npm run migrate:up', (err, data) => {
		if (err) {
			console.log('An error occured', err);
			process.exit(1);
		} else {
			console.log(data);
			console.log('MIGRATION COMPLETE');
			done();
		}
	});
});

before('SEED TEST DB', async () => {
	await db.query({
		text: 'INSERT INTO users(id, first_name, last_name, email, password, role) VALUES(\'6aca3d12-06f6-429c-a073-39da7a622b81\', \'Bukola\', \'Odunayo\', \'odunayobukky1@gmail.com\', \'$2b$10$XXPj/wj4oPytF5w6moiQFeHQQis5FmcdlJJnsRNchu4YPHTK5fXi2\', \'user\')'
	});
});
