var express = require("express");
const shortid = require("shortid");
var db = require("./db.js");
var connect = {
  lists: db.get("userList").value(),
  list: db.get("listBook").value()
};
module.exports.admin =  (request, response) => {
  var trans = []
  for(var item of db.get("transactions")){
    trans.push({user:db.get("userList").find({id:item.userId}).value().user,
    title:db.get("listBook").find({id:item.bookId}).value().title,isComplete:item.isComplete,transId:item.id})
  }  
  response.render("admin.pug",{lists:db.get("userList").value(),list:db.get("listBook").value(),transactions:trans})
};