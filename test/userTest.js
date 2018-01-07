var app       = require('../app'),
	assert    = require('assert'),
	should    = require('should'),
	request   = require('supertest'),
	user      = request.agent(app);

describe('UserApi', function() {
	it('should create user', function(done) {
		user
		.post('/users/create')
		.send({
			username: 'AsgeirFri',
			password: 'password'
		})
		.expect(201)
		.end((err, res) => {
			console.log('We have an answer');
			done();
		})
	});
});