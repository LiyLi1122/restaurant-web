const mongoose = require('mongoose')

//set database
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  return console.log('error')
})

db.once('open', () => {
  return console.log('mongoDB connected!')
})

module.exports = db








