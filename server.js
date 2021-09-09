// check if were running in the production env or not
// we need to not load this production env 
// unless were in our development env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    // load of dotenv dependencies
}

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

// exporting the database 
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongdb'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)