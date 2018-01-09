var express             = require('express'),
	router              = express.Router(),
	UserController      = require('../controllers/userController');

router.post('/users/create', UserController.create);

module.exports = router;



