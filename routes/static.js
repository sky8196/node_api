const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.get('/images', function(req, res, next) {
    res.render('public')
});

router.get('/images/*', function(req, res, next) {
    console.log('req.url----',req.url)
    const url = path.join(__dirname,'../static',req.url)
        fs.access(url, fs.constants.F_OK, (err) => {
            if (err) {
                res.render('public')
            } else {
                res.sendfile(url)
            }
        });
});
router.get('/', function(req, res, next) {
    console.log('跟路径')
});

module.exports = router;
