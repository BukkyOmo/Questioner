import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


const { expect } = chai;

describe('TEST ALL USER ENDPOINTS', () => {
	it.only('it should create a user that is not already in database', (done) => {
		const newUser = {
			firstname: 'bukky',
			lastname: 'Odunayo',
			password: 'flexy',
			email: 'odunbabey@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal('Your registration was successful');
				done();
			});
	});

	it.only('it should not create a user whose email is not unique', (done) => {
		const myUser = {
			firstname: 'bukky',
			lastname: 'Odunayo',
			password: 'flexy',
			email: 'odunbabey@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkadeye'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(myUser)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.message).to.be.equal('User already exists');
				done();
			});
	});

	it.only('it should not create a user whose username is not unique', (done) => {
		const newUser = {
			firstname: 'bukky',
			lastname: 'Odunayo',
			password: 'flexy',
			email: 'odunbabey12@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.message).to.be.equal('User already exists');
				done();
			});
	});

	it.only('it should not log in a user who is not in database', (done) => {
		const newUser = {
			email: 'odmreferral@gmail.com',
			password: '34567'
		};
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it.only('it should not log in a user whose email is incorrect', (done) => {
		const newUser = {
			email: 'odunbabey11@gmail.com',
			password: 'flexy'
		};
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it.only('it should not log in a user whose password is incorrect', (done) => {
		const newUser = {
			email: 'odunbabey@gmail.com',
			password: 'bukkadeerty'
		};
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});
});
