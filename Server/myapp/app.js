var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require("./routes/index");
var login = require('./routes/login');
var users = require('./routes/users');
var register = require('./routes/register');
var email = require("./routes/email");
var custom = require("./routes/custom");
var base = require("./routes/base");
var password = require("./routes/password");
var product = require("./routes/product");
var information = require("./routes/information");
var cart = require("./routes/cart");
var account = require("./routes/account");

console.log(account);

var app = express();

/* 
  Testing
 */

global.orderDatabase = require("./orders.js");
global.orderDatabase.initializeDatabase();

global.orderDatabase.initializeUser("9HhnfNuQ9uSLPxuX");

var collection = global.orderDatabase.db.getCollection("9HhnfNuQ9uSLPxuX");
var currentData = collection.get(1).orders;
currentData.push({"name":"penis", "uoid":13292 });
currentData.push({"name":"bailey", "uoid":56463 });
console.log(collection.get(1).orders);

var id = 0;

for(var key in currentData) {
  if(currentData[key].uoid == "56463") {
    break;
  }
  id++;
}

currentData.splice(id, 1);

console.log(collection.get(1).orders);



//End Testing


//Start Globals
global.mysql_util = require('./utils/mysql_util');
global.mysql = require('mysql');

global.connection = mysql.createConnection({
	host: "localhost",
	user: "cheenar",
	password: "poop123",
	database: "Vision"
});

global.lengthOfJson = function lengthOfJson(input) {
  var count = 0;
  for (var key in input) {
    count++;
  }
  return count;
};

global.makeID = function makeid(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

global.connection.connect();
//End Globals

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use('/login', login);
app.use('/email', email);
app.use('/users', users);
app.use('/register', register);
app.use("/custom", custom);
app.use("/base", base);
app.use('/password', password);
app.use('/product', product);
app.use("/information", information);
app.use("/cart", cart);
app.use("/account", account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
