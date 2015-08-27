var express = require('express'),
    router = express.Router(),
    Item = require('mongoose').model('Item');


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
        res.status(201).send({ msg: 'foo' });
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
    });

module.exports = router;