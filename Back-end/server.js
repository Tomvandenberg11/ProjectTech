var _ = require('lodash');
const express = require('express')
const app = express()

const hallo = ['hi', 'hoi', 'doei']

console.log(_.find(hallo))

app.get('/', function (req, res) {
    res.send('yoooo')
})

app.listen(3000)