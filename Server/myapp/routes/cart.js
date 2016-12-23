var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    var collection = global.orderDatabase.db.getCollection("9HhnfNuQ9uSLPxuX");
    var currentData = collection.get(1).cart;

    console.log(currentData);

    res.render("cart", {orders: currentData} );
});

router.get("/remove", function(req, res) {
    
    //req.query.uoid

    var collection = global.orderDatabase.db.getCollection(req.cookies.uid);
    var currentData = collection.get(1).cart;

    var index = -1;

    if(currentData != null) {
        for(key in currentData) {
            if(currentData[key].uoid == req.query.uoid) {
                index = key;
            }
        }
    }

    if(index != -1) {
        currentData.splice(index, 1);
    }

    res.redirect('back');
});

module.exports = router;