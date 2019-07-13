const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

require('./socket/index')(io)

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// routes
const gameRoutes = require('./routes/games')
app.use('/api/v1/games', gameRoutes)

server.listen('8000', function () {
  console.log('it works!')
})
