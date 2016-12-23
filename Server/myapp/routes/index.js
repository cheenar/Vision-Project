var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.cookies);
  let name = req.cookies.name;
  if (name != null && name != "") {
    res.render('index', { welcomeTag: "Welcome, " + name + "." });
  } else {
    res.render('index', { welcomeTag: "" }); 
  }
});

router.get("/order", function(req, res) {
  res.render("order", {});
});

router.get("/logout", function(req, res) {
  res.cookie("uid", "");
  res.cookie("name", "");
  res.redirect('back');
});

router.get('/save_database', function(req, res) {
  global.orderDatabase.db.save();
  res.redirect("/");
});

module.exports = router;
