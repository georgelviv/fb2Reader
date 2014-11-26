var exports = module.exports = {};
var fs = require('fs');
var parseString = require('xml2js').parseString;
var jade = require('jade');

exports.bookText = '';

exports.parsingBook = function(bookName) {
 
  fs.readFile(__dirname + '/../dist/uploads/' + bookName, function (err, data) {
    if (err) throw err;
    var dataString = data.toString('utf-8');
    var jadeFn = jade.compileFile('dev/jade/book.jade');

    exports.bookText = jadeFn(xmlBookToObj(data));
    exports.bookText += dataString.slice(dataString.indexOf('<body>') + 6, dataString.indexOf('</body>') );

  });
};

exports.deleteBook = function(bookName) {
  fs.unlink(__dirname + '/../dist/uploads/' + bookName, function(err){
     if (err) throw err;
  });
};

function xmlBookToObj(xml) {
  var objBook = {};
  var xmlString = xml.toString('utf-8');

  parseString(xml, function (err, result) {
    if (err) throw err;

    var fictionBook = result.FictionBook;
    var bookDesc = fictionBook.description[0]['title-info'][0];

    objBook.posterSrc = 'data:image/jpeg;base64,' + fictionBook.binary[0]['_'] ;
    objBook.title = bookDesc['book-title'][0];
    objBook.firstName =  bookDesc['author'][0]['first-name'][0];
    objBook.lastName = bookDesc['author'][0]['last-name'][0];
    objBook.annotation = bookDesc['annotation'][0]['p'][0];
    objBook.date = bookDesc['date'][0]['_'];

  });

  return objBook;
}