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
			  resolve('A user has been created');
			}
		});
	});
};