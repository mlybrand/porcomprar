var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});
router.get('/shop', function(req, res) {
    res.render('shop');
});

module.exports = router;
