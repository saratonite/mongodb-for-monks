const mongoose = require('mongoose')
const PostSchema = require('./postSchema')
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
    viewCount: Number,
    posts: [PostSchema],
    blogPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogPost'
        }
    ]
})

/** Virtual field */
userSchema.virtual('postCount').get(function() {
    return this.posts.length;
})

module.exports = mongoose.model('user', userSchema)