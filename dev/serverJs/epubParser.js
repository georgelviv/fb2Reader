var exports = module.exports = {};
var unzip = require('unzip');
var parseString = require('xml2js').parseString;
var fs = require('fs');

exports.parsingEpub = function(bookName, callback) {
	fs.createReadStream('./dist/uploads/' + bookName)
	.pipe(unzip.Extract({ path: './dist/uploads/' }))
	.on('close', function() {
		parsingContentOpf(callback);
	});
};

function parsingContentOpf(callback) {
	var objBook = {};
	fs.readFile('./dist/uploads/OEBPS/content.opf', function(err, xml) {
		if (err) throw err;
		var xmlString = xml.toString('utf-8');

		parseString(xmlString, function(err, result){
			if (err) throw err;

			objBook.title = result['package']['metadata'][0]['dc:title'][0];
			exports.epubBook = objBook.title;
			callback();
		});

	});
}