import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../views/login.vue'
import index from '../components/index.vue'
import index2 from '../components/index2.vue'
import index1 from '../components/index1.vue'
import home from '../views/home'
import zyzg from '../views/jxzl/zyzg'
import zsjx from '../views/jxgl/zsjx'
import zsjx2 from '../views/jxgl/zsjx2'
import khfs from '../views/jxgl/khfs'
import zyrz from '../views/jxgl/zyrz'
import zljk from '../views/jxgl/zljk'
import hdhjs from '../views/jxgl/hdhjs'
import gjghfz from '../views/gjjl/gjghfz'
import jxsg from '../views/jxsg/jxsg'
import xjxuk from '../views/jxrw/xjxuk'
import sjjdjs from '../views/jxjbjs/sjjdjs'
import sysgz from '../views/jxjbjs/sysgz'
import xmjs from '../views/jxxm/xmjs'
import jxxg from '../views/jxzl/jxxg'
import ktjx from '../views/jxzl/ktjx'
import sjtgl from '../views/jxzl/sjtgl'
import xkjs from '../views/jxzl/xkjs'
import xiada from '../views/xiada/xiada'
import shenhe from '../views/xiada/shenhe'

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:login},
  {path:'/index',component:index,
    children:[
      {path:'/home',component:home},
      {path:'/zsjx',component:zsjx},
      {path:'/zsjx2',component:zsjx2},
      {path:'/khfs',component:khfs},
      {path:'/zyrz',component:zyrz},
      {path:'/zljk',component:zljk},
      {path:'/hdhjs',component:hdhjs},
      {path:'/gjghfz',component:gjghfz},
      {path:'/zyzg',component:zyzg},
      {path:'/jxsg',component:jxsg},
      {path:'/xjxuk',component:xjxuk},
      {path:'/sjjdjs',component:sjjdjs},
      {path:'/sysgz',component:sysgz},
      {path:'/xmjs',component:xmjs},
      {path:'/jxxg',component:jxxg},
      {path:'/ktjx',component:ktjx},
      {path:'/sjtgl',component:sjtgl},
      {path:'/xkjs',component:xkjs},
      {path:'/zyzg',component:zyzg},
    ]},
  {path:'/index1',component:index1,
    children:[
      {path:'/index1/home',component:home},
      {path:'/index1/shenhe',component:shenhe},
    ]},
  {path:'/index2',component:index2,
    children:[
      {path:'/index2/home',component:home},
      {path:'/index2/zsjx',component:zsjx},
      {path:'/index2/zsjx2',component:zsjx2},
      {path:'/index2/khfs',component:khfs},
      {path:'/index2/zyrz',component:zyrz},
      {path:'/index2/zljk',component:zljk},
      {path:'/index2/hdhjs',component:hdhjs},
      {path:'/index2/gjghfz',component:gjghfz},
      {path:'/index2/zyzg',component:zyzg},
      {path:'/index2/jxsg',component:jxsg},
      {path:'/index2/xjxuk',component:xjxuk},
      {path:'/index2/sjjdjs',component:sjjdjs},
      {path:'/index2/sysgz',component:sysgz},
      {path:'/index2/xmjs',component:xmjs},
      {path:'/index2/jxxg',component:jxxg},
      {path:'/index2/ktjx',component:ktjx},
      {path:'/index2/sjtgl',component:sjtgl},
      {path:'/index2/xkjs',component:xkjs},
      {path:'/index2/zyzg',component:zyzg},
      {path:'/index2/xiada',component:xiada},
    ]},
  
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
//   const userId=localStorage.getItem('userId')
//   const password=localStorage.getItem('password')
//   // console.log(userId)
//   // console.log(password)
//   if(to.path=='/login') return next()
//   if(userId!="22" && password!='123456')
//     return next('/login')
//   else next()
// })

// 防止导航首位后台路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}
export default router
