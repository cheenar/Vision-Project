var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('login', {});
});

router.post("/", function (req, res) {
  let username = req.body.email;
  let password = req.body.password;

  global.connection.query(loginAttempt(username, password), function (err, rows, fields) {
    var failed = false;
    if (err) {
      failed = true;
    } else {
      if (rows.length == 0) {
        failed = true;
      } else {
        res.cookie('uid', rows[0].UID);
        res.cookie('name', rows[0].Name);
        res.redirect("/");
      }
    }
    if (failed) {
      res.send("Username or Password Incorrect"); //#TODO - ADD A FAILED USER PAGE
    }
  });
});

let loginAttempt = function (email, password) {
  return "SELECT * FROM `Users` WHERE `Email` = '" + email + "' AND `Password` = '" + password + "'";
};

module.exports = router;
