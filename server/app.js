const express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer

const app = express()

app.get('/', function (req, res, next) { res.send('HW') })

const server = app.listen(8000)

const options = {
  debug: true,
  allow_discovery: true
}

app.use('/p2p', ExpressPeerServer(server, options))

var idList = server.listAllPeers

app.get('/api/v1/games/', function (req, res) {
  return res.send(idList)
})

console.log('waiting for requests')
