const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const env = require('dotenv').config()
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();


//Connect DB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9bbp6.mongodb.net/cleanblog-db?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('DB CONNECTED')
}).catch(err=>{
  console.log(err);
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs'); //template engine views klasörü içerisine bakar

//MIDDLEWARES
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/addpost', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
