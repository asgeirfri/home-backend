var HomeModule     = require('../modules/HomeModule');

exports.createHome = (req, res, next) => {
	let home = {
		name    : req.body.name,
		adminId : req.userId
	};
	HomeModule.create(home).then((response) => {
		res.status(201).send({home: response});
	});
};

exports.createTask = (req, res) => {
	let homeId = req.params.homeId;
	HomeModule.findById(homeId).then((home) => {
		if (home.adminId !== req.userId) {
			res.status(403).send({message: 'Þú ert ekki stjórnandi í þessu heimili'});
			return;
		}
		let task   = {
			title     : req.body.title,
			due       : req.body.due,
			type      : req.body.type,
			assignedTo: req.body.assignedTo
		};

		HomeModule.addTask(home, task).then((home) => {
			res.status(201).send({home: home, task: task});
		})
	});
};

exports.getHome = (req, res) => {
	let homeId = req.params.homeId;
	HomeModule.findById(homeId).then((home) => {
		res.status(201).send({home: home});
	});
};