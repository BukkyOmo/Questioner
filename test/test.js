import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, should } = chai;

describe('Meetups', () => {
	it('it should get a specific meetup', (done) => {
		chai.request(app)
			.get('api/v1/meetups/1')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return expect(res.status).equal(200);
			})
		done();
	});

	it('it should return status code 404', (done) => {
		chai.request(app)
			.get('api/v1/meetups/10')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return expect(res.status).equal(404);
			});
		done();
	});
});
