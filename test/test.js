import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, should } = chai;

describe('Meetups', () => {
	it('it should get all meetups', (done) => {
		chai.request(app)
			.get('api/v1/meetups')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return expect(res.status).equal(200);
			});
		done();
	});
});
