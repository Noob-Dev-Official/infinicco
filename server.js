const express = require('express');

const blogs = [
	{ title: 'hello', snippet: 'klasfklasasjkllka' },
	{ title: 'bye', snippet: 'klasfklasasjkllka' },
	{ title: 'hey', snippet: 'klasfklasasjkllka' },
];

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// listen for requests
app.listen(3000, 'localhost', () => {
	console.log('Im upp!!');
});

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
