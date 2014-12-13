var exports = module.exports = {};
var fs = require('fs');
var iconv = require('iconv-lite');
var jschardet = require("jschardet");

exports.parsingTxt = function(bookName, callback) {
	var bookString = '<p>';
	var encode;
	
	fs.readFile('./dist/uploads/' + bookName, function(err, data) {
		if (err) {
			console.log('Error with txt. ' + err);
			callback(true);
		}

		encode = jschardet.detect(data)['encoding'];

		if (encode == 'utf-8') encode = 'utf8';
		if (encode == 'windows-1251') encode = 'win1251';

		bookString =  iconv.decode(data, encode);
		bookString =  bookString.replace(/\n/g, '</p><p>');
		bookString =  bookString.replace(/<p>(\n|\s)*<\/p>/g, '');

		exports.txtBook =  bookString.slice(0, -3);
		callback();
	});
};