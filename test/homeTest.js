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

var home1 = {
	name : 'Háaleitisbraut 24',
}

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
			user1.token = data.token;
			done();
		})
	});

	it('should create user', function(done) {
		user
		.post('/home/create')
		.set('x-access-token', user1.token)
		.send({
			name: home1.name
		})
		.expect(201)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.home.name.should.be.eql(home1.name);
			done();
		})
	});
});