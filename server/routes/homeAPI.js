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

router.post('/home/create', isAuthenticated, HomeController.create);

module.exports = router;