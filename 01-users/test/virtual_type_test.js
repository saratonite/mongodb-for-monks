const assert = require('assert')
const User = require('../src/user')


describe('Virtual types ', () => {

    it('postCount return number of posts', (done) => {

        const joe = new User({
            name: 'Joe',
            posts: [
                { title: 'Yet anaother post'}
            ]
        })

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                assert(user.postcount === 1);
                done();
            })
    })
})