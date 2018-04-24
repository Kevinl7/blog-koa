import mongoose from 'mongoose'

const Schema = mongoose.Schema

//实例
const userSchema = new Schema({
  name: String,
  address: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//保存数据更新日期
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

//建立模型
mongoose.model('users', userSchema)