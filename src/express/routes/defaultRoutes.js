var express = require('express');
var router = express.Router();
var {app} =  require('electron');
/* GET home page. */
router.get('/alert', function (req, res, next) {
    res.render('alert');
});

router.get('/plugin', function (req, res, next) {
    console.log(app.getAppPath()+'/plugins/page/helloworld.html');
    res.sendFile(__dirname+'/plugins/page/helloworld.html');
});
module.exports = router;
