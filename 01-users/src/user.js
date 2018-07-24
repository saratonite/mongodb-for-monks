const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field required'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must longer than 2 characters',
        } 
    },
    postCount: Number
})

module.exports = mongoose.model('user', userSchema)