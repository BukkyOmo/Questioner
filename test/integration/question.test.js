import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import config from '../../config';

chai.use(chaiHttp);
const userToken = config.USER_TOKEN;
const adminToken = config.ADMIN_TOKEN;
let token = null;

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
		.post('/api/v2/auth/signup')
		.set('Accept', 'application/json')
		.send({
			firstname: 'Bolutife',
			lastname: 'Mathias',
			email: 'behance@gmail.com',
			password: 'password'
		})
		.end((err, res) => {
			token = res.body.data;
			done();
		});
});

describe('Question Tests', () => {
	describe('User create question for a particular meetup tests', () => {
		it('should return error if user is not logged in', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/meetup/1')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Access denied. No token provided.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if no input is provided', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/meetup/2')
				.set('Accept', 'application/json')
				.set('authorization', userToken)
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if meetup for question posted does not exist', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/meetup/10')
				.set('Accept', 'application/json')
				.set('authorization', userToken)
				.send({
					title: 'Blackbody radiation',
					body: 'How does the science of blackbody radiation come about?'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Meetup you try to post a question to does not exist in database.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should successfully save question', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/meetup/2')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					title: 'Blackbody radiation',
					body: 'How does the science of blackbody radiation come about?'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Question saved successfully.');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});
});
