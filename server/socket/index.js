const dbCtrl = require('../controllers/dbCtrl')

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('Someone Connected')
    socket.on('join room', (token, room) => {
      dbCtrl.checkToken(token, room).then(isValid => {
        if (!isValid) {
          io.to(socket.id).emit('err', 'token is not valid')
          return
        }
        console.log('joined')
        socket.join(room)
        dbCtrl.signUpdate(room, io)
      })
    })
  })
}
