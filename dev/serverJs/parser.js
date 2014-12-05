var exports = module.exports = {};
var xmlParser = require('./xmlParser.js');
var epubParser = require('./epubParser.js');
var txtParser = require('./txtParser.js');
var rmdir = require( 'rmdir' );


exports.parsingBook = function(bookName) {
	exports.ready = false;
	switch (getFormat(bookName)) {
		case 'fb2' :
			xmlParser.parsingXml(bookName, function(isError) {
				readyAndRemove(xmlParser.xmlBook, isError);
			});
			break;
		case 'epub' :
			epubParser.parsingEpub(bookName, function(isError) {
				readyAndRemove(epubParser.epubBook, isError);
			});
			break;
		case 'txt' :
			txtParser.parsingTxt(bookName, function(isError) {
				readyAndRemove(txtParser.txtBook, isError);
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

function readyAndRemove(htmlString, isError) {
	exports.bookText = htmlString;
	if (!isError) {
			splitBook(htmlString);
	}
	exports.ready = true;
	removeDir('./dist/uploads/');
}

function splitBook(htmlString) {
	var symbolsLength = htmlString.split('').length;
	var divideEach = 1000000;
	var parts = Math.ceil(symbolsLength / divideEach);
	var partsArr;
	
	for (var i = 0; i <= parts; i++) {
		
	}
}