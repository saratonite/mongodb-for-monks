const assert = require('assert')
const Course = require('../src/models/Course')

describe('Query docs', () => {
  beforeEach(async function () {
    const docs = [
      {
        name: 'React JS Course',
        author: 'Wes Bos',
        price: 25,
        tags: ['JavaScript', 'React'],
        isPublished: true
      },
      {
        name: 'Node JS Course',
        author: 'Mosh',
        price: 20,
        tags: ['JavaScript', 'Node'],
        isPublished: false
      },
      {
        name: 'Angular Crash Course',
        author: 'Brad',
        price: 10,
        tags: ['JavaScript', 'Angular'],
        isPublished: true
      },
      {
        name: 'Laravel',
        author: 'Jeffrey Way',
        price: 33,
        tags: ['php', 'Laravel'],
        isPublished: true
      }
    ]

    await Course.create(docs)
  })

  it('Find published courses', async function () {
    const courses = await Course.find({ isPublished: true })

    assert.equal(courses[1].isPublished, true)

    assert.equal(courses.length, 3)
  })

  it('Sort by name and get the first two docs', async function () {
    const courses = await Course.find({}).limit(2).sort({ name: 1 })
    assert.equal(courses[0].name, 'Angular Crash Course')
    assert.equal(courses[1].name, 'Laravel')
    assert.equal(courses.length, 2)
  })

  it('Sort name descending  , get last 2 docs', async function () {
    const courses = await Course.find({}).sort({ name: -1 }).skip(2).limit(2)
    assert.equal(courses[1].name, 'Angular Crash Course')
    assert.equal(courses[0].name, 'Laravel')
    assert.equal(courses.length, 2)
  })

  it('Select only sorted course names ', async function () {
    const courses = await Course.find({})
      .sort({ name: 1 })
      .select({ name: 1, _id: 0 })
    assert.equal(courses[0]._id, undefined)
    assert.equal(courses[0].name, 'Angular Crash Course')
  })

  // Comparison operators

  /**
   * $gt - greater than
   * $gte - greater than eqaul to
   */

  it('Get courses where price greater than 15', async function () {
    const courses = await Course.find({ price: { $gt: 15 } })
      .select('name price -_id')
      .sort({ price: 1 })
    assert.equal(courses[0].price, 20)
    assert.equal(courses[2].price, 33)
  })
  it('Get courses where price greater than or equal to 25', async function () {
    const courses = await Course.find({ price: { $gte: 25 } })
      .select('name price -_id')
      .sort({ price: 1 })
    assert.equal(courses[0].price, 25)
    assert.equal(courses[1].price, 33)
  })

  it('Select courser where taged in JavaScript', async function () {
    const courses = await Course.find({ tags: { $in: 'JavaScript' } })

    assert.equal(courses.length, 3)
  })

  it('Select courser where taged in React Or Node', async function () {
    const courses = await Course.find({
      tags: { $in: ['Node', 'React'] }
    })

    assert.equal(courses.length, 2)
  })

  it('Select courser where not tagged javascript', async function () {
    const courses = await Course.find({ tags: { $nin: ['JavaScript'] } })
    assert.equal(courses.length, 1)
  })

  // Logical operators
  it('Get courses by Jeffrey Way or Not published', async function () {
    const courses = await Course.find({}).or([
      { author: 'Jeffrey Way' },
      { isPublished: false }
    ])

    assert.equal(courses.length, 2)
  })

  // Regular expression

  it('Get course match RegEx', async function () {
    const courses = await Course.find({ author: /.*way.*/i })

    assert.equal(courses[0].author, 'Jeffrey Way')
  })

  // Count result

  it.skip('Count number of docs using count() method', async function () {
    const count = await Course.find({ isPublished: true }).count()

    assert.equal(count, 3)
  })

  it('Count number of docs using countDocuments()', async function () {
    const count = await Course.find({ isPublished: true }).countDocuments()

    assert.equal(count, 3)
  })
})
