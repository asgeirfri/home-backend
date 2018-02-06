var Home = require('../models/homeModel');

exports.create = (home) => {
	return new Promise((resolve, reject) => {
		let newHome = new Home({
			name: home.name,
			adminId: home.adminId
		});
		newHome.save((err) => {
			if (err) {
				reject(err);
			} else {
				resolve(newHome);
			}
		});
	});
};