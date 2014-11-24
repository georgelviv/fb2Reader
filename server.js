var express = require('express'),
    upload = require('jquery-file-upload-middleware'),
    fs = require('fs'),
    app = express(),
    bookText;

upload.configure({
  uploadDir: __dirname + '/dist/uploads',
  uploadUrl: '/uploads',
});

app.get('/', function(req, res) {
	res.redirect('index.html');
});

app.get('/getbook', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.send(bookText);
  deleteBook(req.query.bookName);
});

app.post('/upload', upload.fileHandler());

upload.on('end', function (fileInfo, req, res) {
  parsingBook(fileInfo.name);
});

upload.on('error', function (e, req, res) {
  console.log(e.message);
});

app.use(express.static(__dirname + '/dist'));
console.log('Server start at http://localhost:8080/ ...');
app.listen(8080);


function parsingBook(bookName) {
  bookText = '';
  fs.readFile(__dirname + '/dist/uploads/' + bookName, function (err, data) {
    if (err) throw err;
    bookText = data.toString("utf-8");
  });
}

function deleteBook(bookName) {
  fs.unlink(__dirname + '/dist/uploads/' + bookName, function(err){
     if (err) throw err;
  });
}