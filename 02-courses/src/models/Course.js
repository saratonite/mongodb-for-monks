const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  author: String,
  tags: [String],
  price: {
    type: Number,
    min: 5,
    max: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Course', courseSchema)
