var exports = module.exports = {};
var unzip = require('unzip');
var fs = require('fs');
var jade = require('jade');

exports.parsingEpub = function(bookName, callback) {
	exports.epubBook = '';

	fs.createReadStream('./dist/uploads/' + bookName)
	.pipe(unzip.Extract({ path: './dist/uploads/' }))
	.on('close', function() {
		parsingContentOpf(callback);
	}).on('error', function(err) {
		exports.epubBook = 'Wrong zip format. ' + err;
		callback();
	});
};

function parsingContentOpf(callback) {
	fs.readFile('./dist/uploads/OEBPS/content.opf', function(err, xml) {
		if (err) {
			exports.epubBook = 'Error with findin content.opf. ' + err;
			callback();
		}
		var xmlString = xml.toString('utf-8');
		xmlBookToObj(xmlString, callback);
	});
}

function xmlBookToObj(xml, callback) {
	var objBook = {};
	var regExpTitle = /<dc:title.*>.*<\/dc:title>/i;
	var regExpAuthor = /<dc:creator.*opf:role="aut".*>.*<\/dc:creator>/i;
	var contentArr = getHref(xml.slice(xml.indexOf('<manifest>') + 10, xml.indexOf('</manifest>')));
	var contentHtml = [];

	objBook.title = getTagInner(regExpTitle, xml);
	if (getTagInner(regExpAuthor, xml)) {
		objBook.author = getTagInner(regExpAuthor, xml);
	}
	
	exports.epubBook = jadeParse(objBook);

	for (var i = 0; i < contentArr.length; i++) {
		htmlAdding(contentArr[i], i, callback);
	}

	function htmlAdding(path, index, callback) {
		fs.readFile('./dist/uploads/OEBPS/' + path, function(err, data) {
			if (err) {
				console.log('Error to read html file. ' + err);
				return;
			}

			contentHtml[index] = formatHtml(data.toString('utf-8'));

			if (checkArr(contentHtml, contentArr.length)) {
				for (var i = 0; i < contentArr.length; i++) {
					exports.epubBook += contentHtml[i];
				}
				callback();
			}
		});

	}

}

function formatHtml(htmlString) {
	var bookBody = htmlString.slice(htmlString.search(/<body.*>/), htmlString.search(/<\/body>/));
	bodkBody = bookBody.slice(bookBody.search(/>/));
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

function getTagInner(regExp, xml) {
	var string = xml.match(regExp);
	if (!string) return false;
	string = string[0];
	return string.slice(string.indexOf('>') + 1, string.lastIndexOf('<'));
}

function getHref(htmlString) {
	var regExpHref = /\bhref=("|'){1}.*\.\w{3,5}/gi;
	var results = htmlString.match(regExpHref);
	var fillResults = [];
	results.forEach(function(value) {
		if (getFormat(value) == 'html' || getFormat(value) == 'xhtml') {
			fillResults.push(value.slice(value.search(/'|"/) + 1));
		}
	});
	return fillResults;
}

function checkArr(arr, length) {
	var isFull = false;
	for (var i = 0; i < length; i++) {
		if (arr[i]) {
			isFull = true;
		} else {
			isFull = false;
			break;
		}
	}
	return isFull;
}
