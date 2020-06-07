const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const app = express();
app.set("views engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./db.js')
app.get('/',(req,res)=>{
  res.render('home.pug')
})
app.get('/clearCookie',(req,res)=>{
  res.clearCookie('userId');
  res.redirect('/auth/login')
})
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var main = require('./main.route.js')
app.use("/main", main)
var admin = require('./admin.route.js')
app.use("/admin", admin)
var userRoute = require('./user.route.js')
app.use("/users/deleteUser/:id", userRoute)
app.use("/users", userRoute)
app.use("/users/createUser", userRoute)
app.use("/users/changeUser/:id", userRoute)
app.use("/users/changeUser/update/:id", userRoute)
app.use("/users/phone", userRoute)
var bookRoute = require('./book.route.js')
app.use("/books", bookRoute)
app.use("/books/create", bookRoute)
app.use("/books/changeBook/:id", bookRoute)
app.use("/books/updateBook/:id", bookRoute)
app.use("/books/deleteBook/:id", bookRoute)
app.use("/books/searchBook", bookRoute)
var transRoute = require('./transactions.route.js')
app.use("/transactions", transRoute)
app.use("/transactions/create", transRoute)
app.use("/transactions/:id/complete", transRoute)
var authRoute = require('./auth.route.js')
app.use("/auth", authRoute)
app.use(express.static('./views'))
//listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
