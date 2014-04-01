var Browser = require("zombie");
var assert = require("assert");
var when = require("promise").when;

// Load the page from localhost
browser = new Browser()
browser.visit("https://pinterest.com/login/?next=%2F").
 
  then(function() {
  fill("email", "rudix.lab@gmail.com").fill("password", "maximus").
    pressButton("Login", function(test) {
    console.log(test);
 
   

    })


  });

 