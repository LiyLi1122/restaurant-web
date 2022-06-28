//data
const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const dataList = require('../../restaurant.json').results
//schema
const Restaurant = require('../restaurant.js')


db.once('open', () => {
  console.log('ok')
  dataList.forEach( data => {
    Restaurant.create(
      {
        name: data.name,
        name_en: data.name_en,
        category: data.category,
        image: data.image,
        address: data.location,
        phone: data.phone,
        google_map: data.google_map,
        rating: data.rating,
        description: data.description,
      }
    )
  })

  console.log('done!')
})



