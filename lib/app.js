var express = require('express'),
    app = express();//,
    db = require('./db'),
    rootRoute = require('./routes/root'),
    apiRoute = require('./routes/api');

app.set('view engine', 'jade');

app.use('/', rootRoute);
app.use('/api', apiRoute);

module.exports = app;