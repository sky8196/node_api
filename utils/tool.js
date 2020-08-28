const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const mysqlQuery = require('../utils/mysql');
function crypt(salt) {
    const s = Date.now() + ':' + salt;
    const md5 = crypto.createHash("md5");
    const res = md5.update(s).digest("hex");
    return res;
}

function putFile() {
    const fileUrl = path.join(__dirname,'../','static','images');
    const relativePath = '/static/images';
    let files = fs.readdirSync(fileUrl);
    files.forEach( async file=>{
        const fileName = file.split(".")[0];
        const fileType = '二次元';
        const createDate = moment().format('YYYY-MM-DD')
        const sql = 'INSERT INTO image_list (name,src,type,create_time) VALUE (?,?,?,?)'
        const params = [fileName,relativePath,fileType,createDate];
        await mysqlQuery(sql, params)
    })

}
// putFile() //添加图片所需 还需完善


module.exports = { crypt }