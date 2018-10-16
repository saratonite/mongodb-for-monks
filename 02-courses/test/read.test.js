const assert = require('assert')
const Course = require('../src/models/Course')

describe('Read database ', () => {
  let nodeCourse
  beforeEach(async function () {
    nodeCourse = new Course({ name: 'NodeJs Course', author: 'Mosh' })
    await nodeCourse.save()
  })

  /**
   * find method
   */

  it('Read All Course', async function () {
    let courses = await Course.find({})

    assert.equal(courses[0].author, 'Mosh')
  })

  /**
   * Read a single using findOne
   */
  it('Read a single course', async function () {
    let course = await Course.findOne({ name: 'NodeJs Course' })

    assert.equal(course.name, 'NodeJs Course')
  })

  /**
   * findById method
   */
  it('Read a singe document using findById', async function () {
    let course = await Course.findById(nodeCourse._id)
    assert.equal(course.name, 'NodeJs Course')
  })
})
