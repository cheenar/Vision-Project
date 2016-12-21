var express = require('express');
var router = express.Router();

function lengthOfJson(input) {
  var count = 0;
  for (var key in input) {
    count++;
  }
  return count;
}

router.get('/', function (req, res, next) {
  console.log(req.cookies);
  let name = req.cookies.name;
  if (name != null) {
    res.render('index', { welcomeTag: "Welcome, " + name + "." });
  } else {
    res.render('index', { welcomeTag: "Welcome." }); 
  }
});

router.get("/account", function(req, res, next) {
  if(req.cookies.name != null) {
    res.render("account", { 'accountLoggedIn':"true", 'name':req.cookies.name });
  }
  else {
    res.render("account", { 'accountLoggedIn':"false" } );
  }
})

module.exports = router;
