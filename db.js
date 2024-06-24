const mongoose = require('mongoose')
require('dotenv').config()


// define the mongodb connection url
// const mongoURL = "mongodb://localhost:27017/restra"
//replace lokeydatabase to self created database
const mongoURL = process.env.MONGODB_URL

// setup mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,

});

// get the default connection
// mongoose maintains a default connection object repersenting the mongodb connectiom
const db = mongoose.connection

// define event listener for database connection
db.on('connected', () => {
    console.log('connected to mongodb server');
})
db.on('error', () => {
    console.log(' mongodb server connection error.');
})
db.on('disconnected', () => {
    console.log('disconnected to mongodb server');
})

module.exports = db;