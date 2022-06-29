//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const multer = require('multer')

require('./config/mongoose')

//set handlebars
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') 

//set application-level middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)


const upload = multer({
  fileFilter(request, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('image only accept jpg、jpeg、png'))
    }
    cb(null, true)
  }
})

//server listen port
app.listen('3000', () => {
  return console.log('express server is running on http://localhost:3000')
})





