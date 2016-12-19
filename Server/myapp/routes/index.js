var express = require('express');
var router = express.Router();

function lengthOfJson(input) {
  var count = 0;
  for (var kreme in input) {
    count++;
  }
  return count;
}

router.get('/', function (req, res, next) {
  console.log(req.cookies);
  let name = req.cookies.name;
  if (name != null) {
    res.render('index', { customer_name: "Welcome, " + name });
  } else {
    res.render('index', { customer_name: "" }); 
  }
});

module.exports = router;
