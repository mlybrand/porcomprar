var express = require('express'),
    router = express.Router(),
    Item = require('mongoose').model('Item'),
    config = require('../../config/config'),
    env = process.env.NODE_ENV,
    port = 3000,
    baseUrl = config[env].baseUrl,
    url = baseUrl + ( env === 'development' || env === 'test' ? ':' + port : '') + '/api';


router.route('/items')
    .get(function(req, res) {
        Item.find({}, null, { sort: 'id'     }, function(err, items) {
            if (err) {
                throw err;
            }
            res.status(200).send(items);
        });
    })
    .post(function(req, res) {
        var nextId = 0,
            newItem = req.body;
        Item.find({}, 'id', { sort: { id: -1 }}, function(err, items) {
            if (err) {
                throw err;
            }
            if (items.length > 0) {
                nextId = parseInt(items[0].id, 10);
            }
            nextId++;
            newItem.id = nextId;
            Item.create(newItem, function (err, item) {
                if (err) {
                    throw err;
                }
                res.status(201)
                    .header('Location', url + '/items/' + item.id)
                    .send(item);
            });
        });
    });

router.route('/items/:id')
    .get(function(req, res) {
        var id = req.params.id;
        Item.findOne({id: id}, function(err, item) {
            if (err) {
                throw err;
            }
            res.status(200).send(item);
        });
    })
    .put(function(req, res) {
        res.status(200).send('foo');
    });

module.exports = router;