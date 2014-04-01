 
 

var nodemailer = require("nodemailer");
var fs = require("fs");

 

var transport = nodemailer.createTransport("SES", {
     AWSAccessKeyID: "AKIAIHO5CZS6X4UXTEMQ",
    AWSSecretKey: "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",
    //ServiceUrl: "https://email-smtp.us-east-1.amazonaws.com"
});

// all messages sent with *transport* are signed with the following options
transport.useDKIM({
    domainName: "sitecapp.com",
    keySelector: "dkimselector",
    privateKey: fs.readFileSync(__dirname+"/js/fedora.pem")
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <noreply@sitecapp.com>", // sender address
    to: "rudix.lab@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
transport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
 
});