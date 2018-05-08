import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'
const Blog = mongoose.model('blog')

//保存文章
export const saveArticle = async (ctx, next) => {
  // 获取请求的数据
  const list = ctx.request.body
  const blog = new Blog(list)
  const saveBlog = await blog.save()
  if (saveBlog) {
    ctx.body = {
      success: true,
      data: saveBlog
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

//获取文章

export const fetchArticle = async (ctx, next) => {
  const info = ctx.request.body
  const total = await Blog.count({})
  const lists = await Blog.find({})
    .skip(parseInt(info.page) * parseInt(info.size))
    .limit(10)
    .sort({'_id':-1})
  lists.length >= 0 ? ctx.body = {success: true, data: lists, total: total}
    : ctx.body = {success: false}
}

// 登陆
export const login = async (ctx, next) => {
  const info = ctx.request.body
  if (info.user === 'mygao666' && info.psw === 'qaz12345') {
    let userToken = {
      user: info.user
    }
    const token = jwt.sign(userToken, config.secret, {expiresIn: '1h'})
    ctx.body = {
      success: true,
      token: token
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// 删除文章
export const removeArticle = async (ctx, next) => {
  const { id } = ctx.request.body
  const removeblog = await Blog.remove({'_id': id})
  if (removeblog) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// 修改文章
export const editArticle = async (ctx, next) => {
  const info = ctx.request.body
  const editBlog = await Blog.findByIdAndUpdate(info.id, info)
  if (editBlog) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = false
  }
}

// 根据id查找文章
export const idArticle = async (ctx, next) => {
  const {id} = ctx.request.body
  const info = await Blog.find({_id:id})
  if (info) {
    ctx.body = {
      success: true,
      data: info[0]
    }
  }
}