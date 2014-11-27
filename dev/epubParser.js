var exports = module.exports = {};
var fs = require('fs');

exports.parsingEpub = function(bookName) {
	exports.epubBook = 'Epub Book';
};

exports.deleteEpub = function(bookName) {
  fs.unlink(__dirname + '/../dist/uploads/' + bookName, function(err){
     if (err) throw err;
  });
};