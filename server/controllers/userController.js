'use strict';

var UserModule = require('../modules/userModule');

exports.create = (req, res) => {
	let user = {
		username : req.body.username,
		password : req.body.password
	};

	UserModule.create(user).then((response) => {
		res.status(201).send('User created');
	});
};

exports.findOneForLogin = (user, done) => {
	UserModule.findOneForLogin(user).then((response) => {
		done(null, response);
	})
};

exports.login = (user, done) => {
	res.status(200).send('Login page');
};

exports.home = (user, done) => {
	res.status(200).send('Home');
};