const path = require('path')
const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer
const port = process.env.PORT || 9000

console.log(port)

app.use(express.static(path.join(__dirname, '/public')))

const server = app.listen(port)

const options = {
  debug: true
}

const peerserver = ExpressPeerServer(server, options)

app.use('/api/p2p/', peerserver)

app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, '/public/index.html'))
})

console.log('http://localhost:' + port)

console.log('waiting for requests')
