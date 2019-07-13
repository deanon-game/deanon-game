const dbCtrl = require('../controllers/dbCtrl')

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('Someone Connected')
    socket.on('join room', (nick, room) => {
      socket.join(room)
      console.log(nick + ' joined to: ' + room)
      dbCtrl.onUpdate(room, io)
    })
  })
}
