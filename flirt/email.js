//swaks -f noreply@flirtbot.net -t rudix.lab@gmail.com -s flirtbot.net   -p 25 -au noreply@flirtbot.net -ap mailz

 
var email   = require("emailjs");
var server1  = email.server.connect({
   user:    "noreply", 
   password:"mailz", 
   host:    "flirtbot.net"

});

 


// send the message and get a callback with an error or details of the message that was sent
var message = {
   text:    "i hope this works", 
      from:      "Flirtbot <root@flirtbot.net>",
   to:      "arpecop@facebook.com",
   subject: "енлардж юр пинъс",
   attachment: 
   [
      {data:"test", alternative:true}
   ]
};

// send the message and get a callback with an error or details of the message that was sent
server1.send(message, function(err, message) { console.log(err || message); });
 