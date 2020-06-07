var express = require("express");
var db = require("./db.js");
var connect = {
  lists: db.get("userList").value(),
  list: db.get("listBook").value()
};
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())

module.exports.login = (req,res)=>{
  res.render('login.pug')    
}
module.exports.postLogin =  (req,res)=>{
  var email = req.body.email
  var password = req.body.password
  var user = db.get('userList').find({email: email}).value()
  if(!user){
    res.render('login.pug',{errors: ['User does not exist'],values: req.body})
  return
  }
  var md5 = require('md5');
  var hashedPassword = md5(password)
  if(user.password !== hashedPassword){
    res.render('login.pug',{errors: ['wrong password'],values: req.body})
  return 
  }
  res.cookie('userId', user.id)
  if(user.isAdmin === true){
    res.redirect('/admin')   
  }else{
    res.redirect('/main')  
  }
}