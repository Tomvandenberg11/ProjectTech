var _ = require('lodash');
const express = require('express')
const app = express()
app.set('view engine', 'pug');

// Root pagina
app.get('/', function (req, res) {
    res.render('index', { title: 'Template engine werkt', message: 'Hello there!' })
})

app.get('/about', function (req, res) {
    res.send('About page')
})

app.get('/results', function (req, res) {
    res.send('Result page')
})

// 404 pagina
app.use((req, res, next) => {
    res.send('Deze pagina bestaat niet!')
})

app.listen(3000)