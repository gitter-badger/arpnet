var Chimera = require('chimera').Chimera;

 

var c = new Chimera();
c.perform({
  url: "http://www.google.com",
  run: function(callback) {
 
        callback(null, "success!");
 
  },
  callback: function(err, result) {
    console.log('capture screen shot');
    c.capture("logged_in.png");
    c.close();
  }
});