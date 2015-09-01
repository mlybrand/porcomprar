var app = require('./lib/app'),
    port = process.env.PORT || 3000;

console.log('everything set up and ready to listen');
app.listen(port);