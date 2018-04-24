import mongoose from 'mongoose'
const User = mongoose.model('users')

// 保存user信息
export const saveUser = async (ctx, next) => {
  // 获取请求的数据
  const opts = ctx.request.body
  const user = new User(opts)
  const saveUser = await user.save() // 保存数据
  // 简单判断一下 是否保存成功，然后返回给前端
  if (saveUser) {
    ctx.body = {
      success: true,
      data: saveUser
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// 获取所有的users数据
export const fetchUser = async (ctx, next) => {
  const users = await User.find({}) // 数据查询

  if (users.length) {
    ctx.body = {
      success: true,
      info: users
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

export const deleUser = async (ctx, next) => {
  const opts = ctx.request.body
  console.log(ctx)
  await User.remove(opts, (err, docs) => {
    err ? ctx.body = {
      success: false
    } :
    ctx.body = {
      success: true
    }
  })
  
}
