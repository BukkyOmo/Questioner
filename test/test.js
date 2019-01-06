import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Get a meetup', () => {
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
});
