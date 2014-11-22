var express = require('express'),
	app = express(),
	fileupload = require('fileupload').createFileUpload('/uploadDir').middleware;

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.post('/upload', fileupload, function(req, res) {
	res.send('e');
});

app.use(express.static(__dirname + '/dist'));

console.log('Server start at http://localhost:8080/ ...');

app.listen(8080);

