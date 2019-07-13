const fireDB = require('../db/database')
const randomID = require('../utills/randomID')
// some tasks exports.TASK

exports.createGame = function(req, res) {
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
            isAsked: false
        }
        fireDB.db.collection('games').doc(req.body.id)
            .update(playerUpdate)
        // Реализуем добавление реального имени в объект realNames, чтобы потом угадывать
        const realNameUpd = {}
        realNameUpd['realNames.' + req.body.nickName] = req.body.realName
        fireDB.db.collection('games').doc(req.body.id)
            .update(realNameUpd).then( () => {
                res.send({ token: newToken })
            })
    }
    fireDB.db.collection('games').doc(req.body.id)
        .get().then(doc => {
            const docObj = doc.data().currentPlayers
        if(docObj[req.body.token]) {
            res.send({ token: req.body.token })
    } else {
        const newToken = req.body.token
        const playerUpdate = {}
        playerUpdate['currentPlayers.' + req.body.token] = {
            nickName: req.body.nickName,
            realName: req.body.realName,
            isAsked: false
        }
        const realNameUpd = {}
        realNameUpd['realNames.' + req.body.nickName] = req.body.realName
        fireDB.db.collection('games').doc(req.body.id)
            .update(playerUpdate).then(() => {
                fireDB.db.collection('games').doc(req.body.id)
            .update(realNameUpd).then( () => {
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
            if (doc.data().currentPlayers.hasOwnProperty(req.body.token)) {
                const playerNick = doc.data().currentPlayers[req.body.token].nickName
                console.log(playerNick)
                const playerRealName = doc.data().realNames[playerNick]
                console.log(playerRealName)
                return res.send({ nickName: playerNick,
                    realName: playerRealName })
            } else {
                res.send({ error: 'Player is not exists' })
            }
        })
    }
}

exports.onUpdate = function (room, io) {
        fireDB.db.collection('games').doc(room)
            .onSnapshot(doc => {
                io.sockets.in(room).emit('new data', doc.data())
            })
}
