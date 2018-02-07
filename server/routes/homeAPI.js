var express        = require('express'),
router             = express.Router(),
HomeController     = require('../controllers/homeController'),
jwt                = require('jsonwebtoken');

let isAuthenticated = (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send({ auth: false, message: 'No token provided.' });
	}
	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		req.userId = decoded.id;
		next();
	});
}

router.post('/homes/create', isAuthenticated, HomeController.createHome);
router.get('/homes/:homeId', isAuthenticated, HomeController.getHome);
router.post('/homes/:homeId/tasks/create', isAuthenticated, HomeController.createTask);

module.exports = router;