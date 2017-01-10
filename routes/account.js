var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.cookies.name != null && req.cookies.uid != null) {
        var data = null;
        global.connection.query("SELECT * FROM `Users` WHERE `UID` LIKE '" + req.cookies.uid + "'", function (err, rows, fields) {
            if (err) {
                console.log("Error");
                res.send("account", {'accountLoggedIn': false});
            } else {
                data = rows[0];
                if (data != null) {

                    console.log("Data good");
                    let uid = req.cookies.uid;

                    var collection = global.orderDatabase.db.getCollection(uid);

                    if(collection.get(1) == null) res.render("account", {'accountLoggedIn': false});

                    var currentData = collection.get(1).orders;

                    let uoids = [];

                    if (currentData != null) {
                        for (ki in currentData) {
                            if (ki != null) {
                                console.log("UOID:" + currentData[ki]);
                                uoids.push(currentData[ki]);
                            }
                        }
                    }
                    
                    let shippingAddress = data.ShippingAddress;

                    res.render("account", {
                        'accountLoggedIn': true,
                        'firstName': data.FirstName,
                        'lastName': data.LastName,
                        "phoneNumber": data.PhoneNumber,
                        "saAddress": shippingAddress.split(":")[0],
                        saCity: shippingAddress.split(":")[1],
                        saState: shippingAddress.split(":")[2],
                        saZip: shippingAddress.split(":")[3],
                        "billingAddress": data.BillingAddress,
                        "emailAddress": data.Email,
                        "password": data.Password,
                        "uoids": uoids,
                    });
                } else {
                    console.log("Data null");
                    res.render("account", {'accountLoggedIn': false});
                }
            }
        });
    } else {
        res.render("account", {'accountLoggedIn': false});
    }
});

router.post("/modify", function (req, res) {
    let shipping = req.body["sa.shipping1"];
    let city = req.body["sa.city"];
    let state = req.body["sa.state"];
    let zip = req.body["sa.zip"];

    let shippingAddressStr = shipping + ":" + city + ":" + state + ":" + zip;

    let query = modifyAccount(req.cookies.uid, req.body.firstName, req.body.lastName, req.body.phoneNumber, shippingAddressStr, req.body.billingAddress, req.body.emailAddress, req.body.password);

    console.log(query);
    global.connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log("Err:\n" + err);
        } else {
            res.cookie("name", req.body.firstName);
            res.redirect("/account");
        }
    });
})

function modifyAccount(uid, firstName, lastName, number, addressS, addressB, email, password) {
    return "UPDATE `Users` SET `FirstName`='" + firstName + "',`LastName`='" + lastName + "',`Email`='" + email + "',`PhoneNumber`='" + number + "',`BillingAddress`='" + addressB + "',`ShippingAddress`='" + addressS + "',`Password`='" + password + "' WHERE `UID`='" + uid + "'"
}

module.exports = router;