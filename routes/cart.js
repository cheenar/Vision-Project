var express = require("express");
var router = express.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://beta.vision.dev%40gmail.com:poopPee123@smtp.gmail.com');

router.get("/", function (req, res) {
    var collection = global.orderDatabase.db.getCollection(req.cookies.uid);
    if (collection != null) {
        var currentData = collection.get(1).cart;

        if (currentData != null) {
            console.log(currentData);
            res.render("cart", { orders: currentData });
        } else {
            res.render("cart", { orders: [] });
        }
    } else {
        res.render("cart", { orders: [] });
    }
});

router.get("/remove", function (req, res) {

    //req.query.uoid

    var collection = global.orderDatabase.db.getCollection(req.cookies.uid);
    var currentData = collection.get(1).cart;

    var index = -1;

    if (currentData != null) {
        for (key in currentData) {
            if (currentData[key].uoid == req.query.uoid) {
                index = key;
            }
        }
    }

    if (index != -1) {
        currentData.splice(index, 1);
    }

    res.redirect('back');

    global.orderDatabase.db.save();
});

router.post("/submit_order", function (req, res) {
    var collection = global.orderDatabase.db.getCollection(req.cookies.uid);
    var currentData = collection.get(1).cart;
    var currentOrders = collection.get(1).orders;

    var uoid = req.body.uoid;

    var index = -1;

    if (currentData != null) {
        for (ki in currentData) {
            if (currentData[ki].uoid == uoid) {
                console.log(index);
                index = ki;
            }
        }
    } else {
        console.log("Current Data null");
    }

    if (index != -1) {
        var data = currentData[index];
        data.completed = false;

        currentOrders.push(data);

        //console.log(currentData[index]);

        var XLSX = require('xlsx');
        var workbook = XLSX.readFile('./base.xlsx');
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        worksheet['D6'].v = data.Width
        worksheet['D7'].v = data.Height;
        worksheet['D8'].v = data.Depth;
        worksheet['D9'].v = data["Finish Sides"];
        worksheet['D5'].v = data["quantity"]
        worksheet['D10'].v = data.Material;
        worksheet['D11'].v = data["Hinge Sides"];
        worksheet['D12'].v = data["Hinge Type"];
        worksheet['D13'].v = data["Glide Type"];
        worksheet['D14'].v = data["Drawer Box"];
        worksheet['D15'].v = data["Door Style"];
        worksheet['D16'].v = data["Finish Material"];
        worksheet['D17'].v = data["Glaze"];
        worksheet['D18'].v = data["Interior Color"];
        worksheet['D19'].v = data["Rollouts"];

        //console.log(worksheet);

        let orderName = uoid;
        let orderTitle = "./orders/" + orderName + ".xlsx";
        XLSX.writeFile(workbook, orderTitle);

        var mailOptions = {
            from: '"Order Placer 👥" <dev.vision.beta@gmail.com>', // sender address 
            to: "beta.vision.dev@gmail.com", // list of receivers 
            subject: 'Order Placed: ' + uoid, // Subject line 
            text: 'Order ' + uoid + " has been placed. Cost: " + data["Price"], // plaintext body
            attachments: [
                { path: orderTitle }
            ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        let query = "SELECT * FROM `Users` WHERE `UID` = '" + req.cookies.uid + "'";
        global.connection.query(query, function (err, rows, fields) {

            if (rows[0] != null) {
                var customerMail = {
                    from: '"Order Placer 👥" <dev.vision.beta@gmail.com>', // sender address 
                    to: rows[0].Email, // list of receivers 
                    subject: 'Order Placed: ' + uoid, // Subject line 
                    text: 'Order ' + uoid + " has been placed. Cost: " + data["Price"], // plaintext body
                    attachments: [
                        { path: orderTitle }
                    ],
                };
                transporter.sendMail(customerMail, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            }
        });

        currentData.splice(0, currentData.length);

        res.redirect('/order');
        //res.send(req.body);
    }

    global.orderDatabase.db.save();
});

module.exports = router;