const _ = require('lodash');
const express = require('express')
const app = express()
const port = 6969

app.use(express.static('static'))
app.set('view engine', 'ejs');

// Root pagina
app.get('/', function (req, res) {
    res.render('index', { title: 'Travel Buddy | Home', message: 'Welkom!!' })
})

app.get('/results', function (req, res) {
    res.render('results', { title: 'Travel Buddy | Results', message: 'Resultaten!!' })
})

// 404 pagina
app.use((req, res, next) => {
    res.send('Deze pagina bestaat niet!')
})

app.listen(port)