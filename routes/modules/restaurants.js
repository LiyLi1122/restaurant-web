const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//get create page
router.get('/create', (request, response) => {
  response.render('create')
})


//get specified data 
router.get('/:id', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      response.render('detail', { restaurant })
    })
    .catch(error => console.log(error))
})


//create new data
router.post('/create', (request, response) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = request.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => response.redirect('/'))
    .catch(error => console.log(error))
})


//get modify page 
router.get('/:id/edit', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      response.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})

//modify specified data 
router.patch('/:id/edit', (request, response) => {
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
router.delete('/:id/delete', (request, response) => {
  const id = request.params.id
  Restaurant.findById(id)
    .then(restaurant => { return restaurant.remove() })
    .then(() => response.redirect('/'))
    .catch(error => console.log(error))

})

module.exports = router























