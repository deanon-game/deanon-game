const config = require('./fb-config.js')
const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp(config)
const db = firebase.firestore()

exports.firebase = firebase
exports.db = db
