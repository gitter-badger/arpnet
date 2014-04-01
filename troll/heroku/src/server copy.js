var port = process.env.PORT || 80;
var fs = require('fs');
var express   = require('express');
var Facebook = require('facebook-node-sdk');
var gvar = { 
    test : "emperor"
};
var app = express.createServer();
	app.configure(function () {
	app.set("view engine", "html");
	app.register(".html", require("jqtpl").express);
	app.set('view options', {layout: false});
	  app.use(express.bodyParser());
	  app.use(express.cookieParser());
	  app.use(express.session({ secret: 'foo barx' }));
	  app.use(Facebook.middleware({ appId: '225893114160771', secret: '8350e113aa9d66805a346b7d33a78d33' }));
	 	app.use("/src", express.static(__dirname + '/src'));
	});
 
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
	
	
	app.get('/', function(req, res){
		gvar.host = req.headers.host;
	res.render(__dirname + '/welcome.html', {
   gvar: gvar
   });
 
	});
	
	app.get('/chat', function(req, res){
		 gvar.name = req.param('name', null);
		 
	  res.render(__dirname + '/index.html',{
	   gvar: gvar
	   });
	});

 ///
function findMatchingWords(t, s) {
    var re = new RegExp("\\w*"+s+"\\w*", "g");
    return t.match(re);
}
function checkthis(message) {    
 var myCars=["accepted","close-enough","gusta","okay","trombone","enough","poker","y u","alone","fap","problem","angry","fuck yeah","lol","rage","challenge","fuu","megusta","troll"];  
    for (i=0;i<=myCars.length -1;i++)
{
var curmatch = findMatchingWords(message, myCars[i]);
    if(curmatch) {
    return myCars[i];
        break;
    }
}
}
app.get('/trollit', function(req, res){
gvar.message = req.param('message', null);

var getword = checkthis(gvar.message.toLowerCase());
console.log(getword);
res.writeHead(200, {'Content-Type':'text/html'}); 
    res.write(''+getword+'');  
    res.end();

});
///






var nowjs = require("now");
var everyone = nowjs.initialize(app, {socketio: {transports:['websocket']}});
 

console.log(everyone);

nowjs.on('connect', function(){
  this.now.room = "trollchat";
  nowjs.getGroup(this.now.room).addUser(this.user.clientId);
  console.log("Joined: " + this.now.name);
});


nowjs.on('disconnect', function(){
  console.log("Left: " + this.now.name);
});

everyone.now.changeRoom = function(newRoom){
  nowjs.getGroup(this.now.room).removeUser(this.user.clientId);
  nowjs.getGroup(newRoom).addUser(this.user.clientId);
  this.now.room = newRoom;
  this.now.receiveMessage("SERVER", "You're now in " + this.now.room);
}

everyone.now.distributeMessage = function(message){
  nowjs.getGroup(this.now.room).now.receiveMessage(this.now.name, message,this.now.id);
};
