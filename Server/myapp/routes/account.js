var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.cookies.name != null && req.cookies.uid != null) {
    var data = null;
    global.connection.query("SELECT * FROM `Users` WHERE `UID` LIKE '" + req.cookies.uid + "'", function (err, rows, fields) {
      data = rows[0];
      res.render("account", {
        'accountLoggedIn': "true",
        'name': req.cookies.name,
        "fullName": data.Name,
        "phoneNumber": data.PhoneNumber,
        "shippingAddress": data.ShippingAddress,
        "billingAddress": data.BillingAddress,
        "emailAddress": data.Email
      });
    });
  }
  else {
    res.render("account", { 'accountLoggedIn': "false" });
  }
});

router.post("/modify", function(req, res) {
  let query = modifyAccount(req.cookies.uid, req.body.fullName, req.body.phoneNumber, req.body.shippingAddress, req.body.billingAddress, req.body.emailAddress);
  console.log(query);
  global.connection.query(query, function(err, rows, fields) {
    if(err) {
      console.log("Err:\n" + err);
    }
  });
  res.redirect("/account");
})

function modifyAccount(uid, name, number, addressS, addressB, email) {
  return "UPDATE `Users` SET `Name`='" + name +  "',`Email`='" + email + "',`PhoneNumber`='" + number + "',`BillingAddress`='" + addressB + "',`ShippingAddress`='" + addressS + "' WHERE `UID`='" + uid + "'"
}

module.exports = router;