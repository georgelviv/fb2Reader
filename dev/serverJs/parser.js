var exports = module.exports = {};
var xmlParser = require('./xmlParser.js');
var epubParser = require('./epubParser.js');
var rmdir = require( 'rmdir' );

exports.ready = false;

exports.parsingBook = function(bookName) {
	if (getFormat(bookName) == 'fb2') {
		xmlParser.parsingXml(bookName, function() {
			exports.bookText = xmlParser.xmlBook;
			exports.ready = true;
		});
	} else if (getFormat(bookName) == 'epub') {
		epubParser.parsingEpub(bookName, function() {
			exports.bookText = epubParser.epubBook;
			exports.ready = true;
		});
	}
};

exports.deleteBook = function() {
	removeDir('./dist/uploads/');
};


function getFormat(fileName) {
	var format = fileName.split('.');
	return format[format.length - 1];
}

function removeDir(path) {
	rmdir(path, function ( err, dirs, files ){});
}