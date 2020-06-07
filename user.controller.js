var express = require("express");
const shortid = require("shortid");
var db = require("./db.js");
var connect = {
  lists: db.get("userList").value(),
  list: db.get("listBook").value()
};
var lists = db.get("userList").value();

module.exports.changeUser = function(request, response) {
  var id = request.params.id;
  var findUser = db
    .get("userList")
    .find({ id: id })
    .value();
  response.render("changeUser.pug", { user: findUser });
};
module.exports.deleteUser = (request, response) => {
  var id = request.params.id;
  db.get("userList")
    .remove({ id: id })
    .write();
  response.render("index.pug", connect);
};
module.exports.user = (req,res)=>{
  res.render("createUser.pug")
}
var md5 = require('md5');
module.exports.createUser = (req, res) => {
  req.body.id = shortid.generate();
  db.get("userList")
    .push({user:req.body.user,
           phone:req.body.phone,
           email:req.body.email,
           password:md5(req.body.password),
           id:req.body.id
          })
    .write();
  res.redirect('/auth/login')
};
module.exports.updateUser = (req, res) => {
  var id = req.params.id;
  var newUser = req.body.user;
  db.get("userList")
    .find({ id: id })
    .assign({ user: newUser })
    .value();
  res.render("index.pug", connect);
};
