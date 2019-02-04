import app from '../app';
import {
	UserTest, MeetupTest, QuestionTest, CommentTest, RSVPTest
} from './mocks';

const {
	User, SuperUser, NoUniqueEmail, EmptyEmail, InvalidEmail,
	NotUniqueUsername, EmptyUsername, UsernameNotString,
	RegisteredUser, NotLogIncorrectEmail, NotLogIncorrectUsername,
	UserNotInDatabase
} = UserTest;

const {
	AdminCreateMeetup, MeetupTopicNotString, MeetupTopicEmpty,
	MeetupLocationEmpty, MeetupLocationNotString, MeetuphappeningDateEmpty
} = MeetupTest;

const {
	newQuestion, QuestionTitleNotString, QuestionTitleEmpty,
	QuestionBodyNotString, QuestionBodyEmpty
} = QuestionTest;

const {
	CommentQuestionNotExist, CreateComment, CommentBodyEmpty, CommentBodyNotString
} = CommentTest;

const {
	validRsvp, invalidRsvp
} = RSVPTest;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const { expect } = chai;

let authToken;
let authTokenAdmin;

describe('Questioner Server', () => {
	it('it should test for signin routes for user', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(User)
			.set('Accept', 'application/json')
			.end((err, res) => {
				const { body } = res;
				console.log(body.data[0].token);
				authToken = body.data[0].token;
			});
	});

	it('it should test for signin routes for admin', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.send(SuperUser)
			.set('Accept', 'application/json')
			.end((err, res) => {
				const { body } = res;
        		console.log(body.data[0].token);
				done();
			});
	});
});

describe('TEST FOR WILDCARD ENDPOINT TO CATCH GLOBAL ERRORS', () => {
	it('it should test for routes that are not specified', (done) => {
		chai
			.request(app)
			.set('Accept', 'application/json')
			.get('/api/v1/blow')
			.end((err, res) => {
				expect(res.body.status).to.be.equal(404);
				expect(res.body.error).to.be.equal(
					'The route you are trying to access does not exist'
				);
				done();
			});
	});
});

describe('TEST ALL USER ENDPOINTS', () => {
	it('it should create a user that is not already in database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});

	it('it should not create a user whose email is not unique', (done) => {
		chai.request(app)
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
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(EmptyEmail)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				expect(res.body.errors[1]).to.eql('email is required');
				done();
			});
	});

	it('it should not create a user whose email is not valid', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'application/json')
			.send(InvalidEmail)
			.end((err, res) => {
				expect(res.body.errors[0]).to.eql('email must be a valid email');
				done();
			});
	});

	it('it should not create a user whose username is not unique', (done) => {
		chai.request(app)
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
			.set('token', authTokenAdmin)
			.send(UsernameNotString)
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('username must be a string');
				done();
			});
	});

	it('it should not create a user with empty fields', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.set('token', authTokenAdmin)
			.send()
			.end((err, res) => {
				expect(res.body.errors[0]).to.be.equal('firstname is required');
				expect(res.body.errors[2]).to.be.equal('lastname is required');
				expect(res.body.errors[5]).to.be.equal('email is required');
				expect(res.body.errors[8]).to.be.equal('password is required');
				expect(res.body.errors[11]).to.be.equal('username is required');
				done();
			});
	});

	it('it should log in a user who is in database', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('token', authTokenAdmin)
			.send(RegisteredUser)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not log in a user who is not in database', (done) => {
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.set('token', authTokenAdmin)
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
			.set('token', authTokenAdmin)
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
			.set('token', authTokenAdmin)
			.send(NotLogIncorrectUsername)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.equal(409);
				done();
			});
	});
});

describe('TEST ALL MEETUP ENDPOINTS', () => {
	it('it should get all meetups when there is no meetup in database', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send({})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'No meetup was found in the database'
				);
				done();
			});
	});

	it('it should create a meetup only if user is an admin', (done) => {
		chai.request(app)
			.post('/api/v1/meetups')
			.set('token', authTokenAdmin)
			.send(AdminCreateMeetup)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
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
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('Meetup cannot be found');
				done();
			});
	});

	it('it should throw an error when the wrong params is passed', (done) => {
		chai.request(app)
			.get('/api/v1/meetups/b:')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});

	it('it should throw an error when the topic is not a string', (done) => {
		chai.request(app)
			.post('/api/v1/meetups')
			.set('token', authToken)
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
			.set('token', authToken)
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
			.set('token', authToken)
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
			.set('token', authToken)
			.send(MeetupLocationNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should throw an error when the happening date is empty', (done) => {
		chai.request(app)
			.post('/api/v1/meetups')
			.set('token', authToken)
			.send(MeetuphappeningDateEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});

describe('TEST ALL QUESTION ENDPOINTS', () => {
	it('it should create a question that is not already in database', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.set('token', authToken)
			.send(newQuestion)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});

	it('it should not create a question when the title is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('token', authToken)
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
			.set('token', authToken)
			.send(QuestionTitleEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Title is required');
				done();
			});
	});

	it('it should not create a question when the body is not a string', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.send(QuestionBodyNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Body must be a string');
				done();
			});
	});

	it('it should not create a question when the body is empty', (done) => {
		chai.request(app)
			.post('/api/v1/questions')
			.send(QuestionBodyEmpty)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Body is required');
				done();
			});
	});

	it('it should get a question that is in the database', (done) => {
		chai.request(app)
			.get('/api/v1/questions/1')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not get a question that is not in the database', (done) => {
		chai.request(app)
			.get('/api/v1/questions/99')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('Question cannot be found');
				done();
			});
	});

	it('it should throw an error when the wrong params is passed', (done) => {
		chai.request(app)
			.get('/api/v1/questions/{}')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});

	it('it should downvote a question that is in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/downvote')
			.set('token', authToken)
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
			.set('token', authToken)
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
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'The question you wish to downvote does not exist'
				);
				done();
			});
	});

	it('it should upvote a question that is in the database', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/upvote')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should throw an error when the wrong params is passed to be downvoted', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/{}/downvote')
			.set('token', authToken)
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
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.be.equal('Invalid ID. ID must be a number');
				done();
			});
	});
});

describe('TEST COMMENT ENDPOINTS', () => {
	it('it should not create a comment whose question does not exist', (done) => {
		chai.request(app)
			.post('/api/v1/questions/99/comments')
			.set('token', authToken)
			.send(CommentQuestionNotExist)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal(
					'Question you wish to comment on does not exist'
				);
				done();
			});
	});

	it('it should create a comment', (done) => {
		chai.request(app)
			.post('/api/v1/questions/1/comments')
			.set('token', authToken)
			.send(CreateComment)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.equal(201);
				done();
			});
	});

	it('it should not create a comment when the body is empty', (done) => {
		chai.request(app)
			.post('/api/v1/questions/1/comments')
			.set('token', authToken)
			.send(CommentBodyEmpty)
			.end((err, res) => {
				console.log(err);
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Comment body is required');
				done();
			});
	});

	it('it should not create a comment when the body is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions/1/comments')
			.set('token', authToken)
			.send(CommentBodyNotString)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal(
					'Comment body should be a string'
				);
				done();
			});
	});
});

describe('TEST ALL RSVP ENDPOINTS', () => {
	it('it should not rsvp a meetup that is not in database', (done) => {
		chai.request(app)
			.patch('/api/v1//meetups/99/rsvp')
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.error).to.be.equal(
					'The meetup you try to rsvp does not exist'
				);
				done();
			});
	});

	it('it should not rsvp a meetup when the right response is passed', (done) => {
		chai.request(app)
			.patch('/api/v1//meetups/1/rsvp')
			.set('token', authToken)
			.send(validRsvp)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});

	it('it should not rsvp a meetup when the wrong response is passed', (done) => {
		chai.request(app)
			.patch('/api/v1//meetups/1/rsvp')
			.send(invalidRsvp)
			.set('token', authToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				done();
			});
	});
});
