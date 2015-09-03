var expect = require('chai').expect,
    sw = require('selenium-webdriver'),
    By = sw.By,
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

        it('should have a link to get to the shopping context', function(done) {
            var driver = new sw.Builder().withCapabilities(sw.Capabilities.phantomjs()).build();
            driver.get(baseUrl).then(function() {
                driver.findElement(By.id('shop')).then(function(el) {
                    el.getText().then(function(text) {
                        expect(text).to.equal('shop');
                        el.getAttribute('href').then(function(href) {
                            expect(href).to.equal(baseUrl + '/shop');
                            done();
                        });
                    });
                });
            });
        });

        it('should have a link to get to the edit context', function(done) {
            var driver = new sw.Builder().withCapabilities(sw.Capabilities.phantomjs()).build();
            driver.get(baseUrl).then(function() {
                driver.findElement(By.id('edit')).then(function(el) {
                    el.getText().then(function(text) {
                        expect(text).to.equal('edit');
                        el.getAttribute('href').then(function(href) {
                            expect(href).to.equal(baseUrl + '/edit');
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Shopping Context', function() {
        it('should have a page for the list');
        it('should contain a list of 3 items');
        it('should allow uncompleted items to be completed');
        it('should allow completed items to be uncompleted');
    });

    describe('Maintenance Context', function() {
        it('should have a page to edit the list');
        it('should contain a list of 3 items');
        it('should allow each item to be edited');
        it('should allow each item to be deleted');
        it('should allow for new items to be added');
    });
});