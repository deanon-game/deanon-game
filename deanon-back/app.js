
// Firebase init
const db = require('./database.js')
const Firebase = require('firebase')
const randomID = require('./utills/randomID.js')
// Firebase init end

// server init
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// server init end
io.on('connection', (socket) => {
  console.log('Someone Connected')
  socket.on('join room', (room) => {
    socket.join(room)
    io.to(room).emit('msg', 'room working')
  })
})
app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
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
  let gameID = randomID(req.body.gameName)
  db.collection('games').doc(gameID).set({
    params: req.body,
    maxPlayers: 5,
    currentPlayers: [],
    realNames: {}
  })
    .then(() => {
      // выдать ссылку на лобби
      res.send('/lobby/' + gameID)
    })
    .catch(() => {
      console.log('cant create game')
    })
})

// connect to lobby

app.post('/connect', function (req, res) {
  db.collection('games').doc(req.body.id)
    .update({
      currentPlayers: Firebase.firestore.FieldValue.arrayUnion(req.body.name)
    })
    // Реализуем добавление реального имени в объект realNames, чтобы потом угадывать
  const realNameUpd = {}
  realNameUpd['realNames.' + req.body.name] = req.body.realName
  db.collection('games').doc(req.body.id)
    .update(realNameUpd)
  // Сформировать дату из дока с необходимой инфой, кинуть на бек
  db.collection('games').doc(req.body.id)
    .get().then(doc => {
      res.send({ players: doc.data().currentPlayers, params: doc.data().params.gameName })
    })
})

http.listen(3000, function () {
  console.log('шото работает')
})
