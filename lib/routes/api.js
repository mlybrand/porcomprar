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
    //var obj = [
    //    {
    //        id: 1,
    //        name: 'foo',
    //        completed: true
    //    },
    //    {
    //        id: 2,
    //        name: 'bar',
    //        completed: false
    //    },
    //    {
    //        id: 3,
    //        name: 'baz',
    //        completed: true
    //    }
    //];
    //
    //res.status(200).send(obj);
})

module.exports = router;