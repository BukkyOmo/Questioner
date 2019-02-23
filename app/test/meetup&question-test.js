import app from '../app';
import {
	UserTest,
	MeetupTest,
	QuestionTest,
	RSVPTest,
	CommentTest
} from './mocks';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const {
	AdminCreateMeetup, MeetupTopicNotString, MeetupTopicEmpty,
	MeetupLocationEmpty, MeetupLocationNotString, MeetuphappeningDateEmpty
} = MeetupTest;


const {
	newQuestion, newQuestion2, QuestionTitleNotString, QuestionTitleEmpty,
	QuestionBodyNotString, QuestionBodyEmpty
} = QuestionTest;

const { User2, SuperUserLogin } = UserTest;


const { CreateComment } = CommentTest;


const { validRsvp, invalidRsvp } = RSVPTest;

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
			.send(User2)
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
			.send(User2)
			.end((err, res) => {
				const { body } = res;
				authTokenUser = body.data[0].token;
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});
});


describe('TEST ALL MEETUP ENDPOINTS', () => {
	it('it should get all meetups when there is no meetup in database', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups')
			.set('Accept', 'application/json')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'No meetup was found in the database'
				);
				done();
			});
	});

	it('it should create a meetup only if user is an admin', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('Accept', 'application/json')
			.set('token', authTokenAdmin)
			.send(AdminCreateMeetup)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				expect(res.body.message).to.be.equal('Your registration was successful');
				expect(res.body.data[0]).to.eql(
					{
							"location": "Uyo,AkwaIbomState",
							"topic": "Web Accessibility",
							"happeningon": "2019-12-04T23:00:00.000Z",
							"images": "https://res.cloudinary.com/dtzflgnar/image/upload/v1549098474/event4.jpg",
							"tags": null
					}
				);
				done();
			});
	});

	it('it should create a meetup only if user is not an admin but has a token', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('Accept', 'application/json')
			.set('token', authTokenUser)
			.send(AdminCreateMeetup)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				done();
			});
	});

	it('it should throw unauthorized user if user trying to create a meetup only if token is not provided', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('Accept', 'application/json')
			.send(AdminCreateMeetup)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.body.error).to.be.equal('Unauthorized User');
				done();
			});
	});

	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('it should get a meetup that is in the database', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/1')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('it should not get a meetup that is not in the database', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/36')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('Meetup cannot be found');
				done();
			});
	});

	it('it should throw an error when the wrong params is passed', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/b:')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});

	it('it should throw an error when the topic is not a string', (done) => {
		chai.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(MeetupTopicNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should throw an error when the topic is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(MeetupTopicEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should throw an error when the location is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(MeetupLocationEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should throw an error when the location is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(MeetupLocationNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should throw an error when the happening date is empty', (done) => {
		chai.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(MeetuphappeningDateEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should get all upcoming meetups', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/upcoming')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});
});


describe('TEST ALL QUESTION ENDPOINTS', () => {
	it('it should not create a question if meetup is in database', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});

	it('it should not create a question if meetup is not in database', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(newQuestion2)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.error).to.be.equal('The meetup you tried to post a question to cannot be found');
				done();
			});
	});

	it('it should not create a question when the title is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(QuestionTitleNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Title must be a string');
				done();
			});
	});

	it('it should not create a question when the title is empty', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(QuestionTitleEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Title is required');
				done();
			});
	});

	it('it should not create a question when the body is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(QuestionBodyNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Body must be a string');
				done();
			});
	});

	it('it should not create a question when the body is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('token', authTokenAdmin)
			.send(QuestionBodyEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Body is required');
				done();
			});
	});

	it('it should get a question that is in the database', (done) => {
		chai.request(app)
			.get('/api/v1/questions/1')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not get a question that is not in the database', (done) => {
		chai.request(app)
			.get('/api/v1/questions/99')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('Question cannot be found');
				done();
			});
	});

	it('it should throw an error when the wrong params is passed', (done) => {
		chai.request(app)
			.get('/api/v1/questions/{}')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});

	it('it should upvote a question that is in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/upvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});


	it('it should downvote a question that is in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/downvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not upvote a question that is not in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/99/upvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'Question you wish to upvote does not exist'
				);
				done();
			});
	});

	it('it should not downvote a question that is not in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/99/downvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'The question you wish to downvote does not exist'
				);
				done();
			});
	});

	it('it should throw an error when the wrong params is passed to be downvoted', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/{}/downvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal(
					'Invalid ID. ID must be a number'
				);
				done();
			});
	});

	it('it should throw an error when the wrong param is passed to be upvoted', (done) => {
		chai.request(app)
			.patch('/api/v1/questions/u/upvote')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});

	it('it should create a comment', (done) => {
		chai.request(app)
			.post('/api/v1/comments')
			.set('token', authTokenAdmin)
			.send(CreateComment)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});
});

describe('TEST ALL RSVP ENDPOINTS', () => {
	it('it should not rsvp a meetup that is not in database', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/7/rsvps')
			.set('token', authTokenAdmin)
			.send(validRsvp)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('The meetup you try to rsvp does not exist');
				done();
			});
	});

	it('it should rsvp a meetup when the right response is passed', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvps')
			.set('Accept', 'application/json')
			.set('token', authTokenUser)
			.send(validRsvp)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not rsvp a meetup when the wrong response is passed', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvps')
			.set('Accept', 'application/json')
			.set('token', authTokenAdmin)
			.send(invalidRsvp)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.equal(400);
				expect(res.body.error).to.be.equal('Rsvp status should be yes, no or maybe');
				done();
			});
	});


	it('it should not rsvp a meetup if user has responded once', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvps')
			.set('Accept', 'application/json')
			.set('token', authTokenUser)
			.send(validRsvp)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				expect(res.body.error).to.be.equal('You have already given a response once');
				done();
			});
	});
});

describe('DELETE MEETUP ENDPOINTS', () => {
	it('it should delete a meetup when it is an admin', (done) => {
		chai.request(app)
			.delete('/api/v1/meetups/1')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.message).to.be.equal('Your have successfully deleted a meetup');
				done();
			});
	});

	it('it should not delete a meetup when meetup is not in database', (done) => {
		chai.request(app)
			.delete('/api/v1/meetups/20')
			.set('token', authTokenAdmin)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.error).to.be.equal('Meetup you are trying to delete does not exist');
				done();
			});
	});
});

describe('TEST ALL BAD ROUTES', () => {
	it('it should not throw an error when a bad route is accessed', (done) => {
		chai
			.request(app)
			.get('/api/v1/belch')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.equal(404);
				expect(res.body.error).to.be.equal(
					'The route you are trying to access does not exist'
				);
				done();
			});
	});
});
