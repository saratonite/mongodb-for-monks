const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments ', () => {


    it('can crerate a subdocuments', (done) => {

        const user = new User({
            name: 'Joe',
            posts: [
                { title: 'Post Title'}
            ]
        })

        user.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {

                assert( user.posts[0].title = 'Post Title');
                done();
            })
    })


    it('Can add subdocuments to an existing user ', (done) => {

        const joe = new User({ name: 'Joe'})

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {

                user.posts.push({ title: 'New Post'})

                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {

                assert(user.posts[0].title === 'New Post');

                done();
            })
        
    })

    it('Can remove an existing subdocument ', (done) => {

        const joe = new User({
            name: 'Joe',
            posts: [
                { title: 'New post'}
            ]
        })

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {

                user.posts[0].remove();

                return user.save();
                
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {

                assert(user.posts.length === 0);
                done();
            })


        
    })
})