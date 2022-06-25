//data
const mongoose = require('mongoose')
const dataList = require('../../restaurant.json').results

//schema
const Restaurant = require('../restaurant.js')

//database connect
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  return console.log('error')
})

db.once('open', () => {
  console.log('ok')
  dataList.forEach( data => {
    Restaurant.create(
      {
        name: data.name,
        name_en: data.name_en,
        category: data.category,
        image: data.image,
        location: data.location,
        phone: data.phone,
        google_map: data.google_map,
        rating: data.rating,
        description: data.description,
      }
    )
  })

  console.log('done!')
})



