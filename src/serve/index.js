let express=require('express')
// 引入对应路由
const router=require('./router')
// 挂载参数处理中间件post
const bodyParser=require('body-parser')
let app=express()
// 设置跨域访问
app.use(require('cors')())
// 挂在参数中间件
app.use(bodyParser.urlencoded({extended:false}))
//处理json格式参数
app.use(bodyParser.json())
app.use(router)
app.listen(3000,(req,res)=>{
  console.log("监听端口....")
})
