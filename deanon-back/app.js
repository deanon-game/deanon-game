const express = require('express')
const db = require('./database.js')
const randomID = require('./utills/randomID.js')
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// rout-test
app.get('/', function (req, res) {
  var mas = []
  db.collection('games').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      mas.push({ id: doc.id, data: doc.data() })
    })
    res.json(mas)
  }).catch(() => {
    res.send('No games')
  })
})

/*
    Creating game in firestore
    then sending connect-url to
    this game
*/
app.post('/create', function (req, res) {
  let gameID = randomID('newgame')
  db.collection('games').doc(gameID).set({
    params: req.body
  })
    .then(() => {
      res.send('Connect url: /games/' + gameID)
    })
    .catch(() => {
      console.log('cant create game')
    })
})

app.listen(3000, function () {
  console.log('шото работает')
})
