const assert = require('assert');

const User = require('../src/user')
const BlogPost = require('../src/blogPost')
const Comment = require('../src/comment');


describe('Association ', () => {

    let joe, blogPost, comment;
    beforeEach((done) => {

        joe = new User({name: 'Joe'})
        blogPost = new BlogPost({
            title: 'First post',
            content: 'This is the first post'
        })

        comment = new Comment({ content :'Awesome post'})

        joe.blogPosts.push(blogPost)

        blogPost.comments.push(comment)

        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => {
                done();
            })


    })

    it('saves a relation between user an blogpost', (done) => {


        User.findOne({ name: 'Joe'})
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'First post')
                done();
            })
    })

    it('saves full relational tree', (done) => {


        User.findOne({ name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {

                

                assert(user.blogPosts[0].title === 'First post')
                assert(user.blogPosts[0].comments[0].content === 'Awesome post')
                assert(user.blogPosts[0].comments[0].user.name === 'Joe')
                done();
            })

    })
})