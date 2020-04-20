import app from '../../index.js';
import assert from 'assert';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Authentication Tests', () => {
    describe('User Signup tests', () => {
        it('should return error if firstname is not supplied', (done) => {
            console.log('got here')
            chai
                .request(app)
                .post('/api/v2/auth/signup')
                .set('Accept', 'application/json')
                .send({
                    lastname: "Matt",
                    phone: "09039180031",
                    address: "Plot 1, Gaven street, Ontario, Canada"
                })
                .end((err, res) => {
                    console.log('got here')
                    console.log(res.body)
                    console.log(err)
                    assert.equal(res.body.message, 'firstname is required')
                    done()
            })
        })
    })
})