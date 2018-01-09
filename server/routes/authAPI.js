var express             = require('express'),
	router              = express.Router(),
	passport            = require('passport'),
	FacebookStrategy    = require('passport-facebook').Strategy,
	LocalStrategy       = require('passport-local').Strategy,
	UserController      = require('../controllers/userController'),
	bcrypt              = require('bcrypt');

passport.use(new LocalStrategy(
	function(username, password, done) {
		UserController.findOneForLogin({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!bcrypt.compareSync(password, user.password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			user.password = null;
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

router.post('/login', passport.authenticate('local', 
	{
		failureFlash:'Login failed'
	}), function(req, res) {
	res.status(302).send({user: req.user});
});

module.exports = router;