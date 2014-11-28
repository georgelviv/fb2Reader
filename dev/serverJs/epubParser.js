var exports = module.exports = {};
var unzip = require('unzip');
var parseString = require('xml2js').parseString;
var fs = require('fs');
var jade = require('jade');

exports.parsingEpub = function(bookName, callback) {
	fs.createReadStream('./dist/uploads/' + bookName)
	.pipe(unzip.Extract({ path: './dist/uploads/' }))
	.on('close', function() {
		parsingContentOpf(callback);
	});
};

function parsingContentOpf(callback) {
	fs.readFile('./dist/uploads/OEBPS/content.opf', function(err, xml) {
		if (err) throw err;
		var xmlString = xml.toString('utf-8');

		parseString(xmlString, function(err, result){
			if (err) throw err;
		
			xmlBookToObj(result, callback);
		});

	});
}

function xmlBookToObj(xml, callback) {
	var objBook = {};
	var bookItem = xml['package']['manifest'][0]["item"];

	objBook.title = xml['package']['metadata'][0]['dc:title'][0];
	objBook.author = xml['package']['metadata'][0]['dc:creator'][0]['_'];

	exports.epubBook = jadeParse(objBook);

	for (var i = 0; i < bookItem.length; i++) {
		if (i == bookItem.length - 1) {
			htmlAdding(bookItem[i]['$']['href'], callback);
		} else {
			htmlAdding(bookItem[i]['$']['href']);
		}
	}
	
	return objBook;
}

function htmlAdding(path, callback) {
	fs.readFile('./dist/uploads/OEBPS/' + path, function(err, data) {
		if (err) throw err;
		if (getFormat(path) == 'html') {
			exports.epubBook += formatHtml(data.toString('utf-8'));
		}
		if (callback) {

			callback();
		}
	});
}

function formatHtml(htmlString) {
	var bookBody = htmlString.slice(htmlString.indexOf('<body>') + 6, htmlString.indexOf('</body>'));
	var imgRexExp = /src=/;
	return bookBody;
}

function jadeParse(obj) {
	var jadeFn = jade.compileFile('dev/jade/bookEpub.jade');
	return jadeFn(obj);
}

function getFormat(fileName) {
	var format = fileName.split('.');
	return format[format.length - 1];
}