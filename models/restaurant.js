const mongoose = require('mongoose')
const Schema = mongoose.Schema

//set restaurant data model
const restaurantSchema = new Schema ({
  name: {
    type: String,
    required: true
  }, 
  name_en: {
    type: String,
    required: true 
  },
  category: {
    type: String,
    required: true
  },
  category_id: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})


module.exports = mongoose.model('Restaurant', restaurantSchema)

























