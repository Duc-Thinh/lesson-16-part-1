var express = require('express')
const shortid = require("shortid");
var db = require('./db.js')
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}



module.exports.default = (request, response) => {
  response.render("create.pug");
}
module.exports.checkBook = (req, res, next) => {
  var errors =[];
  if(req.body.title.split("").length > 30){
    errors.push("name book too long")
  }
  if(!req.body.title){
    errors.push('Title is required')  
  }
  if(!req.body.des){
    errors.push('Description is required')  
  }
  if(errors.length){
    res.render("create.pug",{
      errors: errors,
      values: req.body
    })
    return
  }  
  next()  
}
module.exports.defaultBook = (request, response) => {
  request.body.id = shortid.generate();
  db.get("listBook")
    .push(request.body)
    .write();
  response.render("index.pug",connect)
  response.redirect('/main')
}
module.exports.search = (request, response) => {
  var q = request.query.q;
  if (q) {
    var itemFilter = db.get("listBook").value().filter(function(item) {
      if (item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
        return item;
      }
    });
  } else {
    itemFilter = db.get("listBook").value();;
  }
  var cookie = request.cookies.userId
  var user =  db.get('userList').find({id:cookie}).value()
  var transactions = db.get('transactions').find({userId:cookie}).value()
  var trans = []
  trans.push({user:user.user,title:db.get('listBook').find({id:transactions.bookId}).value().title,isComplete: transactions.isComplete})
  response.render("index.pug", { listBook: itemFilter, q: q, lists:db.get("userList").value(),list:db.get("listBook").value(),transactions:trans});
}
module.exports.changeBook = (req,res)=>{
  var id= req.params.id; 
  var findBook = db.get("listBook").find({id:id}).value()
  res.render("changeBook", {book: findBook})
}
module.exports.updateBook = (req,res)=>{
  var id = req.params.id;
  var newTitle = req.body.title;
  var newDes= req.body.des;
  db.get('listBook')
  .find({id: id})
  .assign({ title: newTitle, des: newDes})
  .value()
  res.render("index.pug",connect); 
}

module.exports.deleteBook = (request, response) => {
  var id = request.params.id;
  db.get("listBook")
    .remove({ id: id })
    .write();
  response.render("index.pug",connect)
}