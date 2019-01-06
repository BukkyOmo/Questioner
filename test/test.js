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
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal(200);
				expect(res.body.message).to.be.equal(true);
				done();
			});
	});
});
