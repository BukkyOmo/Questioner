import assert from 'assert';
import request from 'supertest';

import app from '../../index';

describe('Integration test', () => {
	it('/api/v1', (done) => {
		request(app)
			.get('/api/v2')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				assert.equal(res.body.message, 'Welcome to Questioner');
				done();
			});
	});
});
