const express = require('express');
const ejs = require('ejs')
const path = require('path');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs') //template engine views klasörü içerisine bakar

//MIDDLEWARES
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/about', (req,res)=>{
  res.render('about')
})
app.get('/addpost', (req,res)=>{
  res.render('addPost')
})
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
