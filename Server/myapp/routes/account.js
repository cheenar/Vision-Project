var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.cookies.name != null && req.cookies.uid != null) {
    var data = null;
    global.connection.query("SELECT * FROM `Users` WHERE `UID` LIKE '" + req.cookies.uid + "'", function (err, rows, fields) {
      if(err) {
        console.log("Error");
        res.send("account", { 'accountLoggedIn': false });
      } else {
        data = rows[0];
        if(data != null) {

        console.log("Data good");
        let uid = req.cookies.uid;

        var collection = global.orderDatabase.db.getCollection(uid);
        var currentData = collection.get(1).orders;

        let uoids = [];

        if(currentData != null) {
          for(ki in currentData) {
            if(ki != null) {
              console.log("UOID:" + currentData[ki].uoid);
              uoids.push(currentData[ki]);
            }
          }
        }

          res.render("account", {
            'accountLoggedIn': true,
            'name': req.cookies.name,
            "fullName": data.Name,
            "phoneNumber": data.PhoneNumber,
            "shippingAddress": data.ShippingAddress,
            "billingAddress": data.BillingAddress,
            "emailAddress": data.Email,
            "uoids": uoids,
          });
        } else {
          console.log("Data null");
          res.render("account", { 'accountLoggedIn': false});
        }
      }
    });
  } else {
    res.render("account", { 'accountLoggedIn': false});
  }
});

router.post("/modify", function(req, res) {
  let query = modifyAccount(req.cookies.uid, req.body.fullName, req.body.phoneNumber, req.body.shippingAddress, req.body.billingAddress, req.body.emailAddress);
  
  console.log(query);
  global.connection.query(query, function(err, rows, fields) {
    if(err) {
      console.log("Err:\n" + err);
    } else {
      res.cookie("name", req.body.fullName);
      res.redirect("/account"); 
    }
  });
})

function modifyAccount(uid, name, number, addressS, addressB, email) {
  return "UPDATE `Users` SET `Name`='" + name +  "',`Email`='" + email + "',`PhoneNumber`='" + number + "',`BillingAddress`='" + addressB + "',`ShippingAddress`='" + addressS + "' WHERE `UID`='" + uid + "'"
}

module.exports = router;