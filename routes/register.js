var express = require("express");
var router = express.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://beta.vision.dev%40gmail.com:poopPee123@smtp.gmail.com');

router.get("/", function(req, res, next) {
    res.render('register', {});
});

router.post("/", function(req, res, next) {
    //INSERT INTO `Vision`.`Users` (`Name`, `UID`, `Email`, `Password`) VALUES ('TE', 'test', 'test', 'test');
    
    let pass = global.makeID(16);
    let uid = global.makeID(16);

    let shipping = req.body["sa.shipping1"];
    let city = req.body["sa.city"];
    let state = req.body["sa.state"];
    let zip = req.body["sa.zip"];

    let shippingAddressStr = shipping + ":" + city + ":" + state + ":" + zip;
    
    
    global.connection.query(global.mysql_util.insertData('Users', {
        'FirstName': req.body.firstName,
        'LastName': req.body.lastName,
        'PhoneNumber': req.body.phone_number,
        'Email': req.body.email_address,
        'BillingAddress': req.body["sa.shipping2"],
        'ShippingAddress': shippingAddressStr,
        'UID': uid,
        'Password': pass
    }));

    //create order database manager
    global.orderDatabase.initializeUser(uid); 

    //mailer 

    var mailOptions = {
        from: '"Vision Account Information 👥" <devteam@gmail.com>', // sender address 
        to: req.body.email_address, // list of receivers 
        subject: 'Vision Account Information', // Subject line 
        text: 'Your Password: ' + pass, // plaintext body 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.redirect('/email');
});

module.exports = router;