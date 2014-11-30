var express = require('express');
var upload = require('jquery-file-upload-middleware');
var parser = require('./dev/serverJs/parser.js');
var app = express();
var bookText;


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

app.post('/upload', upload.fileHandler());

upload.on('end', function (fileInfo, req, res) {
  parser.parsingBook(fileInfo.name);
});

upload.on('error', function (e, req, res) {
  console.log(e.message);
});

app.use(express.static(__dirname + '/dist'));
console.log('Server start at http://localhost:8080/ ...');
app.listen(8080);

app.use(function(req, res) {
  res.status(404);
  res.sendFile(__dirname + '/dist/404.html');
});


