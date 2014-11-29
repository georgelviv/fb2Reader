var exports = module.exports = {};
var xmlParser = require('./xmlParser.js');
var epubParser = require('./epubParser.js');
var txtParser = require('./txtParser.js');
var rmdir = require( 'rmdir' );


exports.parsingBook = function(bookName) {
	exports.ready = false;
	switch (getFormat(bookName)) {
		case 'fb2' :
			xmlParser.parsingXml(bookName, function() {
				exports.bookText = xmlParser.xmlBook;
				readyAndRemove();
			});
			break;
		case 'epub' :
			epubParser.parsingEpub(bookName, function() {
				exports.bookText = epubParser.epubBook;
				readyAndRemove();
			});
			break;
		case 'txt' :
			txtParser.parsingTxt(bookName, function() {
				exports.bookText = txtParser.txtBook;
				readyAndRemove();
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

function readyAndRemove() {
	exports.ready = true;
	removeDir('./dist/uploads/');
}