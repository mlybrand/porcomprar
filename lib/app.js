var express = require('express'),
    app = express();

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index');
});

module.exports = app;