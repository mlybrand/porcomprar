var express = require('express'),
    app = express();//,
    //rootRoute = require('./routes/root'),
    //apiRoute = require('./routes/api');

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/api/list', function(req, res) {
    res.send('stub');
})

module.exports = app;