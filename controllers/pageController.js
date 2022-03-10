const Post = require('../models/Post')

//about page function
exports.getAboutPage = (req, res) => {
  res.render('about');
};

//add page function
exports.getAddPage = (req, res) => {
  res.render('addPost');
};

//edit page function
exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};
