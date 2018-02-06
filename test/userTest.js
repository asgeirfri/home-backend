var app       = require('../app'),
	assert    = require('assert'),
	should    = require('should'),
	request   = require('supertest'),
	user      = request.agent(app),
	mongoose = require('mongoose');

var user1 = {
	username: 'AsgeirFri',
	password: 'password'
};

describe('UserApi', function() {
	after((done) => {
		console.log('Deleting test database');
		mongoose.connection.db.dropDatabase(done);
	});

	it('should create user', function(done) {
		user
		.post('/users/create')
		.send({
			username: user1.username,
			password: user1.password
		})
		.expect(201)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.user.username.should.be.eql(user1.username);
			should(data.user.password).not.be.ok();
			should.exist(data.token);
			done();
		})
	});

	it('should log in', function(done) {
		user
		.post('/login')
		.send({
			username: user1.username,
			password: user1.password
		})
		.expect(302)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.user.username.should.be.eql(user1.username);
			should(data.user.password).not.be.ok();
			should.exist(data.token);
			user1.token = data.token;
			done();
		})
	});

	it('should get me', function(done) {
		user
		.get('/me')
		.set('x-access-token', user1.token)
		.expect(200)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			should.exist(data.id);
			done();
		})
	});

	it('should not get me', function(done) {
		user
		.get('/me')
		.expect(401)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.auth.should.be.false();
			done();
		})
	});

	it('should not get me', function(done) {
		user
		.get('/me')
		.set('x-access-token', 'SKRRRRRA')
		.expect(500)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.auth.should.be.false();
			done();
		})
	});
});