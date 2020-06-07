var express = require('express')
var db = require('./db.js')
const shortid = require("shortid");

var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}

module.exports.validate = (req, res,next) => {
  var errors =[];
  if(req.body.user.split("").length > 30){
    errors.push("name user too long")
  }
  if(!req.body.user){
    errors.push('Name is required')  
  }
  if(!req.body.phone){
    errors.push('Phone is required')  
  }
  if(!req.body.email){
    errors.push('Email is required')  
  }
  if(db.get('userList').find({email:req.body.email}).value()){
    errors.push('Email already exsit')
  }
  if(!req.body.password){
    errors.push('Password is required')  
  }
  if(errors.length){
    res.render("createUser.pug",{
      errors: errors,
      values: req.body
    })
    return
  }  
  next()
}