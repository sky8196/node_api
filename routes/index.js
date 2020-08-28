const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express', userName: req.session.user || '未登录' });
});
router.get('/detail', function(req, res, next) {
    res.render('detail', { title: 'detail' });
});
router.get('/login', function(req, res, next) {
    res.render('login',{title: 'login'});
});
router.post('/login', function(req, res) {
    req.session.user= req.body.name
    res.send({code:200,msg: '登入成功',data:req.session.user})
});

module.exports = router;

