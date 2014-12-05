var exports = module.exports = {};
var unzip = require('unzip');
var fs = require('fs');
var jade = require('jade');
var dirOpf;

exports.parsingEpub = function(bookName, callback) {
	exports.epubBook = '';

	fs.createReadStream('./dist/uploads/' + bookName)
	.pipe(unzip.Extract({ path: './dist/uploads/' }))
	.on('close', function() {
		parsingContentOpf(callback);
	}).on('error', function(err) {
		exports.epubBook = 'Wrong zip format. ' + err;
		callback(true);
	});
};

function parsingContentOpf(callback) {
	var dirUploads = fs.readdirSync('./dist/uploads/');
	
	for (var i = 0; i < dirUploads.length; i++) {
		if (dirUploads[i].match(/(oebps|ops)/i)) {
			dirOpf = './dist/uploads/' + dirUploads[i];
			continue;
		}
	}

	fs.readdir(dirOpf, function(err, data) {
		if (err) {
			exports.epubBook = 'Dir OPF err. ' + err;
			callback(true);
			return;
		}

		var opfPath;
		for (var i = 0; i < data.length; i++) {
			if (data[i].match(/(.*?.opf)/i)) {
				opfPath = dirOpf + '/' + data[i];
				continue;
			}
		}

		fs.readFile(opfPath, function(err, xml) {
			if (err) {
				exports.epubBook = 'Error with findin content.opf. ' + err;
				callback(true);
				return;
			}
			var xmlString = xml.toString('utf-8');
			xmlBookToObj(xmlString, callback);
		});
	});
}

function xmlBookToObj(xml, callback) {
	var objBook = {};
	var regExpTitle = /<dc:title.*>.*<\/dc:title>/i;
	var regExpAuthor = /<dc:creator.*opf:role="aut".*>.*<\/dc:creator>/i;
	var contentArr = getHref(xml.slice(xml.indexOf('<manifest>') + 10, xml.indexOf('</manifest>')));

	objBook.title = getTagInner(regExpTitle, xml);
	if (objBook.title.search(/-0/) !== -1) {
		objBook.title = objBook.title.slice(0, (objBook.title.search(/-0/)));
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
	var data = fs.readFileSync(dirOpf + '/' + path);
	path = path.slice(0, path.lastIndexOf('/') + 1);
	exports.epubBook += formatHtml(data.toString('utf-8'), path);

	if (callback) {
		callback();
	}
}

function formatHtml(htmlString, path) {
	var bookBody = htmlString.slice(htmlString.search(/<body.*>/i), htmlString.search(/<\/body>/i));

	bookBody = bookBody.slice(bookBody.search(/>/) + 1);

	if (bookBody.search(/<img.*?(\n)*?.*?>/i) !== -1) {
		bookBody = imageSort(bookBody);
	}


	if (bookBody.search(/<a.*?href=("|')(?!http(s)?:\/\/).*?(<\/a>)/i) !== -1) {
		bookBody = linkSort(bookBody);
	}

	return bookBody;

	function imageSort(htmlString) {
		var imgArr = htmlString.match(/<img.*?(\n)*?.*?>/gi);
		var img = '';
		var imgHref = '';
		var dataImg;

		for (var i = 0; i < imgArr.length; i++) {
			img = imgArr[i];
			imgHref = (img.match(/src=("|').*?("|')/i)[0]).slice(5,-1);
			dataImg = fs.readFileSync(dirOpf + '/' + path + imgHref);
			htmlString = htmlString.replace(imgHref, 'data:image/jpeg;base64,' + dataImg.toString("base64"));
		}

		return htmlString;
	}

	function linkSort(htmlString) {
		var linkArr = htmlString.match(/<a.*?href=("|')(?!http(s)?:\/\/).*?(<\/a>)/gi);
		var link;
		var linkInner;

		for (var i = 0; i < linkArr.length; i++) {
			link = linkArr[i];
			linkInner = (link.match(/>.*<\/a>/i)[0]).slice(1, -4);
			htmlString = htmlString.replace(link , linkInner);
		}

		return htmlString;
	}
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
		if (getFormat(value).match(/(html|xhtml|xml)/i)) {
			fillResults.push(value.slice(value.search(/'|"/) + 1));
		}
	});
	return fillResults;
}

