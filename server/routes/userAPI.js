var express        = require('express'),
router         = express.Router(),
UserController = require('../controllers/userController');

router.post('/users/create', UserController.create);
router.post('/login', UserController.login);
router.get('/me', UserController.me);

module.exports = router;