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

exports.findById = (id) => {
	return Home.findOne({_id: id});
}

exports.addTask = (home, task) => {
	return new Promise((resolve, reject) => {
		home.tasks.push(task);
		Home.findOneAndUpdate({_id: home._id}, home).then((home) => {
			resolve(home);
		})
	})
}