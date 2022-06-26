//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


//set handlebars
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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


//search specified data


//get create page
app.get('/restaurants/create', (request, response) => {
  response.render('create')
})


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


//create new data
app.post('/restaurants/create', (request, response) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = request.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => response.redirect('/'))
    .catch(error => console.log(error))
})
  

//get modify page 
app.get('/restaurants/:id/edit', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      response.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})

//modify specified data 
app.patch('/restaurants/:id/edit', (request, response) => {
  const id = request.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = request.body
  Restaurant.findById(id)
    .then(restaurant => { //object
      restaurant.name = name, 
      restaurant.name_en = name_en, 
      restaurant.category = category, 
      restaurant.image = image, 
      restaurant.location = location, 
      restaurant.phone = phone, 
      restaurant.google_map = google_map,
      restaurant.rating = rating, 
      restaurant.description = description
      return restaurant.save() //save changed object
    })
    .then(() => response.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete specified data 
app.delete('/restaurants/:id/delete', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
            .then(restaurant => {return restaurant.remove()})
            .then(() => response.redirect('/'))
            .catch(error => console.log(error))

})



//server listen port
app.listen('3000', () => {
  return console.log('express server is running on http://localhost:3000')
})





