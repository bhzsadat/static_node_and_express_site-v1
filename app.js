const express = require('express');
const data = require('./data.json');
const path = require('path');
const pug = require('pug');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { projects: data.projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
    // const project = data.projects.find(proj => proj.id === req.params.id); // Example lookup
    // if (project) {
    //     res.render('project', { project });
    // } else {
    //     res.status(404).send('Project not found');
    // }
    const projectId = req.params.id;
    const project = data.projects[req.params.id];
    console.log(project);
    res.render('project', { project });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });