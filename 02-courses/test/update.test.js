const assert = require('assert')
const Course = require('../src/models/Course')

describe('Update documents', () => {
  let reactCourse

  beforeEach(async function () {
    reactCourse = await Course.create({ name: 'React Course', author: 'Wes' })
    await Course.create({ name: 'NodeJs Course', author: 'Mosh' })
  })

  // Update using instance method save()

  it('Update record using save method', async function () {
    let course = await Course.findOne({ name: 'React Course' })
    assert.equal(course.name, 'React Course')

    course.name = 'React Redux Course'

    course.set('author', 'Wes Bos')

    course.set({
      isPublished: true
    })

    // Save
    let _c = await course.save()

    // Get course again

    let updatedCourse = await Course.findOne({ _id: reactCourse._id })

    assert.equal(updatedCourse.name, 'React Redux Course')
    assert.equal(updatedCourse.author, 'Wes Bos')
    assert.equal(updatedCourse.isPublished, true)
  })

  // using update method - ##### deprecated method

  it.skip('update document using update method', async function () {
    const result = await Course.update(
      { _id: reactCourse._id },
      {
        $set: {
          name: 'React Course By Wes Bos'
        }
      }
    )

    // get course

    const course = await Course.findById(reactCourse._id)

    assert.equal(course.name, 'React Course By Wes Bos')
  })

  // updateOne

  it('Update only one document', async function () {
    const result = await Course.updateOne(
      { _id: reactCourse._id },
      {
        $set: {
          name: 'React Course By Wes Bos'
        }
      }
    )

    // get course

    const course = await Course.findById(reactCourse._id)

    assert.equal(course.name, 'React Course By Wes Bos')
  })

  /**
   * updateMany
   */
  it('Update record using updateMany method', async function () {
    const result = await Course.updateMany(
      {},
      {
        $set: {
          isPublished: true
        }
      }
    )

    const courses = await Course.find({})

    assert.equal(courses[0].isPublished, true)
    assert.equal(courses[1].isPublished, true)
  })

  it('Update doc using findByIdAndUpdate', async function () {
    const course = await Course.findByIdAndUpdate(
      reactCourse._id,
      { $set: { name: 'React Crash Course' } },
      { new: true }
    )

    assert.equal(course.name, 'React Crash Course')
  })
})
