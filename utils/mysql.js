const mysql = require('mysql');
const { host, user, password, port } = require('../conf/conf');

const mysqlQuery = (database,sql,params,fn) => {
    const connection = mysql.createConnection({ host, user, password, port, database });
    connection.connect((err) => {
        if(err){
            console.log("数据库连接失败",err);
            return;
        }
    });
    connection.query(sql,params,fn)
    connection.end();
}
module.exports = (sql = '',params = [] ) => ( new Promise((resolve,reject)=>{
    mysqlQuery('test',sql,params,(err,result)=> {
        if(err){
            console.log("数据库操作失败",err);
            resolve(err.code)
        } else {
            let res = JSON.stringify(result)
            res = JSON.parse(res)
            resolve(res);
        }
    })
}));