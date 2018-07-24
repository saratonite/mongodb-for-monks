const assert = require('assert')
const User = require('../src/user');

describe('Deleting users', () => {
    let joe;

    beforeEach((done) => {

        joe = new User({ name: 'Joe'})
        joe.save()
            .then((doc) => {
                done();
            })

    })
    
    it('Model instance remove', (done) => {
        joe.remove()
            .then(doc => User.findOne({name: 'Joe'}))
            .then(result => {
                assert(result === null);
                done();
            })
    })

    it('Class method remove()', (done) => {

        User.remove({name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((result) => {
                assert(result === null);
                done();
            })
    })


    it('Class method findOneAndRemove', (done) => {

        User.findOneAndRemove({ name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((result) => {
                assert(result === null )
                done();
            })
    })

    it('Class method findbyIdAndRemove',(done) => {

        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe'}))
            .then((result) => {
                assert( result === null);
                done();
            })

    })
    
})