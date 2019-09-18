const express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer

const app = express()

app.get('/', function (req, res, next) { res.send('HW') })

const server = app.listen(8000)

const options = {
  debug: true
}

app.use('/api', ExpressPeerServer(server, options))
