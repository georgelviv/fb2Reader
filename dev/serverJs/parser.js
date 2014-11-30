var exports = module.exports = {};
var xmlParser = require('./xmlParser.js');
var epubParser = require('./epubParser.js');
var txtParser = require('./txtParser.js');
var pageDivider = require('./pageDivider.js');
var rmdir = require( 'rmdir' );

exports.parsingBook = function(bookName, fields) {
	exports.ready = false;
	switch (getFormat(bookName)) {
		case 'fb2' :
			xmlParser.parsingXml(bookName, function() {
				readyAndRemove(xmlParser.xmlBook, fields);
			});
			break;
		case 'epub' :
			epubParser.parsingEpub(bookName, function() {
				readyAndRemove(epubParser.epubBook, fields);
			});
			break;
		case 'txt' :
			txtParser.parsingTxt(bookName, function() {
				readyAndRemove(txtParser.txtBook, fields);
			});
			break;
	}
};

function getFormat(fileName) {
	var format = fileName.split('.');
	return format[format.length - 1];
}

function removeDir(path) {
	rmdir(path, function ( err, dirs, files ){
		if (err) {
			console.log('Error delete. ' + err);
		}
	});
}

function readyAndRemove(htmlString, fields) {
	pageDivider.dividePage(fields);
	exports.bookText = htmlString;
	exports.ready = true;
	removeDir('./dist/uploads/');
}