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

	objBook.title = getTagInner(regExpTitle, xml);
	if (objBook.title.search(/-0/)) {
		objBook.title = objBook.title.slice(0, objBook.title.search(/-0/));
	}

	if (getTagInner(regExpAuthor, xml)) {
		objBook.author = getTagInner(regExpAuthor, xml);
	}
	
	exports.epubBook = jadeParse(objBook);

	for (var i = 0; i < contentArr.length; i++) {
		if (i == contentArr.length - 1) {
			htmlAdding(contentArr[i], callback);
		} else {
			htmlAdding(contentArr[i]);
		}
	}
}

function htmlAdding(path, callback) {
	var data = fs.readFileSync('./dist/uploads/OEBPS/' + path);
	path = path.slice(0, path.lastIndexOf('/') + 1);
	exports.epubBook += formatHtml(data.toString('utf-8'), path);

	if (callback) {
		callback();
	}
}

function formatHtml(htmlString, path) {
	var bookBody = htmlString.slice(htmlString.search(/<body.*>/i), htmlString.search(/<\/body>/i));
	var imgArr = [];
	var img = '';
	var imgHref = '';
	var dataImg;

	bookBody = bookBody.slice(bookBody.search(/>/) + 1);

	if(bookBody.search(/<img.*>/i) !== -1) {
		imgArr = bookBody.match(/<img.*>/gi);

		for (var i = 0; i < imgArr.length; i++) {
			img = imgArr[i];
			imgHref = (img.match(/src=("|').*("|')/i)[0]).slice(5,-1);
			dataImg = fs.readFileSync('./dist/uploads/OEBPS/' + path +imgHref);
			bookBody = bookBody.replace(imgHref, 'data:image/jpeg;base64,' + dataImg.toString("base64"));
		}
	}

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

