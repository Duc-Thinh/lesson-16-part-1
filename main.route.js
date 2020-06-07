var express = require('express')
var router = express.Router()
module.exports = router
var controller =  require('./main.controller.js')
var authMiddleware = require('./auth.middleware.js')
router.get("/", authMiddleware.requireAuth,controller.main)