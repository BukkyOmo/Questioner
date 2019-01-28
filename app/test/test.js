import app from '../app';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('TEST FOR WILDCARD ENDPOINT TO CATCH GLOBAL ERRORS', () => {
	it('it should test for routes that are not specified', (done) => {
		chai.request(app)
			.get('/api/v1/blow')
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				expect(res.body.error).to.be.equal('The route you are trying to access does not exist');
				done();
			});
	});
});

describe('TEST ALL USER ENDPOINTS', () => {
	it('it should create a user that is not already in database', (done) => {
		const newUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Buksy',
			email: 'odunbukola1@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade123'
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

	it('it should not create a user whose email is not unique', (done) => {
		const myUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'BukkyO',
			email: 'odunbukola1@gmail.com',
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

	it('it should not create a user whose email is empty', (done) => {
		const myUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Bukola',
			email: '',
			phoneNumber: '09039136484',
			username: 'bukkadeye'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(myUser)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				expect(res.body.errors[1]).to.eql('email is required');
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it('it should not create a user whose email is not valid', (done) => {
		const myUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'Bukola',
			email: 'bukola',
			phoneNumber: '09039136484',
			username: 'bukkadeye'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(myUser)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it('it should not create a user whose username is not unique', (done) => {
		const newUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'BuksYTT',
			email: 'odunbukola1@gmail.com',
			phoneNumber: '09039136484',
			username: 'bukkade123'
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

	it('it should not create a user whose username is empty', (done) => {
		const newUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'BuksYTT',
			email: 'odunbukola1@gmail.com',
			phoneNumber: '09039136484',
			username: ''
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(newUser)
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('username is required');
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it('it should not create a user whose username is not a string', (done) => {
		const newUser = {
			firstname: 'bukola',
			lastname: 'Odunayo',
			password: 'BuksYTT',
			email: 'odunbukola1@gmail.com',
			phoneNumber: '09039136484',
			username: []
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(newUser)
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('username must be a string');
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it('it should not create a user with empty fields', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send()
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('firstname is required');
				expect(res.body.errors[2]).to.be.equal('lastname is required');
				expect(res.body.errors[5]).to.be.equal('email is required');
				expect(res.body.errors[8]).to.be.equal('password is required');
				expect(res.body.errors[11]).to.be.equal('username is required');
				expect(res.body.error).to.be.equal(true);
				done();
			});
	});

	it('it should log in a user who is in database', (done) => {
		const newUser = {
			email: 'odunbukola1@gmail.com',
			password: 'Buksy'
		};
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal('Login was successful');
				done();
			});
	});

	it('it should not log in a user who is not in database', (done) => {
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

	it('it should not log in a user whose email is incorrect', (done) => {
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

	it('it should not log in a user whose password is incorrect', (done) => {
		const newUser = {
			email: 'odunbukola1@gmail.com',
			password: 'bukks'
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
	it('it should get all meetups when there is no meetup in database', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.success).to.be.equal(false);
				expect(res.body.message).to.be.equal('No meetup was found in the database');
				done();
			});
	});

	it('it should create a meetup that is not already in database', (done) => {
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

	it('it should throw an error if meetup is already in database', (done) => {
		const newMeetup = {
			topic: 'God saves',
			location: 'Niger',
			happeningOn: '2019-04-02',
			tags: 'event-center'
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.message).to.be.equal('Meetup already exists');
				done();
			});
	});

	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.message).to.be.equal('Successfully Retrieved all meetups');
				done();
			});
	});

	it('it should get a meetup that is in the database', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/1')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.message).to.be.equal('Meetup successfully retrieved');
				done();
			});
	});

	it('it should not get a meetup that is not in the database', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/36')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.success).to.be.equal(false);
				expect(res.body.error).to.be.equal('Meetup cannot be found');
				done();
			});
	});

	it('it should throw an error when the wrong params is passed', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/b:')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.success).to.be.equal(false);
				expect(res.body.error).to.be.equal('Id must be a number');
				done();
			});
	});

	it('it should throw an error when the topic is not a string', (done) => {
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

	it('it should throw an error when the topic is empty', (done) => {
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

	it('it should throw an error when the topic is not a string', (done) => {
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

	it('it should throw an error when the location is empty', (done) => {
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

	it('it should throw an error when the location is not a string', (done) => {
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

	it('it should throw an error when the happening date is empty', (done) => {
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

describe('TEST ALL QUESTION ENDPOINTS', () => {
	it('it should create a question that is not already in database', (done) => {
		const newQuestion = {
			title: 'God saves',
			content: 'Niger is part of the present',
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal('Question was successfully posted');
				done();
			});
	});

	it('it should not create a question that is already in database', (done) => {
		const newQuestion = {
			title: 'God saves all',
			content: 'Niger is part of the present',
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.message).to.be.equal('Question already exists');
				done();
			});
	});

	it('it should not create a question when the title is not a string', (done) => {
		const newQuestion = {
			title: 12345,
			content: 'Niger is part of the present',
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors[0]).to.be.equal('Title must be a string');
				done();
			});
	});

	it('it should not create a question when the title is empty', (done) => {
		const newQuestion = {
			content: 'Niger is part of the present',
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors[0]).to.be.equal('Title is required');
				done();
			});
	});

	it('it should not create a question when the content is not a string', (done) => {
		const newQuestion = {
			title: 'The reward of labour',
			content: {},
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors[0]).to.be.equal('Content must be a string');
				done();
			});
	});

	it('it should not create a question when the content is empty', (done) => {
		const newQuestion = {
			title: 'The reward of labour',
			content: '',
		};
		chai.request(app)
			.post('/api/v1/questions')
			.send(newQuestion)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors[0]).to.be.equal('Content is required');
				done();
			});
	});
});
