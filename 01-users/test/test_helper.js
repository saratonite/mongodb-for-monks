const mongoose = require('mongoose')

// MongoDB Connection 😄

const mongoDBUrl = 'mongodb://localhost:27017/mongo-for-monks';

mongoose.Promise = global.Promise;

before((done) => {
    
    mongoose.connect(mongoDBUrl)
    mongoose.connection.once('open', ()=> {
        done();
    })
    .on('error', (error)=> {
        console.warn('WARNING: '. error)
    })
})



// Before each test

beforeEach((done) => {
    // Drop user collections
    mongoose.connection.collections.users.drop(() => {
        done();
    });


})