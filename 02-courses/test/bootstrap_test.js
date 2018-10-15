const mongoose = require('mongoose')
const assert = require('assert')

const Course = require('../src/models/Course')

// MongoDB Connection 😄

const mongoDBUrl = 'mongodb://localhost:27017/mongo-for-monks'

mongoose.Promise = global.Promise

before(async function () {
  await mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
})

beforeEach(async function () {
  await Course.deleteMany()
})

after(done => {
  process.exit(0)
})
