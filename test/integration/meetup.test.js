import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import config from '../../config';

chai.use(chaiHttp);
const userToken = config.USER_TOKEN;
const adminToken = config.ADMIN_TOKEN;

describe('Meetup Tests', () => {
	describe('Admin create meetup tests', () => {
		it('should return error if no input is entered', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.end((err, res) => {
					assert.equal(res.body.message, 'Please fill all fields');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if topic is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'topic is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if description is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'description is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if location is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'location is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if date is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'date is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if time is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'time is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if image is not supplied', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'image_url is required');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if user creating meetup is not logged in', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Access denied. No token provided.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should return error if user creating meetup is not an admin', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', userToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Permission denied, You do not have authorized access.');
					assert.equal(res.body.statusCode, 401);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should throw error if meetup date is in the past', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-04-01',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Meetup date cannot be in the past.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
		it('should create a meetup successfully', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Meetup created successfully.');
					assert.equal(res.body.statusCode, 200);
					assert.equal(res.body.status, 'Success');
					done();
				});
		});
		it('should throw error if meetup already exists in database', (done) => {
			chai
				.request(app)
				.post('/api/v2/meetups')
				.set('Accept', 'application/json')
				.set('authorization', adminToken)
				.send({
					topic: 'Women in tech meetup',
					description: 'A gathering of female techies',
					location: 'Arcade events center',
					date: '2020-06-22',
					time: '15:00:00',
					image_url: 'blackboy.hjkjdgcvdjgdhcgdd.png'
				})
				.end((err, res) => {
					assert.equal(res.body.message, 'Meetup already exist in database.');
					assert.equal(res.body.statusCode, 400);
					assert.equal(res.body.status, 'Failure');
					done();
				});
		});
	});
});
