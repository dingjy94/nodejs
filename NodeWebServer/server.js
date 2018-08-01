const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('upper', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('log error');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    PageTitle: 'Home Page',
    WelcomeMessage: 'Welcome!!!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    PageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad response'
  });
});

app.listen(3000, () => {
  console.log('Server seve on port 3000');
});