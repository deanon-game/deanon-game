
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

/* 
Opening socket connection and then listening for event 'join room'
from client socket, and then add new listener for Database updates
When database updating firestore calling onSnapshot methot and then sends
new doc.data() to socket room.
*/
io.on('connection', (socket) => {
  console.log('Someone Connected')
  socket.on('join room', (nick, room) => {
    socket.join(room)
    console.log(nick + ' joined to: ' + room)
    db.collection('games').doc(room).onSnapshot(doc => {
      let players = []
      for (const key in doc.data().currentPlayers) {
        if (doc.data().currentPlayers.hasOwnProperty(key)) {
          const element = doc.data().currentPlayers[key].nickName
          players.push(element)
        }
      }
      io.sockets.in(room).emit('new data', players)
    })
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

// load player by token

app.post('/loadPlayer', function (req, res) {
  if (req.body.token && req.body.token !== 'undefined') {
    db.collection('games').doc(req.body.id)
      .get().then(doc => {
        if (doc.data().currentPlayers.hasOwnProperty(req.body.token)) {
          const playerNick = doc.data().currentPlayers[req.body.token].nickName
          console.log(playerNick)
          const playerRealName = doc.data().realNames[playerNick]
          console.log(playerRealName)
          res.send({ nickName: playerNick,
            realName: playerRealName })
        } else {
          res.send({ error: 'Player is not exists' })
        }
      })
  }
})
// connect to lobby

app.post('/connect', function (req, res) {
  if (!req.body.token || req.body.token === 'undefined') {
    console.log(req.body.token)
    const playerUpdate = {}
    const newToken = randomID(req.body.name)
    playerUpdate['currentPlayers.' + newToken] = {
      nickName: req.body.name,
      realName: req.body.realName,
      isAsked: false
    }
    db.collection('games').doc(req.body.id)
      .update(playerUpdate)
    // Реализуем добавление реального имени в объект realNames, чтобы потом угадывать
    const realNameUpd = {}
    realNameUpd['realNames.' + req.body.name] = req.body.realName
    db.collection('games').doc(req.body.id)
      .update(realNameUpd)

    // sending lobby info
    db.collection('games').doc(req.body.id)
      .get().then(doc => {
        let playersArr = []
        const docObj = doc.data().currentPlayers
        for (const key in docObj) {
          if (docObj.hasOwnProperty(key)) {
            const element = docObj[key].nickName
            playersArr.push(element)
          }
        }
        res.send({ token: newToken, players: playersArr, gameName: doc.data().params.gameName })
      })
  }
  
  db.collection('games').doc(req.body.id)
    .get().then(doc => {
      let playersArr = []
      const docObj = doc.data().currentPlayers
      for (const key in docObj) {
        if (docObj.hasOwnProperty(key)) {
          const element = docObj[key].nickName
          playersArr.push(element)
        }
      }
      res.send({ players: playersArr, gameName: doc.data().params.gameName })
    })
})

http.listen(3000, function () {
  console.log('шото работает')
})
