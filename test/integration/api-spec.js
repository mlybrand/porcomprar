var supertest = require('supertest'),
    config = require('../../config/config'),
    env = process.env.NODE_ENV,
    port = 3000,
    db = require('../../lib/db'),
    Item = require('mongoose').model('Item'),
    baseUrl = config[env].baseUrl,
    url = baseUrl + ( env === 'development' || env === 'test' ? ':' + port : '') + '/api',
    api = supertest(url);

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

        after(function(done) {
            removeRecords(function() {
                addRecords(done);
            });
        });

        it('should take an object, add it, and return a response with the new object and its location', function(done) {
            api.post('/items')
                .send({ name: 'fizz', completed: false})
                .expect(201)
                .expect('Content-Type', /json/)
                .expect('Location', url +'/items/4')
                .expect(checkItemFour)
                .end(function() {
                    api.get('/items/4')
                        .expect(checkItemFour)
                        .end(done);
                });
            function checkItemFour(res) {
                var item = res.body;
                if (!item) { throw new Error('no item in body'); }
                if (!item.id || item.id !== 4) { throw new Error('id is not valid'); }
                if (!item.name || item.name !== 'fizz') { throw new Error('name is not valid'); }
                if (typeof item.completed !== 'boolean' || item.completed) { throw new Error('completed is not valid'); }
            }
        });
    });

    describe('Read', function() {
        it('should return a list of three items when called without an id', function(done) {
            // first need to update the database with the list of three items as set up
            // then make the api call
            // then check the result
            api.get('/items')
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
            api.get('/items/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    var item = res.body;
                    if (item.id !== 1) { throw new Error('The id number is not 1'); }
                    if (item.name !== 'foo') { throw new Error('The name is not foo'); }
                    if (typeof item.completed !== 'boolean' || !item.completed) { throw new Error('The completed attribute is not true'); }
                })
                .end(done);
        });
        it('should return 404 if there is no matching item', function(done) {
            api.get('/items/99')
                .expect(404)
                .end(done);
        });
    });

    describe('Update', function() {
        it('should update an existing record and return a representation of the updated item', function(done) {
            api.put('/items/1')
                .send({id: 1, name: 'fop', completed: true })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    var item = res.body;
                    if (!item.id || item.id !== 1) { throw new Error('id is invalid'); }
                    if (!item.name || item.name !== 'fop') { throw new Error('name is invalid'); }
                    if (!item.completed) { throw new Error('completed is invalid'); }
                })
                .end(done);
        });
        it('should return 404 on update if there is no matching item');
        it('should toggle the completed field and return a representation of the udpated item', function(done) {
            api.put('/items/2/completed')
                .send({id: 2, name: 'bar', completed: false })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    var item = res.body;
                    if (!item.completed) { throw new Error('completed is invalid'); }
                })
                .end(done);
        });
        it('should return 404 on complete toggle if there is no matching item');
    });

    describe('Delete', function() {
        it('should remove the item and return a response indicating no content and the item should be removed',
                function(done) {
            api.delete('/items/1')
                .expect(204)
                .end(done);
        });
        it('should return 404 if there is no matching item');
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
