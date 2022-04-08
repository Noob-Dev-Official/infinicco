require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoute');

mongoose
   .connect(process.env.DB_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
   })
   .then((result) => {
      // listen for requests
      app.listen(process.env.PORT || 5000);
      console.log('I am up');
   })
   .catch((err) => {
      console.log(err);
   });

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* webpages */
app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
   res.render('about', { title: 'About' });
});

app.get('/create', (req, res) => {
   res.render('create-blog', { title: 'Create Blog' });
});

// blog routes
app.use(blogRoutes);

// 404 page
app.use((req, res) => {
   res.render('404', { title: '404' });
});
