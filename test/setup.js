import cmd from 'node-cmd';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../config';
import db from '../config/database';
import app from '../index';

chai.use(chaiHttp);

const adminToken = config.ADMIN_TOKEN;

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

before((done) => {
	chai
		.request(app)
		.post('/api/v2/meetups')
		.set('Accept', 'application/json')
		.set('authorization', adminToken)
		.send({
			topic: 'Genius meetup',
			description: 'A gathering of female techies interested in Cloud computing',
			location: 'Oriental hotel',
			date: '2021-06-22',
			time: '15:00:00',
			image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
		})
		.end((err, res) => {
			assert.equal(res.body.message, 'Meetup created successfully.');
			assert.equal(res.body.statusCode, 200);
			assert.equal(res.body.status, 'Success');
			done();
		});
});

before((done) => {
	chai
		.request(app)
		.post('/api/v2/questions/meetup/1')
		.set('Accept', 'application/json')
		.set('authorization', adminToken)
		.send({
			title: 'Blackbody radiation not for me',
			body: 'How does the science of blackbody radiation come about and when?'
		})
		.end((err, res) => {
			assert.equal(res.body.message, 'Question saved successfully.');
			assert.equal(res.body.statusCode, 200);
			assert.equal(res.body.status, 'Success');
			done();
		});
});
