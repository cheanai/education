const express=require('express')
// 加载路由
const router=express.Router()
const conn=require('./db')
//登录验证  
router.post('/login',(req,res)=>{
  let sqlStr='select * from login'
  conn.query(sqlStr,req.body,(err,results)=>{
    if(err){
      res.json({status:500,mes:'获取数据失败'})
    }else{
      res.json({status:200,usermsg:results})
    }
  })
})
//查询数据
router.get('/search',(req,res)=>{
  let sqlStr='select * from login'
  conn.query(sqlStr,(err,results)=>{
    if(err){
      res.json({status:500,mes:'获取数据失败'})
    }else{
      res.json({status:200,usermsg:results})
    }
  })
})
// 添加数据
router.post('/insert',(req,res)=>{
  conn.query('insert into login set ?',req.body,(err,results)=>{
    if(err){
      res.json({status:500,mes:'添加数据失败'})
    }else{
      res.json({status:200,mes:'插入数据成功'})
    }
  })
})
// 删除数据
router.post('/del',(req,res)=>{
  conn.query('delete from login where userId= ?',req.body.userId,(err,results)=>{
    if(err){
      res.json({status:500,mes:'删除数据失败'})
    }else{
      res.json({status:200,mes:'删除数据成功'})
    }
  })
})
// 根据id更新
var updateSql ='update login set password= ? where userId= ?';
router.post('/refresh',(req,res)=>{
  var updateParams = [req.body.password,req.body.userId];
  conn.query(updateSql,updateParams,function (err,results) {
    if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    else{
      res.json({status:200,mes:'更新数据成功'})
    }
});
})
// 导出路由
module.exports=router