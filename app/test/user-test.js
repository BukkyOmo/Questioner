import app from '../app';
import { UserTest } from './mocks';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const {
	User1, SuperUserLogin, NoUniqueEmail, EmptyEmail,
	InvalidEmail, NotUniqueUsername, EmptyUsername, UsernameNotString,
	NotLogIncorrectEmail, NotLogIncorrectPassword, UserNotInDatabase
} = UserTest;

let authTokenAdmin;
let authTokenUser;

describe('TEST ALL USER ENDPOINTS', () => {
	it('it should login a user that is already in database', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'application/json')
			.send(SuperUserLogin)
			.end((err, res) => {
				const { body } = res;
				authTokenAdmin = body.data[0].token;
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should create a user', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(User1)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});

	it('it should sign in the user created', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'application/json')
			.send(User1)
			.end((err, res) => {
				const { body } = res;
				authTokenUser = body.data[0].token;
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});


	it('it should not create a user whose email is not unique', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(NoUniqueEmail)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.error).to.be.equal('user already exists');
				done();
			});
	});

	it('it should not create a user whose email is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.send(EmptyEmail)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				expect(res.body.errors[1]).to.eql('email is required');
				done();
			});
	});

	it('it should not create a user whose email is not valid', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(InvalidEmail)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				done();
			});
	});

	it('it should not create a user whose username is not unique', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(NotUniqueUsername)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.error).to.be.equal('user already exists');
				done();
			});
	});

	it('it should not create a user whose username is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(EmptyUsername)
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('username is required');
				done();
			});
	});

	it('it should not create a user whose username is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(UsernameNotString)
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('username must be a string');
				done();
			});
	});

	it('it should not create a user with empty fields', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send()
			.end((err, res) => {
				expect(res.body.errors[1]).to.be.equal('email is required');
				expect(res.body.errors[2]).to.be.equal('password is required');
				expect(res.body.errors[5]).to.be.equal('username is required');
				done();
			});
	});

	it('it should not log in a user who is not in database', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'application/json')
			.send(UserNotInDatabase)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				done();
			});
	});

	it('it should not log in a user whose email is incorrect', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'application/json')
			.send(NotLogIncorrectEmail)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				done();
			});
	});

	it('it should not log in a user whose password is incorrect', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'application/json')
			.send(NotLogIncorrectPassword)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				done();
			});
	});
});
