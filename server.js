const _ = require('lodash');
const express = require('express')
const app = express()
const port = 6969
const {MongoClient} = require('mongodb');

require('dotenv').config({path: '.env-dev'})

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_URI,
} = process.env

main()

function main() {
    MongoClient

      // Database connectie
      .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })

      // Promise, als de connectie er is voert het deze dingen uit
    .then(connection => {

        let destinations = {
          country: '',
          capital: '',
          image: '',
          days: 0,
          type: '',
          likes: 0,
          liked: false
        }

        const db = connection.db('TravelBuddy')
        const collection = db.collection('destinations')

        app.set('view engine', 'ejs')

        app.use(express.static('static'))

        app.get('/', (req, res) => {
          collection.find().toArray()
            .then(result => {
                res.render('index.ejs', {
                  destinations: result,
                  capital: destinations,
                })
            })
            .catch(error => console.error(error))
        })

      app.post('/', function(req, res) {
        collection.updateOne(
          {_id: this._id},
          {"$set": { "liked" : true},
           "$inc": { "likes" : 1}}
        );
        console.log(collection.likes)
      });

        app.listen(port, () => console.log(`De server is opgestart op http://localhost:${port}`))
    })
}

