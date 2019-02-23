import app from '../app';
import { UserTest, CommentTest } from './mocks';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const {
	CommentQuestionNotExist, CreateComment, CommentBodyEmpty, CommentBodyNotString
} = CommentTest;

const { SuperUserLogin } = UserTest;

let authTokenAdmin;

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
});

describe('TEST COMMENT ENDPOINTS', () => {
	it('it should not create a comment whose question does not exist', (done) => {
		chai.request(app)
			.post('/api/v1/comments')
			.set('token', authTokenAdmin)
			.send(CommentQuestionNotExist)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.error).to.be.equal('The question you tried to post a comment to cannot be found');
				done();
			});
	});

	it('it should not create a comment when the body is empty', (done) => {
		chai.request(app)
			.post('/api/v1/comments')
			.set('token', authTokenAdmin)
			.send(CommentBodyEmpty)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.errors[0]).to.be.equal('Comment body is required');
				done();
			});
	});

	it('it should not create a comment when the body is not a string', (done) => {
		chai
			.request(app)
			.post('/api/v1/comments')
			.set('token', authTokenAdmin)
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
