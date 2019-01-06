import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('TEST ALL MEETUP ENDPOINTS', () => {
	it('it should get a specific meetup', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/1')
			.end((err, res) => {
				if (err) {
					done(err);
				}
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
				if (err) {
					done(err);
				}
				expect(res.body.status).equal(404);
				done();
			});
	});

	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.end((err, res) => {
				if (err) {
					done(err);
				}
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
				if (err) {
					done(err);
				}
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
				if (err) {
					done(err);
				}
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
				if (err) {
					done(err);
				}
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
				if (err) {
					done(err);
				}
				expect(res.body.status).to.be.equal(404);
				expect(res.body.message).to.be.equal(false);
				done();
			});
	});
});
