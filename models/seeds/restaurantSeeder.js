//data
const dataList = require('../../restaurant.json').results

//schema
const Restaurant = require('../restaurant.js')

//database connect
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

db.on('error', () => {
  return console.log('error')
})

db.once('open', () => {
  console.log('ok')
  dataList.forEach( data => {
    Restaurant.create(
      {
        id: data.id,
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
  return console.log('done!')
})



