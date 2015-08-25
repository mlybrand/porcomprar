var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    var obj = [
        {
            id: 1,
            name: 'foo'
        },
        {
            id: 2,
            name: 'bar'
        },
        {
            id: 3,
            name: 'baz'
        }
    ];

    res.status(200).send(obj);
})

module.exports = router;