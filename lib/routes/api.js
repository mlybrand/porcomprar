var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    var obj = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }
    ];

    res.status(200).send(obj);
})

module.exports = router;