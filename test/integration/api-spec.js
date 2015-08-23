var supertest = require('supertest'),
    config = require('../../config/config'),
    env = process.env.NODE_ENV,
    port = 3000,
    baseUrl = config[env].baseUrl,
    api = supertest(baseUrl + ( env === 'development' || env === 'test' ? ':' + port : '') + '/api');

describe('API', function() {
    var app, server;

    before(function(done) {
        if (env === 'development' || env === 'test') {
            app = require('../../lib/app');
            baseUrl = baseUrl + ':' + port;
            server = app.listen(port, function() {
                console.log('server started');
                done();
            });
        } else {
            done();
        }
    });

    after(function() {
        if (env === 'development' || env === 'test') {
            server.close();
        }
    });

    describe('Create', function() {

    });
    describe('Read', function() {
        it('should return a list of three items when called without an id', function(done) {
            // first need to update the database with the list of three items as set up
            // then make the api call
            // then check the result
            api.get('/list')
                .expect(200)
                .end(done);
        });
        it('should return one item when called with an id');
    });
    describe('Update', function() {

    });
    describe('Delete', function() {

    });
});
