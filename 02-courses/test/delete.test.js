const mongoose = require('mongoose')
const assert = require('assert')
const Course = require('../src/models/Course')

describe('Remove docs', () => {
  let theCourses
  beforeEach(async function () {
    theCourses = await Course.insertMany([
      { name: 'Laravel', tags: ['php'] },
      { name: 'VueJs', tags: ['javascript', 'vue'] },
      { name: 'Angular', tags: ['javascript', 'angular'] }
    ])
  })

  // Remove () method deprecated

  it.skip('Remove all docs using remove() method', async function () {
    await Course.remove({})
    const courses = await Course.find({})

    assert.equal(courses.length, 0)
  })

  // DeleteMany method

  it('Delete docs using deleteMany Method', async function () {
    await Course.deleteMany()
    const courses = await Course.find({})

    assert.equal(courses.length, 0)
  })

  it('Delete the docs that met the condition ', async function () {
    await Course.deleteMany({ tags: 'javascript' })
    const courses = await Course.find({})
    assert.equal(courses.length, 1)
    assert.equal(courses[0].name, 'Laravel')
  })

  // deleteOne() method

  it('Delete single doc', async function () {
    await Course.deleteOne({ tags: 'angular' })
    const courses = await Course.find({})
    assert.equal(courses.length, 2)
  })

  // Delete single record

  it('Delete single doc using findByIdAndDelete() method', async function () {
    await Course.findByIdAndDelete(theCourses[0]._id)
    const courses = await Course.find({})
    assert.equal(courses.length, 2)
  })
})
