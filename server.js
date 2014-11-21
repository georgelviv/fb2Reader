var express = require('express'),
	app = express();

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.use(express.static(__dirname + '/dist'));

console.log('Server start at http://localhost:8080/ ...');

app.listen(8080);

