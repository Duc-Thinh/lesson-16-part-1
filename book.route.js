var express = require('express')
var router = express.Router()
module.exports = router
var controller = require('./book.controller.js')
var authMiddleware = require('./auth.middleware.js')
router.get("/", controller.default );

router.post("/create", authMiddleware.requireAuth,controller.checkBook, controller.defaultBook);
router.get("/searchBook", authMiddleware.requireAuth,controller.search);
router.get("/changeBook/:id", authMiddleware.requireAuth,controller.changeBook)
router.post("/updateBook/:id", authMiddleware.requireAuth,controller.updateBook)
router.get("/deleteBook/:id", authMiddleware.requireAuth,controller.deleteBook)

