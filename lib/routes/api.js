var express = require('express'),
    router = express.Router(),
    Item = require('mongoose').model('Item');

router.get('/list', function(req, res) {
    Item.find({}, null, { sort: 'id'     }, function(err, items) {
        if (err) {
            throw err;
        }
        res.status(200).send(items);
    });
});

router.get('/list/:id', function(req, res) {
    res.status(200).send('foo');
});

module.exports = router;