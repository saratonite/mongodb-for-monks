const mongoose = require('mongoose')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')
const Comment = require('../src/comment')

// MongoDB Connection 😄

const mongoDBUrl = 'mongodb://localhost:27017/mongo-for-monks'

mongoose.Promise = global.Promise

before(done => {
  mongoose.connect(mongoDBUrl, { useNewUrlParser: true })
  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', error => {
      console.warn('WARNING: '.error)
    })
})

// Before each test

beforeEach(async function () {
  await User.deleteMany()
  await BlogPost.deleteMany()
  await Comment.deleteMany()
})
