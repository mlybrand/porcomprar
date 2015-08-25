var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    var obj = [
        {
            id: 1,
            name: 'foo',
            completed: true
        },
        {
            id: 2,
            name: 'bar',
            completed: false
        },
        {
            id: 3,
            name: 'baz',
            completed: true
        }
    ];

    res.status(200).send(obj);
})

module.exports = router;