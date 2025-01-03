const express = require('express');
const data = require('./data.json');
const path = require('path');
const pug = require('pug');
const app = express();

// set up static route
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// set up routes
app.get('/', (req, res) => {
  res.render('index', { projects: data.projects });
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
});

// project route
app.get('/project/:id', (req, res) => {

    const projectId = req.params.id;
    const project = data.projects[req.params.id];
    console.log(project);
    res.render('project', { project });
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  console.error(`Error ${err.status}: ${err.message}`);
  res.status(404).send(`
    <h1>Error 404</h1>
    <p>${err.message}</p>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.error(`Error ${err.status}: ${err.message}`);
  res.status(err.status).send(`
    <h1>Error ${err.status}</h1>
    <p>${err.message}</p>
  `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});