const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//get all data
router.get('/', (request, response) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => {
      response.render('index', { restaurantList })
    })
    .catch(error => console.log(error))
})

module.exports = router


















