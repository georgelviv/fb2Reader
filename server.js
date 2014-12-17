var express = require('express');
var fs = require('fs-extra');
var upload = require('jquery-file-upload-middleware');
var parser = require('./dev/serverJs/parser.js');
var app = express();
var bookText;
var isExampleBook = false;


upload.configure({
  uploadDir: __dirname + '/dist/uploads',
  uploadUrl: '/uploads',
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.get('/getbook', function(req, res) {
  res.set('Content-Type', 'text/html');
  if (parser.ready) {
    res.send(parser.bookText);
  } else {
    res.send(false);
  }
});

app.get('/getexamplebook', function(req, res) {
  res.set('Content-Type', 'text/html');
  if (!isExampleBook) {
    fs.copy('booksForTest/AliceinWonderland.epub', 'dist/uploads/example.epub', function(err) {
      if (err) return console.error(err);
      parser.parsingBook('example.epub');
      isExampleBook = true;
      res.send(false);
    });
  } else {
      if (parser.ready) {
        res.send(parser.bookText);
      } else {
        res.send(false);
      }
  }
});


app.post('/upload', upload.fileHandler());

upload.on('end', function (fileInfo, req, res) {
  parser.parsingBook(fileInfo.name);
});

upload.on('error', function (e, req, res) {
  console.log(e.message);
});

app.use(express.static(__dirname + '/dist'));
console.log('Server start at http://localhost:3014/...');
app.listen(3014);

app.use(function(req, res) {
  res.status(404);
  res.sendFile(__dirname + '/dist/404.html');
});
