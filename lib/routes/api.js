var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    res.status(200).send({
        msg: 'stub'
    });
})

module.exports = router;