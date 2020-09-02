const express = require('express');
const router = express.Router();
const path = require('path');
const mysqlQuery = require('../../utils/mysql')
const {crypt,getBaxianFile} = require('../../utils/tool')
/* GET home page. */
router.get('/image/list', async function(req, res, next) {
    let { type = '',page = 1,number = 10 } =  req.query;
    page = page.match(/^[1-9]\d*|$/,'') * 1;
    if (page <= 1) {
        page = 1
    }
    number = number.match(/^[1-9]\d*|$/,'') * 1;
    if (number < 1) {
        number = 10
    }
    let sql = 'SELECT id,name,src,type,suffix FROM image_list'
    let params = [];
    if (type !== '') {
        sql = sql.concat(' WHERE type = ?')
        params.push(type)
    }
    sql = sql.concat(' LIMIT ?,? ')
    params.push((page-1)*number)
    params.push(number)
    const result = await mysqlQuery(sql,params)
    res.send({ code: 200, data: result});
});
router.get('/image/baxianguohai/list', async function(req, res, next) {
    const data = await getBaxianFile()
    res.send({ code: 200, data: data});
});


module.exports = router;