const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer
const port = process.env.PORT || 9000

app.get('/', (req, res, next) => { res.send('Hello world!') })

const server = app.listen(port)

const options = {
  debug: true
}

const peerserver = ExpressPeerServer(server, options)

app.use('/api/p2p/', peerserver)

console.log('waiting for requests')
