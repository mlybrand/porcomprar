var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    rootRoute = require('./routes/root'),
    apiRoute = require('./routes/api');

app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'jade');

app.use('/', rootRoute);
app.use('/api', apiRoute);

module.exports = app;