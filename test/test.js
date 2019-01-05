import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, should } = chai;

describe('Meetups', () => {
	it('it should get a specific meetup', (done) => {
		chai.request(app)
			.get('api/v1/meetups/:meetupId')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return expect(res.status).equal(200);
			});
		done();
	});
});
