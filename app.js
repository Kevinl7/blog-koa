import Koa from 'koa'
import Router from 'koa-router'
import KoaStatic from 'koa-static'
import path from 'path'
import cors from 'koa2-cors'
import koaBody from 'koa-body'
import util from 'util'
import { database } from './mongodb'
import config from './mongodb/config'
import { saveUser, fetchUser, deleUser } from './mongodb/controlers/user'

// blog
import { saveArticle, fetchArticle, removeArticle, login, editArticle, idArticle } from './mongodb/controlers/blog'

database() //链接数据库并且初始化数据模型

const app = new Koa()
const router = new Router()

app.use(cors({
  origin: function(ctx) {
    return '*'
  }
}))

app.use(koaBody())
router.post('/saveUser',  saveUser)
router.post('/fetchUser', fetchUser)
router.post('/deleUser',  deleUser)

router.post('/saveArticle',  saveArticle)
router.post('/fetchArticle', fetchArticle)
router.post('/removeArticle',  removeArticle)
router.post('/editArticle',  editArticle)
router.post('/idArticle',  idArticle)
router.post('/login',  login)



//输出HTNL页面
app.use(KoaStatic(path.join(__dirname, '.', 'dist')))
// app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3210)
console.log('koa-running3210')