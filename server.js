const _ = require('lodash');
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
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
                title: 'Home',
              })
          })
          .catch(error => console.error(error))
      })

      app.get('/results', (req, res) => {
        collection.find().toArray()
          .then(result => {
            res.render('results.ejs', {
              destinations: result,
              title: 'Results',
            })
          })
          .catch(error => console.error(error))
      })

      // DISLIKE DESTINATION
      app.post('/dislike/*', (req, res) => {
        MongoClient.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`, function(err, db) {
          if (err) throw err;
          const dbo = db.db("TravelBuddy");
          const destination = { _id: ObjectID(req.params[0]) };
          const like = { $set: { liked: false },
            $inc: {likes: -1}};
          dbo.collection("destinations").updateOne(destination, like,  function(err, res) {
            if (err) throw err;
            db.close();
          });
        });

        setTimeout(() =>{
          res.redirect('back')
        }, 800)

      })

      // LIKE DESTINATION
      app.post('/like/*', (req, res) => {
        MongoClient.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`, function(err, db) {
          if (err) throw err;
          const dbo = db.db("TravelBuddy");
          const destination = { _id: ObjectID(req.params[0]) };
          const like = { $set: { liked: true },
                         $inc: {likes: 1}};
          dbo.collection("destinations").updateOne(destination, like,  function(err, res) {
            if (err) throw err;
            db.close();
          });
        });

        // Timeout zodat de resultaten meteen te zien zijn
        setTimeout(() => {
          res.redirect('back')
        }, 800)
      })

      app.listen(port, () => console.log(`De server is opgestart op http://localhost:${port}`))
    })
}

