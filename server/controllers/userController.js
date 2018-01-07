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