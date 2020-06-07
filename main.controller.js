var express = require("express");
const shortid = require("shortid");
var db = require("./db.js");
module.exports.main =  (req, res) => {
  var cookie = req.cookies.userId
  var user =  db.get('userList').find({id:cookie}).value()
  var transactions = db.get('transactions').find({userId:cookie}).value()
  var trans = []
  
  for(var item of db.get('transactions').value()){
    if(item.userId === user.id){
      trans.push({user:db.get('userList').find({id:item.userId}).value().user,title:db.get('listBook').find({id:item.bookId}).value().title,isComplete:item.isComplete})
    } 
  } 
  if(!trans){
    res.render('index.pug',{list:db.get('listBook').value()})  
  }else{
    res.render('index.pug',{transactions:trans,list:db.get('listBook').value()})    
  }
};