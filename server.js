const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogs = [
   { title: 'hello', snippet: 'klasfklasasjkllka' },
   { title: 'bye', snippet: 'klasfklasasjkllka' },
   { title: 'hey', snippet: 'klasfklasasjkllka' },
];

const dbURI =
   'mongodb+srv://mz10ah:mz10ah2000@infinicco-cluster.zcno3.mongodb.net/infinicco?retryWrites=true&w=majority';
mongoose
   .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
   .then((result) => {
      // listen for requests
      app.listen(3000, 'localhost', () => {
         console.log('Im upp!!');
      });
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

app.use(morgan('dev'));

app.get('/', (req, res) => {
   res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
   res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
   res.render('create-blog', { title: 'Create Blog' });
});

// 404 page
app.use((req, res) => {
   res.render('404', { title: '404' });
});
