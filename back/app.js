const express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer

const app = express()

const options = {
  debug: true
}

app.get('/', function (req, res, next) { res.send('HW') })

const server = require('http').createServer(app)
const peerserver = ExpressPeerServer(server, options)

app.use('/api/p2p/', peerserver)

server.listen(9000)

console.log('waiting for requests')
