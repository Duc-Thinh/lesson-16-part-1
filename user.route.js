var express = require('express')
var router = express.Router()
module.exports = router
var controller =  require('./user.controller.js')
var validate =  require('./validate.controller.js')
var authMiddleware = require('./auth.middleware.js')
var authMiddleware = require('./auth.middleware.js')
router.get("/changeUser/:id", controller.changeUser )

router.get("/deleteUser/:id", authMiddleware.requireAuth,controller.deleteUser);  
router.get("/", controller.user)
router.post("/createUser", validate.validate,controller.createUser)
router.post("/changeUser/update/:id", authMiddleware.requireAuth,controller.updateUser)