const mongoose = require('mongoose')
const env = require('dotenv')

env.config();


const connect = (uri) => {
    mongoose.connect(uri, {
       
    })
       .then(() => console.log('Connected to MongoDB'))
       .catch(err => console.error('Error connecting to MongoDB:', err))
}

module.exports = connect;