var expect = require('chai').expect,
    sw = require('selenium-webdriver'),
    config = require('../../config/config'),
    baseUrl = config[process.env.NODE_ENV].baseUrl;

var driver = new sw.Builder().withCapabilities(sw.Capabilities.phantomjs()).build();

describe('Shopping List Site', function() {
    it('should exist', function() {
        expect(true).to.be.true;
    });
});