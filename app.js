const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path');
const Post = require('./models/Post');

const app = express();


//Connect DB
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//TEMPLATE ENGINE
app.set('view engine', 'ejs') //template engine views klasörü içerisine bakar

//MIDDLEWARES
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts
  })
});

app.get('/about', (req,res)=>{
  res.render('about')
})
app.get('/addpost', (req,res)=>{
  res.render('addPost')
})
app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});






const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
