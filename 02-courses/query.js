const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/mongo-for-monks', {
    useNewUrlParser: true
  })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log('Could not connect mongodb'))

const Course = require('./models/Course')

// No Filtters
async function getAllCourses (params) {
  const courses = await Course.find()

  console.log(courses)
}

// getAllCourses()

// Get only isPublished

async function getPublishedCourses () {
  const courses = await Course.find({ isPublished: true })

  console.log(courses)
}

getPublishedCourses()
