var express = require('express'),
	app = express(),
  upload = require('jquery-file-upload-middleware');

upload.configure({
  uploadDir: __dirname + '/dist/uploads',
  uploadUrl: '/uploads',
});


app.get('/', function(req, res) {
	res.redirect('index.html');
});

app.post('/upload', upload.fileHandler());


app.use(express.static(__dirname + '/dist'));
console.log('Server start at http://localhost:8080/ ...');
app.listen(8080);

