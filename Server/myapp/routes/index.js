var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.cookies);
  let name = req.cookies.name;
  if (name != null) {
    res.render('index', { welcomeTag: "Welcome, " + name + "." });
  } else {
    res.render('index', { welcomeTag: "Welcome." }); 
  }
});

router.get('/save_database', function(req, res) {
  global.orderDatabase.db.save();
  res.redirect("/");
});

module.exports = router;
