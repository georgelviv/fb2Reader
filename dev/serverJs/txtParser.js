<<<<<<< HEAD
var exports = module.exports = {};
var fs = require('fs');
var iconv = require('iconv-lite');

exports.parsingTxt = function(bookName, callback) {
	var bookString = '<p>';
	
	fs.readFile('./dist/uploads/' + bookName, function(err, data) {
		if (err) {
			console.log('Error with txt. ' + err);
		}

		bookString =  iconv.decode(data, 'win1251');
		bookString =  bookString.replace(/\n/g, '</p><p>');
		bookString =  bookString.replace(/<p>(\n|\s)*<\/p>/g, '');

		exports.txtBook =  bookString.slice(0, -3);
		callback();
	});

=======
var exports = module.exports = {};
var fs = require('fs');
var iconv = require('iconv-lite');

exports.parsingTxt = function(bookName, callback) {
	var bookString = '<p>';
	
	fs.readFile('./dist/uploads/' + bookName, function(err, data) {
		if (err) {
			console.log('Error with txt. ' + err);
		}

		bookString =  iconv.decode(data, 'win1251');
		bookString =  bookString.replace(/\n/g, '</p><p>');
		bookString =  bookString.replace(/<p>(\n|\s)*<\/p>/g, '');

		exports.txtBook =  bookString.slice(0, -3);
		callback();
	});

>>>>>>> f0c05408982cc2ba59e9d12952fa7120847dc2c4
};