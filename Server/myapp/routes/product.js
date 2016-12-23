var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("product", { purchased: false });
});

router.post("/", function (req, res) {
    var collection = global.orderDatabase.db.getCollection(req.cookies.uid);

    var purchasedProduct = false;
    var failure = false;

    let query = "SELECT * FROM `Users` WHERE `UID` = '" + req.cookies.uid + "'";
    global.connection.query(query, function (err, rows, fields) {

        if (rows[0] != null) {
            if (collection == null) {
                global.orderDatabase.initializeUser(req.cookies.uid);
                collection = global.orderDatabase.db.getCollection(req.cookies.uid);
            }
        }
        else {
            //uid doesn't exist
            alert("Account information invalid, please contact administrator");
            failure = true;
        }

        if (!failure) {
            var currentData = collection.get(1).cart;

            //res.body.push({"uoid": "poop"});
            //currentData.push();
            
            req.body.uoid = global.makeID(16);
            req.body.quantity = 1;
            
            currentData.push(req.body);

            res.render('product', {purchased: true});
        }
        else {
            res.render('product', { purchased: false });
        }
    });
});

module.exports = router;