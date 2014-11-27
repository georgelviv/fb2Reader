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
		var jadeFn = jade.compileFile('dev/jade/bookEpub.jade');

		parseString(xmlString, function(err, result){
			if (err) throw err;
		
			exports.epubBook = jadeFn(xmlBookToObj(result));
			callback();
		});

	});
}

function xmlBookToObj(xml) {
	var objBook = {};

	objBook.title = xml['package']['metadata'][0]['dc:title'][0];
	objBook.author = xml['package']['metadata'][0]['dc:creator'][0]['_'];

	return objBook;
}