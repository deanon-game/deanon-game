const express = require('express');
const router = express.Router();


const dbCtrl = require('../controllers/dbCtrl')

router.post('/create', dbCtrl.createGame)
router.post('/connect', dbCtrl.connectToGame)
router.post('/loadPlayer', dbCtrl.loadPlayer)

module.exports = router;
