// 引入mongoose模块
import mongoose from 'mongoose'
import config from './config'

//引入user model
require('./schema/user')
require('./schema/blog')

//链接mongoDB

export const database = () => {
  mongoose.set('debug', true)

  mongoose.connect(config.dbPath)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.dbPath)
  })
}