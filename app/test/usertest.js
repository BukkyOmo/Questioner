import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


const { expect } = chai;

describe('TEST ALL USER ENDPOINTS', () => {
	const newUser = {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'flexy',
		email: 'odunbabe@gmail.com',
		phoneNumber: '09039136484',
		username: 'bukkie'
	};
	it.only('it should create a user that is not already in database', (done) => {
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

	it.only('it should not create a user whose email is not unique', (done) => {
		newUser.email = 'rubbishemail@gmail.com';
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
});
