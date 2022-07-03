//data
const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const dataList = require('../../restaurant.json').results
//schema
const Restaurant = require('../restaurant.js')

function changeCategory(category) {
  switch (category) {
    case '中東料理': return 0
    case '日本料理': return 1
    case '義式餐廳': return 2
    case '美式': return 3
    case '酒吧': return 4
    case '咖啡': return 5
  }
}


db.once('open', () => {
  dataList.forEach( data => {
    Restaurant.create(
      {
        name: data.name,
        name_en: data.name_en,
        category: data.category,
        category_id: changeCategory(data.category),
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



