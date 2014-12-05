var exports = module.exports = {};
var fs = require('fs');
var iconv = require('iconv-lite');

exports.parsingTxt = function(bookName, callback) {
	var bookString = '<p>';
	
	fs.readFile('./dist/uploads/' + bookName, function(err, data) {
		if (err) {
			console.log('Error with txt. ' + err);
			callback(true);
		}

		bookString =  iconv.decode(data, 'win1251');
		bookString =  bookString.replace(/\n/g, '</p><p>');
		bookString =  bookString.replace(/<p>(\n|\s)*<\/p>/g, '');

		exports.txtBook =  bookString.slice(0, -3);
		callback();
	});
};