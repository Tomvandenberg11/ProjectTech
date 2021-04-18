var _ = require('lodash');
const express = require('express')
const app = express()

const page = ['Home', 'About', 'Contact']

app.get('/', function (req, res) {
    res.send(page[0].toString() + ' page')
})

app.get('/about', function (req, res) {
    res.send(page[1].toString() + ' page')
})

app.get('/contact', function (req, res) {
    res.send(page[2].toString() + ' page')
})

app.listen(3000)