const _ = require('lodash');
const express = require('express')
const app = express()
const port = 6969
const {MongoClient} = require('mongodb');
const ObjectID = require('mongodb').ObjectID

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

        const db = connection.db('TravelBuddy')
        const collection = db.collection('destinations')

        app.set('view engine', 'ejs')

        app.use(express.static('static'))

        app.get('/', (req, res) => {
          collection.find().toArray()
            .then(result => {
                res.render('index.ejs', {
                  destinations: result,
                })
            })
            .catch(error => console.error(error))
        })

      app.post('/update', (req, res) => {
        MongoClient.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`, function(err, db) {
          if (err) throw err;
          const dbo = db.db("TravelBuddy");
          const destination = { country: new ObjectID(req.query.id) };
          console.log(new ObjectID(req.query.id))
          const like = { $set: {likes: 1, liked: false } };
          dbo.collection("destinations").updateOne(destination, like, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
          });
        });

        res.render('update.ejs', {
          title: 'test page',
        })
      })

      app.listen(port, () => console.log(`De server is opgestart op http://localhost:${port}`))
    })
}

