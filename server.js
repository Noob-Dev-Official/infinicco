const http = require('http');
const fs = require('fs');

const lodash = require('lodash');

/* this creates a server */
const server = http.createServer((req, res) => {
   console.log('request made');

   //lodash
   const num = lodash.random(0, 20);
   console.log(num);

   const greet = lodash.once(() => {
      console.log('hello');
   });

   // set header content type
   res.setHeader('Content-Type', 'text/html');

   // simple routing system
   let path = './views/';
   switch (req.url) {
      case '/':
         path += 'index.html';
         res.statusCode = 200;

         break;
      case '/about':
         path += 'about.html';
         res.statusCode = 200;

         break;
      case '/about-me':
         res.statusCode = 301;
         res.setHeader('Location', '/about');
         res.end();

         break;
      default:
         path += '404.html';
         res.statusCode = 404;

         break;
   }

   // send an html file
   fs.readFile(path, (err, data) => {
      if (err) {
         console.log(err);

         res.end();
      } else {
         // res.write(data);

         res.end(data);
      }
   });
});

server.listen(3000, 'localhost', () => {
   console.log('listening for request on port 3000');
});
