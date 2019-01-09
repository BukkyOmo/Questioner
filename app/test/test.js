import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('TEST FOR WILDCARD ENDPOINT TO CATCH GLOBAL ERRORS', () => {
	it('it should test for routes that are not specified', (done) => {
		chai.request(app)
			.get('/api/v1/blow')
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});
});

describe('TEST ALL MEETUP ENDPOINTS', () => {
	it('it should get a specific meetup', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/1')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should not get a specific meetup with invalid id', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/3')
			.end((err, res) => {
				expect(res.body.status).equal(404);
				done();
			});
	});

	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should create a meetup', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			location: 'Abuja',
			topic: 'why is it dark over there?',
			happeningOn: '15-02-2018',
			tags: ['flowers', 'love']
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when all required fields are not submitted', (done) => {
		const newMeetup = {
			createdOn: '3-12-2018',
			topic: 'why is it dark over there?'
		};
		chai.request(app)
			.post('/api/v1/meetups')
			.send(newMeetup)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				done();
			});
	});
});

describe('TEST ENDPOINT FOR RSVP', () => {
	it('it should create an rsvp for a meetup', (done) => {
		const rsvpMeetup = {
			id: 1,
			meetup: 1,
			user: 'odunayobukky@gmail.com',
			reply: 'yes'
		};
		chai.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.send(rsvpMeetup)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw error if reply is incorrect', (done) => {
		const rsvpMeetup = {
			id: 8,
			meetup: 'The experience 2019',
			user: 2,
			reply: 'gedifok'
		};
		chai.request(app)
			.post('/api/v1/meetups/9/rsvp')
			.send(rsvpMeetup)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});
});

describe('TEST ALL QUESTION ENDPOINTS', () => {
	it('it should create a question for a meetup', (done) => {
		const newQuestion = {
			id: 1,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate'
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when either title or content is not created', (done) => {
		const newQuestion = {
			id: 1,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			content: 'let us celebrate'
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should upvote a question', (done) => {
		const newQuestion = {
			id: 1,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate',
			votes: 5
		};
		chai.request(app)
			.patch('/api/v1/meetups/3/questions/1')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when question to be upvoted does not exist', (done) => {
		const newQuestion = {
			id: 9,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate',
			votes: 5
		};
		chai.request(app)
			.patch('/api/v1/meetups/6/questions/9')
			.send(newQuestion)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should downvote a question', (done) => {
		const myQuestion = {
			id: 2,
			createdOn: '2-3-2015',
			createdBy: 2,
			meetup: 4,
			title: 'i love code',
			content: 'let us celebrate',
			votes: 7
		};
		chai.request(app)
			.patch('/api/v1/meetups/4/questions/2')
			.send(myQuestion)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when question to be downvoted does not exist', (done) => {
		const downQuestion = {
			id: 10,
			createdOn: '2-3-2015',
			createdBy: 6,
			meetup: 9,
			title: 'i love code',
			content: 'let us celebrate',
			votes: 3
		};
		chai.request(app)
			.patch('/api/v1/meetups/19/questions/3')
			.send(downQuestion)
			.end((err, res) => {
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});
});
