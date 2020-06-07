var express = require('express')
var router = express.Router()
module.exports = router
var controller =  require('./transactions.controller.js')
var authMiddleware = require('./auth.middleware.js')
router.get("/", authMiddleware.requireAuth,controller.trans )
router.post("/create", authMiddleware.requireAuth,controller.transCreate)
router.get("/:id/complete", authMiddleware.requireAuth,controller.isComplete)