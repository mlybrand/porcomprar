var expect = require('chai').expect,
    sw = require('selenium-webdriver'),
    config = require('../../config/config'),
    env = process.env.NODE_ENV,
    port = 3000,
    baseUrl = config[env].baseUrl;

describe('Shopping List Site', function() {
    var app, server;

    describe('Main Page', function() {

        before(function(done) {
            if (env === 'development' || env === 'test') {
                app = require('../../lib/app');
                baseUrl = baseUrl + ':' + port;
                server = app.listen(port, function() {
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

        it('should exist', function(done) {
            var driver = new sw.Builder().withCapabilities(sw.Capabilities.phantomjs()).build();
            driver.get(baseUrl).then(function() {
                driver.getTitle().then(function(title) {
                    expect(title).to.equal('Shopping List');
                    done();
                });
            });
        });
    });

    describe('Shopping Context', function() {

    });

    describe('Maintenance Context', function() {

    });
});