var restify = require('restify');
var Clay = require('clay-encryption');
var Chimera = require('chimera').Chimera;
var fs = require('fs');
var thumb = require('node-thumbnail').thumb;
var ipn = require('paypal-ipn');
var bind = require('bind');
var crypto = require('crypto');
var nano = require('nano')('http://arpecop.com/');
var alice = nano.db.use('alice');
var express = require('express');
var hashlib = require('hashlib');
var app = express();

 

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
app.use(express.bodyParser());


app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'katokotka' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

 
passport.use(new FacebookStrategy({
    clientID: '142999342545859',
    clientSecret: '5b8f2b72134d203bd1b6139cdb5e2e12',
    callbackURL: "http://api.sitecapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile,done) {
 
  if (profile.username) {
        done(null, profile);
        
      } else {
	      
	   return done(null, JSON.stringify({ user: 'incorrect' }));
      }
 
 
 }
 
    
    
));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/admin',
                                      failureRedirect: '/auth/facebook' }));
                                      
                                      
 app.all('/admin', function(req, res) { 
 res.writeHead(200, {'Content-Type': 'text/html'}); 
 
 if(req.user) {
 var obj = req.user;
 
 
 obj.api_secret = crypto.createHash('md5').update(req.user.username+'zx').digest("hex").substr(0,8);
 var obj1 = {};
 obj1._id = req.user.username;
 obj1.api_secret = obj.api_secret;
 obj1.email =  req.user.emails[0].value;
 
  alice.insert(obj1, obj1._id, function(err, body, header) {


  });
 
	  bind.toFile(__dirname+"/admin.html", obj,
            function callback(data) { 
            res.end(data);
             });
	  
 } else {
	 res.end('Session Expired Please <a href="http://api.sitecapp.com/auth/facebook">Login</a>');
 }
 
 
 });                                     
 

 
 
app.all('/login', function(req, res) { 
res.header('Access-Control-Allow-Origin', 'http://sitecapp.com');
res.writeHead(200, {'Content-Type': 'text/json'}); 
console.log(req.body);
var obj = req.body;
var obj1 = {};
obj._id = req.body.username;
obj.api_secret = crypto.createHash('md5').update(req.body.username+'zx').digest("hex").substr(0,8);

 alice.insert(obj, obj._id, function(err, body, header) {


  });

 obj1.api_key = req.body.username;
 obj1.api_secret = obj.api_secret;
 obj1.url = obj.url;
 obj1.secret = crypto.createHash('md5').update(obj.url+''+obj1.api_secret).digest("hex");
res.end(JSON.stringify(obj1));

});
 

app.get('/:user/:secret/', function(req, res) {
var url = req.query["capture"];
console.log(req.query["capture"]);
 var api_key = req.params.user;
 
alice.get(api_key, function(err, body) {
  if (!err) {
 
   var hash = crypto.createHash('md5').update(url+''+body.api_secret).digest("hex");

 
 
  if(hash == req.params.secret) {
var hash_capture = crypto.createHash('md5').update(url).digest("hex");
var file = '/vol/'+hash_capture+'.png';

fs.exists(file, function(exists) {
  if (exists) {
   
    res.sendfile(file);
  } else {
    // mongodb

 var c = new Chimera();
c.perform({
  url: url,
  run: function(callback) {
 
        callback(null, "success!");
 
  },
  callback: function(err, result) {
    console.log('capture screen shot');
    
    c.capture(file);
    
   
    res.sendfile(file);
    
    c.close();
  }
});
  }
});
 

 
  } else {
 
	  res.send({invalid:'true',hello: req.params[0],hash: hash,expected:''});
  }
  
      }
});
 
});


//

 app.all('/payment',function(req,res){
 
	 ipn.verify(req.body, function callback(err, msg) {
 
  if (err) {
    console.error(msg);
  
  } else {
     console.error(msg);
  }
});
	 res.end()
 })
 
 
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
 


app.listen(94);
