'use strict';

var UserModule     = require('../modules/userModule'),
	jwt            = require('jsonwebtoken'),
	bcrypt         = require('bcrypt');

exports.create = (req, res) => {
	let user = {
		username : req.body.username,
		password : req.body.password
	};
	UserModule.create(user).then((response) => {
		// create a token
		let token = jwt.sign({ id: response._id }, process.env.SECRET, {
			expiresIn: 86400 // expires in 24 hours
		});
		user.password = null;
		res.status(201).send({user: user, token: token});
	});
};

exports.me = (req, res) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send({ auth: false, message: 'No token provided.' });
	}
	
	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	});
}

exports.login = (req, res) => {
	UserModule.findOneForLogin({username: req.body.username}).then((user) => {
		if (!bcrypt.compareSync(user.password, req.body.password)) {
			let token = jwt.sign({ id: user._id }, process.env.SECRET, {
				expiresIn: 86400 // expires in 24 hours
			});
			user.password = null;
			res.status(201).send({user: user, token: token});
		} else {
			res.tatus(404).send('Wrong password');
		}
	});
};
