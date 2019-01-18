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
	it('it should create a meetup that is not already in database', (done) => {
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
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when the meetup already exists in database', (done) => {
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
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.equal(400);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

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
			.get('/api/v1/meetups/9')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).equal(404);
				expect(res.body.message).to.be.equal(false);
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

	it('it should delete a meetup', (done) => {
		chai.request(app)
			.delete('/api/v1/meetups/2')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw error if meetup to be deleted does not exist in database', (done) => {
		chai.request(app)
			.delete('/api/v1/meetups/9')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/upcoming')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
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
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw error if reply is neither yes, no or maybe', (done) => {
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
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.equal(400);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});
});

describe('TEST ALL QUESTION ENDPOINTS', () => {
	it('it should create a question for a meetup that is not already in database', (done) => {
		const newQuestion = {
			id: 1,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love ALCforLoop',
			content: 'let us celebrate',
			upvotes: 8,
			downvotes: 2
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when question is in database', (done) => {
		const newQuestion = {
			id: 2,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate',
			upvotes: 9,
			downvotes: 4
		};
		chai.request(app)
			.post('/api/v1/meetups/3/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.equal(400);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should get a question for a meetup', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/3/questions/1')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error if question cannot be found', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/1/questions/7')
			.end((err, res) => {
				expect(res).to.have.status(404);
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
			upvotes: 5,
			downvotes: 3
		};
		chai.request(app)
			.patch('/api/v1/meetups/3/questions/1/upvote')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
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
			upvotes: 5,
			downvotes: 8
		};
		chai.request(app)
			.patch('/api/v1/meetups/6/questions/5/upvote')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should downvote a question', (done) => {
		const newQuestion = {
			id: 1,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate',
			upvotes: 5,
			downvotes: 2
		};
		chai.request(app)
			.patch('/api/v1/meetups/3/questions/1/downvote')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});

	it('it should throw an error when question to be downvoted does not exist', (done) => {
		const newQuestion = {
			id: 9,
			createdOn: '2-3-2015',
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: 'let us celebrate',
			upvotes: 5,
			downvotes: 1
		};
		chai.request(app)
			.patch('/api/v1/meetups/6/questions/5/downvote')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});

	it('it should throw an error when the content of the question is empty', (done) => {
		const newQuestion = {
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: '',
			upvotes: 9,
			downvotes: 4
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors).to.eql(['Content is required']);
				done();
			});
	});

	it('it should throw an error when the content of the question is not a string', (done) => {
		const newQuestion = {
			createdBy: 1,
			meetup: 3,
			title: 'i love code',
			content: [23456],
			upvotes: 9,
			downvotes: 4
		};
		chai.request(app)
			.post('/api/v1/meetups/3/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors).to.eql(['Content must be a string']);
				done();
			});
	});

	it('it should throw an error when the title of the question is empty', (done) => {
		const newQuestion = {
			createdBy: 1,
			meetup: 3,
			title: '',
			content: 'Bingo',
			upvotes: 9,
			downvotes: 4
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors).to.eql(['Title is required']);
				done();
			});
	});

	it('it should throw an error when the title of the question is not a string', (done) => {
		const newQuestion = {
			createdBy: 1,
			meetup: 3,
			title: 12089,
			content: 'Bingo',
			upvotes: 9,
			downvotes: 4
		};
		chai.request(app)
			.post('/api/v1/meetups/1/questions')
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(true);
				expect(res.body.errors).to.eql(['Title must be a string']);
				done();
			});
	});
});
