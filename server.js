const _ = require('lodash');
const express = require('express')
const app = express()
const port = 3000
const {MongoClient} = require('mongodb');

require('dotenv').config()

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_URI,
} = process.env

main()

function main() {

    MongoClient
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })




    app.use(express.static('static'))
    app.set('view engine', 'ejs');

// Root pagina
    app.get('/', function (req, res) {
        res.render('index', { title: 'Travel Buddy | Home', message: 'Welkom!', numbers: 5 })
    })

// Result pagina
    app.get('/results', function (req, res) {
        res.render('results', { title: 'Travel Buddy | Results', message: 'Resultaten!' })
    })

// 404 pagina
    app.use((req, res, next) => {
        res.render('results', { title: 'Travel Buddy | 404', message: 'Deze pagina bestaat niet!' })
    })

    app.listen(port, () => console.log(`De server is opgestart op http://localhost:${port}`))
}

