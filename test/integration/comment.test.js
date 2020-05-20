import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let token = null;

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

describe('Comment Tests', () => {
	describe('User create a comment for a particular question tests', () => {
		it('should return error if user is not logged in', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/1/comment')
				.set('Accept', 'application/json')
				.send({
					comment: 'I have always wanted to ask this too'
				})
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
				.post('/api/v2/questions/1/comment')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if question is not in database', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/10/comment')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					comment: 'I have always wanted to ask this too'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'The question you try to post to does not exist in database.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should successfully save a comment', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/1/comment')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					comment: 'I have always wanted to ask this too'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Comment saved successfully.');
					assert.equal(res.body.statusCode, 201);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
		it('should return error if comment already exists in database', (done) => {
			chai
				.request(app)
				.post('/api/v2/questions/1/comment')
				.set('Accept', 'application/json')
				.set('authorization', token)
				.send({
					comment: 'I have always wanted to ask this too'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'This comment already exist in database.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
	});
});
