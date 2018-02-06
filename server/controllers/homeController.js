var HomeModule     = require('../modules/HomeModule');

exports.create = (req, res, next) => {
	let home = {
		name: req.body.name,
		adminId: req.userId
	};
	HomeModule.create(home).then((response) => {
		res.status(201).send({home: home});
	});
};

