const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blogs');
const { render } = require('express/lib/response');

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* api routes */
app.post('/blogs', (req, res) => {
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

app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;

	Blog.findById(id)
		.then((result) => {
			res.render('single-blog', { title: 'Blog', blog: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

/* webpages */
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('index', { title: 'All Blogs', blogs: result });
		})
		.catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) => {
	res.render('create-blog', { title: 'Create Blog' });
});

// 404 page
app.use((req, res) => {
	res.render('404', { title: '404' });
});
