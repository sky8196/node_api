const express = require('express');
const router = express.Router();
const mysqlQuery = require('../../utils/mysql')
const {crypt} = require('../../utils/tool')
/* GET home page. */
router.get('/getImage', async function(req, res, next) {

    // const sql = 'SELECT * from user'
    // const a = await mysqlQuery(sql)
    const a = crypt(456)
    res.send({ code: 200, data: a});
});

module.exports = router;