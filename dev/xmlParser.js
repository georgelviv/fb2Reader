var exports = module.exports = {};
var fs = require('fs');

exports.bookText = '';

exports.parsingBook = function(bookName) {
  fs.readFile(__dirname + '/../dist/uploads/' + bookName, function (err, data) {
    if (err) throw err;
    exports.bookText = data.toString("utf-8");
  });
};

exports.deleteBook = function(bookName) {
  fs.unlink(__dirname + '/../dist/uploads/' + bookName, function(err){
     if (err) throw err;
  });
};