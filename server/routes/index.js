'use strict';
var fs = require('fs');

// Connects all the routes to the app
module.exports = (app) =>{
	fs.readdirSync(__dirname).forEach((file) => {
		if(file === 'index.js' || file.substr(file.lastIndexOf('.') + 1) !== 'js'){
			return;
		}
		let name = file.substr(0, file.indexOf('.'));
		app.use('/', require('./' + name));
	});
	return;
};