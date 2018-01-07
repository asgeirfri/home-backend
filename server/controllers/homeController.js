var home = require('./server/models/home');
var Hb = new home({ title: 'Haaleitisbraut' });

console.log(Hb);
console.log('Frankly, my dear, I dont give a damn.');
Hb.save()
	.then(() => { console.log('YAS'); })
	.catch((reason) => {
		console.error('error', reason);
}); 