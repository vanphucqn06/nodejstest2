const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/thuvien', {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',error=> console.error(error))
db.once('open',()=> console.log('connect to Mongoda'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)

app.listen(3000,function(){
    console.log('server listing port 3000')
})