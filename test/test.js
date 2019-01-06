import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Get a meetup', () => {
	it('it should get a specific meetup', (done) => {
		chai.request(app)
			.get('api/v1/meetups/1')
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.message).to.equal(true);
			});
		done();
	});
});
