var mongoose = require("mongoose");
var Tiny = mongoose.model('Tiny');
var storage = require('node-persist');

storage.initSync();

if (!storage.getItem('counter')) {
	storage.setItem('counter','0');
}

// var getMagic() {
// 	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
// 	var arr = [0,0,0,0,0]
// 	var str = [chars[array[0]],chars[array[1]],chars[array[2]],chars[array[3]],chars[array[4]]]
// 	return str.join();
// }

var getIndex = function(req, res, next) {
  res.render('index', { 
  	title: 'Techbow TinyURL Platform',
  	shortUrl: ''
  });
}

var createTiny = function(req, res) {
	var counter = storage.getItem('counter');
	storage.setItem('counter', ++counter);
	new Tiny({
		longUrl: req.body.longUrl,
		shortUrl: 'web.techbow.com:3000/' + counter
	}).save(function(err, tiny, count){
		console.log(tiny);
		res.render('index', {
			title: 'Techbow TinyUrl Platform',
			shortUrl: tiny.shortUrl
		});
	});
};

var redirectTiny = function(req, res) {
	Tiny.find({
		shortUrl: 'web.techbow.com:3000/' + req.params.counter
	}, function(err, tiny){
		console.log('tiny: '+tiny);
		console.log('error: '+err);
		if (err == null) {
			res.redirect('http://' + tiny.longUrl);
		} else {
			res.redirect('/');
		}
	});
};

exports.getIndex = getIndex;
exports.createTiny = createTiny;
exports.redirectTiny = redirectTiny;






