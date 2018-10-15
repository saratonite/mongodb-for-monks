const assert = require('assert')
const Course = require('../src/models/Course')

describe('Create / Save Documents', function () {
  it('Create course using create method', async function () {
    const course = await Course.create({
      name: 'VueJs Course',
      author: 'Max',
      tags: ['javascript', 'vue'],
      price: 12
    })

    assert.equal(course.name, 'VueJs Course')
  })

  it('Create courses using insertMany method ', async function () {
    const data = [
      {
        name: 'Complete laravel course',
        author: 'Jeffrey Way',
        tags: ['php', 'laravel'],
        price: 25
      },
      {
        name: 'Fullstack Nodejs Course',
        author: 'Mosh',
        tags: ['javascript', 'nodejs'],
        price: 20
      }
    ]

    await Course.insertMany(data)

    let courses = await Course.find()

    assert.equal(courses.length, 2)
  })

  it('Save using save() instance method', async function () {
    const course = new Course({ name: 'Angular Crash Course ', author: 'Brad' })
    await course.save()

    let angularCourse = await Course.findOne({ author: 'Brad' })

    assert.equal(angularCourse.author, 'Brad')
  })
})
