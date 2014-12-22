var exports = module.exports = {};
var xmlParser = require('./xmlParser.js');
var epubParser = require('./epubParser.js');
var txtParser = require('./txtParser.js');
var rmdir = require( 'rmdir' );
var hljs = require('highlight.js');


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
	// if (htmlString.search(/<pre.*?>(.|\s)*?<\/pre>/i) !== -1) {
	// 	htmlString = codeStyle(htmlString);
	// }
	exports.bookText = htmlString;
	exports.ready = true;
	removeDir('./dist/uploads/');
}

function codeStyle(htmlString) {
	var regPre = /<pre.*?>(.|\s)*?<\/pre>/gi;
	var preArr = htmlString.match(regPre);
	var pre;
	var preInner;
	var preFormated;

	for (var i = 0; i < preArr.length; i++) {
		pre = preArr[i];
		preInner = (pre.match(/>(.|\s)*<\/pre>/i)[0]).slice(1, -7);
		preFormated = hljs.highlightAuto(preInner).value;
		preFormated = '<pre class="hljs">' + preFormated + '</pre>';
		htmlString = htmlString.replace(pre, preFormated);
	}

	return htmlString;
}