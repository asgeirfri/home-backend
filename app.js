var express       = require('express'),
	path          = require('path'),
	favicon       = require('serve-favicon'),
	logger        = require('morgan'),
	cookieParser  = require('cookie-parser'),
	passport      = require('passport'),
	bodyParser    = require('body-parser'),
	routes        = require('./server/routes'),
	db            = require('./server/models');

// get env files from .env and now they are accesisble in process.env
require('dotenv').config();

var app = express();

// db connect
db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// API declarations
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
