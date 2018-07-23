const mongoose = require('mongoose')
const User = require('../src/user')

describe('Reading users out database', () => {

    let joe;

    beforeEach((done) => {

        joe = new User({ name: 'Joe'})
        joe.save()
            .then((doc) => {
                done();
            })
    })

    it('Find all users with the name Joe', (done) => {

        User.find({name: 'Joe'})
            .then(users => {

                assert(joe._id.toString() == users[0]._id.toString());
                done();
            })

    })
})