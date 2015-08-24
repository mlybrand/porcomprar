var express = require('express'),
    router = express.Router();

router.get('/list', function(req, res) {
    res.send('stub');
})

module.exports = router;