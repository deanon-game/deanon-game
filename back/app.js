const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer
const port = process.env.PORT || 9000

const portConfigFrontString = 'export default ' + port

fs.writeFile(
  path.resolve(
    __dirname,
    '../front/src/helpers/SERVER_PORT.ts'
  ),
  portConfigFrontString,
  function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('front/src/helpers/SERVER_PORT.ts > ' + portConfigFrontString)
  })

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
