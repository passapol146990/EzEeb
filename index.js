const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
// app.use(cookieParser())
app.use(router)
app.use(express.static(path.join(__dirname,'/pubic')))

app.listen(8080,()=>{
    console.log('start web')
})

module.exports = app