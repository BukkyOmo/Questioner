import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('Authentication Tests', () => {
	describe('User Signup tests', () => {
		it('should return error if firstname is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					lastname: 'Matt',
					email: 'matty@gmail.com',
					password: 'password'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'firstname is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if firstname supplied by the user is invalid', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Ri',
					lastname: 'Matt',
					email: 'rihana@gmail.com',
					password: 'password',
					phone: '09039180031'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'firstname length must be at least 3 characters long');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if lastname is not supplied by the user', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					phone: '09039180031',
					email: 'mattyRihana@gmail.com',
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'lastname is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if firstname supplied by the user is invalid', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihanna',
					lastname: 'Ma',
					email: 'rihana@gmail.com',
					password: 'password',
					phone: '09039180031'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'lastname length must be at least 3 characters long');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if email is not supplied by the user', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					lastname: 'Matt',
					phone: '09039180031'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'email is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if email supplied by the user is invalid', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					lastname: 'Matt',
					email: 'rihana',
					password: 'password',
					phone: '09039180031'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'email must be a valid email');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if password is not supplied by the user', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					lastname: 'Matt',
					email: 'mattyrihana@gmail.com',
					phone: '09039180031',
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'password is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if no input is supplied by the user', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should successfully save user in the database', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					lastname: 'Matt',
					email: 'matty@gmail.com',
					password: 'password'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'User successfully saved to database');
					assert.equal(res.body.statusCode, 201);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});

		it('should return error if user is already saved in the database', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signup')
				.set('Accept', 'application/json')
				.send({
					firstname: 'Rihana',
					lastname: 'Matt',
					email: 'matty@gmail.com',
					password: 'password'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'User already exists in database');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
	});
});
