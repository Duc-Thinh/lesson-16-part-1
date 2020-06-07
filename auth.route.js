var express = require('express')
var router = express.Router()

module.exports = router
var controller = require('./auth.controller.js')

router.get('/login',controller.login)
router.post('/login', controller.postLogin)