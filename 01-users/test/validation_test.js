const assert = require('assert')
const User = require('../src/user')

describe('Validating records ', () => {

    it('Require a user name', () => {

        const user = new User({ name: undefined })
        const validarionResult = user.validateSync();

        const { message } = validarionResult.errors.name;

        assert(message === 'Name field required')

    })

    it('Name length validation ', () => {

        const user = new User({ name: 'Al'})
        const validarionResult = user.validateSync();

        const { message } = validarionResult.errors.name

        assert(message === 'Name must longer than 2 characters')
    })

    it('Disallow invalid record being saved', (done)=> {

        const user = new User({ name: 'Al'})
        
        user.save()
        .catch((validarionResult) => {

            const { message } = validarionResult.errors.name

            assert(message === 'Name must longer than 2 characters')
            done();

        })
    })
})