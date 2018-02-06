var User = require('../models/userModel'),
	bcrypt = require('bcrypt');

exports.create = (user) => {
	return new Promise((resolve, reject) => {
		let newUser = new User({
			username: user.username,
			password: bcrypt.hashSync(user.password, 10)
		});
		newUser.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(newUser);
			}
		});
	});
};

exports.findOneForLogin = (user) => {
	return new Promise((resolve, reject) => {
		User.findOne(user).then((user) => {
			resolve(user);
		}).catch((err) => {
			reject(err);
		});
	});
};