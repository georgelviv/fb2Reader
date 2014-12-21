var exports = module.exports = {};
var fs = require('fs');
var parseString = require('xml2js').parseString;
var iconv = require('iconv-lite');
var jschardet = require("jschardet");

exports.xmlBook = '';

exports.parsingXml = function(bookName, callback) {
 
  fs.readFile('./dist/uploads/' + bookName, function (err, data) {
    if (err) {
      console.log('Error width reading xml file. ' + err);
      callback(true);
    }

    var encode = jschardet.detect(data)['encoding'];

    if (encode == 'utf-8') encode = 'utf8';
    if (encode == 'windows-1251') encode = 'win1251';

    var dataString = iconv.decode(data, encode);
    exports.xmlBook = xmlBookToObj(data);
    exports.xmlBook += xmlBookTagFilter(dataString);

    callback();
  });
};

function xmlBookToObj(xml) {
  var objBook = {};
  var xmlString = xml.toString('utf-8');
  var informBook;

  parseString(xml, function (err, result) {
    if (err) {
      console.log('Error with parsing xml' + err);
    }

    var fictionBook = result.FictionBook;
    var bookDesc = fictionBook.description[0]['title-info'][0];

    objBook.title = bookDesc['book-title'][0];
    informBook = '<h2>' + objBook.title + '</h2>';

    if (bookDesc['author'][0]['first-name']) {
      objBook.firstName =  bookDesc['author'][0]['first-name'][0];
      informBook += '<h3>' + objBook.firstName;
      if (bookDesc['author'][0]['last-name']) {
        objBook.lastName = bookDesc['author'][0]['last-name'][0];
         informBook += ' ' + objBook.lastName;
      }
      informBook += '</h3>';
    }

    if (fictionBook.binary) {
      objBook.posterSrc = 'data:image/jpeg;base64,' + fictionBook.binary[0]['_'] ;
      informBook += '<img alt="poster" src="' + objBook.posterSrc + '">';
    }
   

  });

  return informBook;
}

function xmlBookTagFilter(bookString) {
  var regExpTagDelete = /<epigraph>|<\/epigraph>|<empty-line\/>|/gi;
  var regExpTitleOpen = /<title>/gi;
  var regExpTitleClose = /<\/title>/gi;
  var bookStart = bookString.match(/<body.*?>/i);
  var bookBody = bookString.slice(bookString.search(/<body.*?>/i) + bookStart[0].length, bookString.search(/<\/body>/i));

  bookBody = bookBody.replace(regExpTagDelete, '');
  bookBody = bookBody.replace(regExpTitleOpen, '<h3>');
  bookBody = bookBody.replace(regExpTitleClose, '</h3>');

  return bookBody;
}