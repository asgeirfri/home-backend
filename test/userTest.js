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
			res.text.should.be.eql('User created');
			done();
		})
	});

	it('should log in', function(done) {
		user
		.post('/login')
		.send({
			username: 'AsgeirFri',
			password: 'password'
		})
		.expect(302)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.user.username.should.be.eql('AsgeirFri');
			should.not.exist(data.user.password);
			done();
		})
	});
});