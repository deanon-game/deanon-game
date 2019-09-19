const express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer

const app = express()

app.get('/', function (req, res, next) { res.send('HW') })

const server = app.listen(9000)

const options = {
  debug: true,
  allow_discovery: true
}

app.use('/api/p2p/', ExpressPeerServer(server, options))

console.log('waiting for requests')
