var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    var obj = [null, null, null];

    res.status(200).send(obj);
})

module.exports = router;