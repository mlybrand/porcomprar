var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    var obj = [{}, {}, {}];

    res.status(200).send(obj);
})

module.exports = router;