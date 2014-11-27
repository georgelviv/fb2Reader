var exports = module.exports = {};
var fs = require('fs');
var parseString = require('xml2js').parseString;
var jade = require('jade');

exports.xmlBook = '';

exports.parsingXml = function(bookName) {
 
  fs.readFile(__dirname + '/../dist/uploads/' + bookName, function (err, data) {
    if (err) throw err;
    var dataString = data.toString('utf-8');
    var jadeFn = jade.compileFile('dev/jade/book.jade');

    exports.xmlBook = jadeFn(xmlBookToObj(data));
    exports.xmlBook += dataString.slice(dataString.indexOf('<body>') + 6, dataString.indexOf('</body>') );

  });
};

exports.deleteXml = function(bookName) {
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

    if (fictionBook.binary) {
      objBook.posterSrc = 'data:image/jpeg;base64,' + fictionBook.binary[0]['_'] ;
    }
    objBook.title = bookDesc['book-title'][0];
    if (bookDesc['author'][0]['first-name']) {
      objBook.firstName =  bookDesc['author'][0]['first-name'][0];
    }
    if (bookDesc['author'][0]['last-name']) {
      objBook.lastName = bookDesc['author'][0]['last-name'][0];
    }
    if (bookDesc['date']) {
       objBook.date = bookDesc['date'][0]['_'];
    }
   

  });

  return objBook;
}