//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')

//set handlebars
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

//set routes
//get all data
app.get('/', (request, response) => {
  Restaurant.find()
            .lean()
            .then(restaurantList => {
              response.render('index', { restaurantList })
            })
            .catch(error => console.log(error))          
})

//create one data
// app.get('/restaurants/create', (request, response) => {
//   console.log('')
//   response.send('<h1>123</h1>')
// })

//get specified data 
app.get('/restaurants/:id', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      response.render('detail', { restaurant })
    })
    .catch(error => console.log(error))
})


  
//modify specified data

//search specified data

//delete specified data


//server listen port
app.listen('3000', () => {
  return console.log('express server is running on http://localhost:3000')
})





