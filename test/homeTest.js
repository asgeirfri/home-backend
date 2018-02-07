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
};

var task1 = {
	title : 'Skúra gólf',
	due : 1,
	type : 'Weekly'
};

describe('HomeApi', function() {
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
			user1.id = data.user._id;
			user1.token = data.token;
			done();
		})
	});

	it('should create home', function(done) {
		user
		.post('/homes/create')
		.set('x-access-token', user1.token)
		.send({
			name: home1.name
		})
		.expect(201)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.home.name.should.be.eql(home1.name);
			home1.id = data.home._id;
			done();
		})
	});

	it('should create a task for the home', function(done) {
		user
		.post(`/homes/${home1.id}/tasks/create`)
		.set('x-access-token', user1.token)
		.send({
			title: task1.title,
			due: task1.due,
			type: task1.type,
			assignedTo: user1.id
		})
		.expect(201)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.home.name.should.be.eql(home1.name);
			home1.id = data.home._id;
			done();
		})
	});

	it('should get a home', function(done) {
		user
		.get(`/homes/${home1.id}`)
		.set('x-access-token', user1.token)
		.expect(200)
		.end((err, res) => {
			let data = JSON.parse(res.text);
			data.home.name.should.be.eql(home1.name);
			data.home.tasks.length.should.be.eql(1);
			data.home.tasks[0].title.should.be.eql(task1.title);
			done();
		})
	});
});