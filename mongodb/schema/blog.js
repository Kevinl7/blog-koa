import mongoose from 'mongoose'

const Schema = mongoose.Schema

//实例
const blogSchema = new Schema({
  title: String,
  tag: String,
  html: String,
  markdownHtml: String,
  time: {
    type: String,
    default: ''
  }
})

//保存数据更新日期
blogSchema.pre('save', function(next) {
  if (this.isNew) {
    const n = Date.now()
    const date = new Date(n)
    this.time = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1}-${date.getDate() + ' '}${date.getHours()}:${date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>10?date.getSeconds():'0'+date.getSeconds()}`
  } else {
    const n = Date.now()
    const date = new Date(n)
    this.time = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1}-${date.getDate() + ' '}${date.getHours()}:${date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>10?date.getSeconds():'0'+date.getSeconds()}`
  }
  next()
})

//建立模型
mongoose.model('blog', blogSchema)