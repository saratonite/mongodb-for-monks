const assert = require('assert')
const User = require('../src/user')

describe('Update user', () => {

    let joe;

    beforeEach((done) => {

        joe = new User({ name: 'Joe'})
        joe.save()
            .then((doc) => {
                done();
            })
    })


    const assertName = (operation, done) => {

        operation
        .then(() => User.find({}))
        .then(users => {

            assert(users.length === 1)
            assert(users[0].name === 'Alex')
            done();
        })

    }


    it('Model instance set and save', (done) => {

        joe.name = 'Alex';//joe.set('name', 'Alex')
        assertName(joe.save(), done);
           

    })

    it('Model instance update', (done) => {

        assertName(joe.update({ name: 'Alex'}), done)

    })


    it('Class method update', (done) => {

        assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done)

    })

    it('Class method findOneAndUpdate', (done) => {

        assertName(User.findOneAndUpdate({name: 'Joe'}, { name: 'Alex'}),done)
    })

    it('Class method findByIdAndUpdate', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done)
    })

    it('Increment postCount by 1', (done) => {

        User.update({ name: 'Joe'}, { $inc: { postCount: 1}})
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {

                assert(user.postCount === 1);
                done();
            })

    })

})