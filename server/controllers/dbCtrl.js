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
            res.send('/join/' + gameID)
        })
        .catch(() => {
            console.log('cant create game')
        })
}


exports.connectToGame = function (req, res) {
    if (!req.body.token || req.body.token === 'undefined') {
        console.log(req.body.token)
        const playerUpdate = {}
        const newToken = randomID(req.body.name)
        playerUpdate['currentPlayers.' + newToken] = {
            nickName: req.body.name,
            realName: req.body.realName,
            isAsked: false
        }
        fireDB.db.collection('games').doc(req.body.id)
            .update(playerUpdate)
        // Реализуем добавление реального имени в объект realNames, чтобы потом угадывать
        const realNameUpd = {}
        realNameUpd['realNames.' + req.body.name] = req.body.realName
        fireDB.db.collection('games').doc(req.body.id)
            .update(realNameUpd)
        // sending lobby info
        fireDB.db.collection('games').doc(req.body.id)
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
    fireDB.db.collection('games').doc(req.body.id)
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
