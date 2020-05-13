import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import config from '../../config';

chai.use(chaiHttp);
const userToken = config.USER_TOKEN;
const expiredToken = config.EXPIRED_TOKEN;
const invalidToken = config.INVALID_TOKEN;

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

	describe('User Signup tests', () => {
		it('should return error if no input is provided', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if email is not provided', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.send({
					password: 'Kingdomhall'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'email is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if password is not provided', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.send({
					email: 'Kingjnr@gmail.com',
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'password is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if password is incorrect', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.send({
					email: 'matty@gmail.com',
					password: 'passwordcoder'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Invalid email or password');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if user does not exist in database', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.send({
					email: 'Kingjnr@gmail.com',
					password: 'Kingdomhall'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'User does not exist in database');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should successfully sign in a user with valid details', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/signin')
				.set('Accept', 'application/json')
				.send({
					email: 'matty@gmail.com',
					password: 'password'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'User signed in successfully');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});

	describe('Forgot password tests', () => {
		it('should return error if email input is empty', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/forgotpassword')
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if email is not valid', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/forgotpassword')
				.set('Accept', 'application/json')
				.send({
					email: 'matty'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'email must be a valid email');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should return error if email does not exist in database', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/forgotpassword')
				.set('Accept', 'application/json')
				.send({
					email: 'mathewlex@gmail.com'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'User does not exist in database');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});

		it('should successfully send save reset password token in database and send a token reset email', (done) => {
			chai
				.request(app)
				.post('/api/v2/auth/forgotpassword')
				.set('Accept', 'application/json')
				.send({
					email: 'matty@gmail.com'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Reset password mail sent successfully');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
	});

	describe('Reset password tests', () => {
		it('should return error if password is not provided', (done) => {
			chai
				.request(app)
				.post(`/api/v2/auth/resetpassword/${userToken}`)
				.set('Accept', 'application/json')
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if reset token sent is invalid', (done) => {
			chai
				.request(app)
				.post(`/api/v2/auth/resetpassword/${invalidToken}`)
				.set('Accept', 'application/json')
				.send({
					password: 'newpassword'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Token invalid');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if token is expired', (done) => {
			chai
				.request(app)
				.post(`/api/v2/auth/resetpassword/${expiredToken}`)
				.set('Accept', 'application/json')
				.send({
					password: 'newpassword'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Token expired');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		// it('should successfully save new password', (done) => {
		// 	chai
		// 		.request(app)
		// 		.post(`/api/v2/auth/resetpassword/${userToken}`)
		// 		.set('Accept', 'application/json')
		// 		.send({
		// 			password: 'newpassword'
		// 		})
		// 		.end((err, res) => {
		// 			assert.equal(res.body.message, 'Password reset successful');
		// 			assert.equal(res.body.statusCode, 200);
		// 			assert.equal(res.body.status, 'Success');
		// 			done();
		// 		});
		// });
	});
});
