//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

//set handlebars
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set database
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

db.on('error', () => {
  return console.log('error')
})

db.once('open', () => {
  return console.log('mongoDB connected!')
})

//set routes
app.get('/', (request, response) => {
  return response.render('index')
})

//server listen port
app.listen('3000', () => {
  return console.log('express server is running on http://localhost:3000')
})





