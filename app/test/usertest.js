import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


const { expect } = chai;

describe('TEST ALL USER ENDPOINTS', () => {
	it.only('it should create a user that is not already in database', (done) => {
		const newUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Buks',
			email: 'odunbukola@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade12'
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
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Buks',
			email: 'odunbukola@gmail.com',
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
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Buks',
			email: 'odunbukola12@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade12'
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
			email: 'odunbukola@gmail.com',
			password: 'bukkade12'
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

describe('TEST ALL MEETUP ENDPOINTS', () => {
	it.only('it should create a meetup that is not already in database', (done) => {
		const newMeetup = {
			topic: 'God saves',
			location: 'Anambra',
			happeningOn: '2019-04-02',
			tags: 'event'
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal('Your registration was successful');
				done();
			});
	});

	it.only('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.message).to.be.equal('Successfully Retrived all meetups');
				done();
			});
	});
});


describe('TEST ALL MIDDLEWARES', () => {
	it.only('it should throw an error when the topic is not a string', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			location: 'Abuja',
			topic: 12345,
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it.only('it should throw an error when the topic is empty', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			location: 'Abuja',
			topic: '',
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it.only('it should throw an error when the topic is not a string', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			location: 'Abuja',
			topic: 125678,
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it.only('it should throw an error when the location is empty', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			topic: 'The influx of gayism in Nigeria',
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it.only('it should throw an error when the location is not a string', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			topic: 'The influx of gayism in Nigeria',
			location: 56879,
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it.only('it should throw an error when the happening date is empty', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			topic: 'The influx of gayism in Nigeria',
			location: 'Lokoja',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});
});
