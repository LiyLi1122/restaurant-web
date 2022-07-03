//import node_modules
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const multer = require('multer')
const axios = require('axios');
const make_API_config = require("../../make_API_config")
const ClientID = process.env.CLIENT_ID
const transform_query_string = require("../../transform_query_string")

//set multer middleware
const upload = multer({
  fileFilter(req, file, cb) {   //filter image file type
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('image only accept jpg、jpeg、png'))
    }
    cb(null, true)
  },
  limit: {  //limit image file size
    fileSize: 10000000
  }
})

//get create page
router.get('/create', (req, res) => {
  res.render('create')
})

//search specified data
router.get('/search', (request, response) => {
  const keyword = request.query.keyword
  const reg = new RegExp(keyword.trim(), 'i') //set string pattern
  const _filter = {                           //set filter conditions
    $or: [
      { name: { $regex: reg } },
      { category: { $regex: reg } }
    ]
  }
  Restaurant.find(_filter)
    .lean()
    .then(restaurantList => response.render('index', { restaurantList, keyword })) //object
    .catch(error => console.log(error))
})

//sort
router.get('/sort', (req, res) => {
  const queryString = req.query.sort
  Restaurant.find()
    .lean()
    .collation({locale: 'zh'})
    .sort(transform_query_string(queryString))
    .then(restaurantList => { res.render('index', { restaurantList }) })
    .catch(error => console.log(error))
})

//specified data detail info
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('detail', { restaurant })
    })
    .catch(error => console.log(error))
})

//create new data
router.post('/create', upload.single('image'), (req, res) => {
  const { name, name_en, category, address, phone, google_map, rating, description } = req.body
  const imageBuffer = req.file.buffer

  axios(make_API_config(imageBuffer))
    .then(function (response) {
      const image = response.data.data.link
      Restaurant.create({ name, name_en, category, image, address, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(function (error) {
      console.log(error);
    });
})

//get modify page 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})

//modify specified data 
router.patch('/:id/edit', upload.single('image'), (req, res) => {
  const id = req.params.id
  const { name, name_en, category, address, phone, google_map, rating, description, original_img } = req.body
  const imageBuffer = req.file ? req.file.buffer : original_img

  if (!req.file) {
    Restaurant.findById(id)
      .then(restaurant => {    //object
        restaurant.name = name,
          restaurant.name_en = name_en,
          restaurant.category = category,
          restaurant.address = address,
          restaurant.phone = phone,
          restaurant.google_map = google_map,
          restaurant.rating = rating,
          restaurant.description = description
        return restaurant.save()  //save changed object
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  } else {
    axios(make_API_config(imageBuffer))
      .then(function (response) {
        const image = response.data.data.link
        Restaurant.findById(id)
          .then(restaurant => {     //object
            restaurant.name = name,
              restaurant.name_en = name_en,
              restaurant.category = category,
              restaurant.image = image,
              restaurant.address = address,
              restaurant.phone = phone,
              restaurant.google_map = google_map,
              restaurant.rating = rating,
              restaurant.description = description
            return restaurant.save()   //save changed object
          })
          .then(() => res.redirect(`/restaurants/${id}`))
          .catch(error => console.log(error))
    })
  }
})

// delete specified data 
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => { return restaurant.remove() })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

