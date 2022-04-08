const express = require('express');

const Blog = require('../models/blogs');

const router = express.Router();

router.get('/blogs', (req, res) => {
   Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
         res.render('index', { title: 'All Blogs', blogs: result });
      })
      .catch((err) => console.log(err));
});

// API routes
router.post('/blogs', (req, res) => {
   console.log(req.body);

   const blog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
   });

   blog
      .save()
      .then((result) => {
         res.redirect('/blogs');
      })
      .catch((err) => {
         console.log(err);
      });
});

router.get('/blogs/:id', (req, res) => {
   const id = req.params.id;

   Blog.findById(id)
      .then((result) => {
         res.render('single-blog', { title: 'Blog', blog: result });
      })
      .catch((err) => {
         console.log(err);
      });
});

module.exports = router;
