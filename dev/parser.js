var exports = module.exports = {};
var xmlParser = require('../dev/xmlParser.js');
var epubParser = require('../dev/epubParser.js');
var fs = require('fs');


exports.parsingBook = function(bookName) {
	if (getFormat(bookName) == 'fb2') {
		xmlParser.parsingXml(bookName);
		setTimeout(function () {
			exports.bookText = xmlParser.xmlBook;
		}, 500);
	} else if (getFormat(bookName) == 'epub') {
		epubParser.parsingEpub(bookName);
		setTimeout(function () {
			exports.bookText = epubParser.epubBook;
		}, 500);
	}
};

exports.deleteBook = function(bookName) {
	if (getFormat(bookName) == 'fb2') {
		xmlParser.deleteXml(bookName);
	} else if (getFormat(bookName) == 'epub') {
		epubParser.deleteEpub(bookName);
	}
};


function getFormat(fileName) {
	var format = fileName.split('.');
	return format[format.length - 1];
}