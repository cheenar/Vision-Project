var express = require("express");
var router = express.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://beta.vision.dev%40gmail.com:poopPee123@smtp.gmail.com');

router.get("/", function (req, res) {
    res.render("password");
});

router.post("/", function (req, res) {
    let email = req.body.email;

    global.connection.query(checkForUser(email), function (err, rows, fields) {
        var failed = false;
        if (err) {
            failed = true;
        } else {
            if (rows.length == 0) {
                failed = true;
            } else {
                var mailOptions = {
                    from: '"Vision Account Information 👥" <devteam@gmail.com>', // sender address 
                    to: rows[0].Email, // list of receivers 
                    subject: 'Vision Account Information', // Subject line 
                    text: 'Your Password: ' + rows[0].Password, // plaintext body 
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                    res.render("recovery");
                });
            }
        }
        if (failed) {
            res.send("Unable to find username");
        }
    });
});

let checkForUser = function (email) {
    return "SELECT * FROM `Users` WHERE `Email` = '" + email + "'";
};

module.exports = router;