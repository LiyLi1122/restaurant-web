const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//get all data
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => {
      // console.log(restaurantList)
      res.render('index', { restaurantList })
    })
    .catch(error => console.log(error))
})

module.exports = router


















