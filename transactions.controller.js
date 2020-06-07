var express = require('express')
var db = require('./db.js')
const shortid = require("shortid");

var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}

module.exports.trans = (req,res)=>{
  res.render("transactions.pug", {lists:db.get("userList").value(),list:db.get("listBook").value()})
}

module.exports.transCreate = (req,res)=>{
  var findUserId = db.get("userList").find({user: req.body.user}).value()
  var findBookId = db.get("listBook").find({title: req.body.book}).value()
  var id = shortid.generate();  
  db.get("transactions").push({userId:findUserId.id,bookId:findBookId.id,id: id, isComplete:false}).write()
  res.redirect("/main")
}
module.exports.isComplete = (req,res)=>{
  var id = req.params.id
  db.get("transactions").find({id:id}).assign({isComplete: true}).value()
  res.redirect("/main")
}