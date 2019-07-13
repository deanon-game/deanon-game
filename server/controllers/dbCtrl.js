const fireDB = require('../db/database')
const randomID = require('../utills/randomID')
// some tasks exports.TASK

exports.createGame = function (req, res) {
  console.log(req.body)
  let gameID = randomID(req.body.gameName)
  fireDB.db.collection('games').doc(gameID).set({
    params: req.body,
    maxPlayers: 5,
    currentPlayers: [],
    realNames: {}
  })
    .then(() => {
      // выдать ссылку на лобби
      res.send({ id: gameID })
    })
    .catch(() => {
      console.log('cant create game')
    })
}

exports.connectToGame = function (req, res) {
  if (!req.body.token || req.body.token === 'undefined') {
    const playerUpdate = {}
    const newToken = randomID(req.body.nickName)
    playerUpdate['currentPlayers.' + newToken] = {
      nickName: req.body.nickName,
      realName: req.body.realName,
      isAsked: false,
      isReady: false
    }
    fireDB.db.collection('games').doc(req.body.id)
      .update(playerUpdate)
    // Реализуем добавление реального имени в объект realNames, чтобы потом угадывать
    const realNameUpd = {}
    realNameUpd['realNames.' + req.body.nickName] = req.body.realName
    fireDB.db.collection('games').doc(req.body.id)
      .update(realNameUpd).then(() => {
        res.send({ token: newToken })
      })
  }
  fireDB.db.collection('games').doc(req.body.id)
    .get().then(doc => {
      const docObj = doc.data().currentPlayers
      if (docObj[req.body.token]) {
        res.send({ token: req.body.token })
      } else {
        const newToken = req.body.token
        const playerUpdate = {}
        playerUpdate['currentPlayers.' + req.body.token] = {
          nickName: req.body.nickName,
          realName: req.body.realName,
          isAsked: false,
          isReady: false
        }
        const realNameUpd = {}
        realNameUpd['realNames.' + req.body.nickName] = req.body.realName
        fireDB.db.collection('games').doc(req.body.id)
          .update(playerUpdate).then(() => {
            fireDB.db.collection('games').doc(req.body.id)
              .update(realNameUpd).then(() => {
                res.send({ token: newToken })
              })
          }
          )
      }
    })
}

exports.loadPlayer = function (req, res) {
  if (req.body.token && req.body.token !== 'undefined') {
    fireDB.db.collection('games').doc(req.body.id)
      .get().then(doc => {
        if (req.body.token in doc.data().currentPlayers) {
          return res.send({ gameInfo: doc.data().params })
        } else {
          res.send({ error: 'Player is not exists' })
        }
      })
  }
}

exports.signUpdate = function (room, io) {
  fireDB.db.collection('games').doc(room).get()
    .then(doc => {
      fireDB.db.collection('games').doc(room)
        .onSnapshot(doc => {
          io.sockets.in(room).emit('new data', doc.data())
        })
      io.sockets.in(room).emit('new data', doc.data())
    })
}

exports.checkToken = function (token, id) {
  return new Promise((resolve) => {
    fireDB.db.collection('games').doc(id)
      .get().then(doc => {
        resolve(token in doc.data().currentPlayers)
      })
  })
}
