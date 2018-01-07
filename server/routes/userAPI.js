var express             = require('express'),
	router              = express.Router(),
	passport            = require('passport'),
	FacebookStrategy    = require('passport-facebook').Strategy,
	LocalStrategy       = require('passport-local').Strategy,
	UserController      = require('../controllers/userController');

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true 
	})
);

router.post('/users/create', UserController.create);

module.exports = router;



