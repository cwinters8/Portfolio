const express = require('express');
const data = require('./data.json');
const path = require('path');

// create the app
const app = express();

/******************
 *** Middleware ***
 ******************/
// set the view engine to pug
app.set('view engine', 'pug');

// route for static files
app.use('/static', express.static('public'));

/******************
 ***** Routes *****
 ******************/
// home page
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// projects
data.projects.forEach((project, index) => {
    app.get(`/project/${project.id}`, (req, res) => {
        res.render('project', {project});
    });
});
// in case a user navigates directly to /project
app.get('/project', (req, res) => {
    res.redirect('/project/0');
});

/******************
 * Error Handling *
 ******************/
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log(`${err.status}: Page not found`);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status);
    res.render('error', {error: err});
});

// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port 3000'));