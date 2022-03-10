const Post = require('../models/Post');
const fs = require('fs');

//listing all the posts ordered by date
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

//showing selected post by id
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

//creating and saving post to db
exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

//updating and saving updated data to db
exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.description = req.body.detail;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

//deleting post from db
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findByIdAndRemove(post)
  res.redirect('/');
};