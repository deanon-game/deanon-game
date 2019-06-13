const config = require('./fb-config.js')
const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp(config)
var db = firebase.firestore()

module.exports = db
