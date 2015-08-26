var supertest = require('supertest'),
    config = require('../../config/config'),
    env = process.env.NODE_ENV,
    port = 3000,
    db = require('../../lib/db'),
    Item = require('mongoose').model('Item');
    baseUrl = config[env].baseUrl,
    api = supertest(baseUrl + ( env === 'development' || env === 'test' ? ':' + port : '') + '/api');

describe('API', function() {
    var app, server;

    before(function(done) {
        removeRecords(function() {
            addRecords(function() {
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
        });
    });

    after(function(done) {
        if (env === 'development' || env === 'test') {
            server.close();
        }
        removeRecords(done);
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
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    var items = res.body,
                        ids = '',
                        names = '',
                        completeds = '';
                    if (items.length !== 3) {
                        throw new Error('There are not the 3 expected items');
                    }
                    items.forEach(function(item, i) {
                        if (!item) { throw new Error('item[' + i + '] was not a valid object'); }
                        if (!item.id || !/^\d+$/.test(item.id)) {
                            throw new Error('item[' + i + '] did not have a valid id');
                        }
                        ids += '' + item.id;
                        if (!item.name || item.name.length <= 0) {
                            throw new Error('item[' + i + '] did not have a valid name');
                        }
                        names += '' + item.name;
                        if (typeof item.completed !== 'boolean') {
                            throw new Error('item[' + i + '] did not have a valid completed');
                        }
                        completeds += '' + item.completed;
                    });
                    if (ids !== '123') {
                        console.log(ids);
                        throw new Error('The item ids discovered were not the expected ones.');
                    }
                    if (names !== 'foobarbaz') {
                        throw new Error('The item names discovered were not the expected ones.');
                    }
                    if (completeds !== 'truefalsetrue') {
                        throw new Error('The item completed attributes were not the expected ones.');
                    }
                })
                .end(done);
        });
        it('should return one item when called with an id', function(done) {
            api.get('/list/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    var item = res.body;
                    if (item.id !== 1) { throw new Error('The id number is not 1'); }
                    if (item.name !== 'foo') { throw new Error('The name is not foo'); }
                    if (!item.completed) { throw new Error('The completed attribute is not true'); }
                })
                .end(done);
        });
    });

    describe('Update', function() {

    });

    describe('Delete', function() {

    });
});

function addRecords(callback) {
    var newItems = [
        {
            name: 'foo',
            completed: true
        },
        {
            name: 'bar',
            completed: false
        },
        {
            name: 'baz',
            completed: true
        }
    ];

    var nextId = 0;
    Item.find({}, 'id', { sort: { id: -1 }}, function(err, items) {
        if (err) {
            throw err;
        }
        if(items.length > 0) {
            nextId = parseInt(items[0].id, 10);
        }

        newItems.forEach(function(item) {
            nextId++;
            item.id = nextId;
        });
        Item.create(newItems, function(err) {
            if (err) {
                throw err;
            }
            callback();
        });
    });
}

function removeRecords(callback) {
    Item.remove({}, function(err) {
        if (err) { throw err; }
        callback();
    });
}
