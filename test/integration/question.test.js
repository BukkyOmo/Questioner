import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import config from '../../config';

chai.use(chaiHttp);
const userToken = config.USER_TOKEN;
let token = null;

before((done) => {
	chai
		.request(app)
		.post('/api/v2/auth/signup')
		.set('Accept', 'application/json')
		.send({
			firstname: 'Bolutife',
			lastname: 'Martins',
			email: 'behancegirl@gmail.com',
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

	describe('User get all questions he/she has posted', () => {
		it('should return error if user is not logged in', (done) => {
			chai
				.request(app)
				.get('/api/v2/questions')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Access denied. No token provided.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should get all questions user has ever asked', (done) => {
			chai
				.request(app)
				.get('/api/v2/questions')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.end((err, res) => {
					assert.equal(res.body.message, 'User questions fetched successfully.');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});

	describe('User get one question', () => {
		it('should return error if user is not logged in', (done) => {
			chai
				.request(app)
				.get('/api/v2/questions/1')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Access denied. No token provided.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if question does not exist', (done) => {
			chai
				.request(app)
				.get('/api/v2/questions/10')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.end((err, res) => {
					assert.equal(res.body.message, 'Question you try to retrieve does not exist.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should successfully get a question', (done) => {
			chai
				.request(app)
				.get('/api/v2/questions/1')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.end((err, res) => {
					assert.equal(res.body.message, 'Question retrieved successfully.');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});

	describe('User edit a question', () => {
		it('should return error if user is not logged in', (done) => {
			chai
				.request(app)
				.patch('/api/v2/questions/1')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Access denied. No token provided.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if question does not exist', (done) => {
			chai
				.request(app)
				.patch('/api/v2/questions/10')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					title: 'Ask about time',
					body: 'Are we not supposed to get the time?'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'The question you tried to edit does not exist.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if question field is empty', (done) => {
			chai
				.request(app)
				.patch('/api/v2/questions/10')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({})
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should throw error if question does not belong to user', (done) => {
			chai
				.request(app)
				.patch('/api/v2/questions/1')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					title: 'Ask about time',
					body: 'Are we not supposed to get the time?'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'You cannot edit this question as it doesn\'t belong to you.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should successfully edit question', (done) => {
			chai
				.request(app)
				.patch('/api/v2/questions/2')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					title: 'Ask about time',
					body: 'Are we not supposed to get the time?'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Question edited successfully.');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});
});
