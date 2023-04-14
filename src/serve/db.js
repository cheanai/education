//引入mysql模块
const mysql=require('mysql')
// 获取连接
const conn=mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'99114',
  database:'edusystem',
  // multipleStatements:true
})
conn.connect()
module.exports=conn