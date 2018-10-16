const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 200,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  }
})
