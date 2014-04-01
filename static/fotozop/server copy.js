//require.paths.unshift(__dirname + '/lib');
var express = require('express');
var fs = require('fs');
var crypto = require('crypto');
var jqtpl = require("jqtpl");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var uuid = require('node-uuid');
var get = require('get');
var port = process.env.PORT || 80;
var socket_id = uuid();
var gvar = {};
var bind = require('bind');
var nowjs = require('now');

var app = express();
app.use("/", express.static(__dirname + '/'));
app.use(express.bodyParser());
server.listen(port);

 var everyone = nowjs.initialize(server);

everyone.now.logStuff = function(msg){
    console.log(msg);
}
 
 
 
 
 
io.sockets.on('connection', function(client){ 

   
    client.send("hello world");
      
   
    
    client.on('first', function(tokenz){ 
    console.log(tokenz);
    var gvar = {};
	payload = tokenz.split('.');
	var sig = payload[0];
	var data = JSON.parse(new Buffer(payload[1], 'base64').toString());
	var expected_sig = crypto.createHmac('sha256', 'dd7d5ac0322cf7c40ca492b46bcc568d');
	expected_sig.update(payload[1]);
	expected_sig = expected_sig.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
 
	gvar.uid = data.user_id;
 
	gvar.token = data.oauth_token;
	gvar.token = 'AAACEdEose0cBAL1XX4evE5L5GN6XN9X2om4IaoXQgK5Sv2Ay1GFgCImMVZCZAxtcBv5Nm9cQR8CbUrBs9DaTgYPRjYOq7zxBD6IzisYwZDZD';
	//get_user_photos(gvar.uid, 'my photo', unique, gvar.token);
	console.log('https://graph.facebook.com/'+data.user_id+'/friends?access_token='+data.oauth_token+'');
	get('https://graph.facebook.com/'+data.user_id+'/friends?access_token='+data.oauth_token+'').asString(function(err, body2) {
	 console.log(err);
		if (!err) {
    			 

				 
					client.send('first',body2);
			  
		}
	});

    	
     });
 
    client.on('disconnect', function(){ console.log("Client has disconnected"); }) ;
}); 
 
 
 




function parseSignedRequest(payload_string, unique) {
	}

function get_user_photos(get_id, name, uid, token) {
	get('https://api.facebook.com/method/fql.query?query=' + encodeURIComponent('SELECT src_big, caption from photo where pid in (SELECT pid from photo_tag where subject = ' + get_id + ' order by rand() limit 1)') + '&access_token=' + token + '&format=json').asString(function(err, body2) {
	 
		if (!err) {
		
		
 
		 		 
		 	io.sockets.on('connection', function(socket) { 
					socket.send(JSON.stringify(body2));
					});
	 
	 
		};
	});
};
//
app.all('/share', function(request, response) {
	gvar.socket = socket_id;
	gvar.id = request.param('id', null);
	response.render(__dirname + '/views/share.html', {
		gvar: gvar
	});
});




app.all('/', function(req, res) {
	var gvar = {};
	var unique = uuid.v1();
	gvar.unique = unique;
	var signed = req.body.signed_request;
	if (!signed) {
		var signed = 'lnVFQVbjEVzGQ59cIpugtZlAfs5hMeiwRstyGy0KWWM.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzNTA1ODY4MDAsImlzc3VlZF9hdCI6MTM1MDU4MDcyNCwib2F1dGhfdG9rZW4iOiJBQUFHQVpCRHh5RVdRQkFDelFET3BhNFExOE1ua2I3WkI3cWo0OHIxZkI5cXVxUlRZWkJIYkZJTlZrYUNReVhKTzZaQXdubVNGUGY3ZGI2c1NWNlRodGFXOHVFaUkzVG94bFRLSms3bWxtd1pEWkQiLCJ1c2VyIjp7ImNvdW50cnkiOiJiZyIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjU3MjM4MzM3OSJ9';
	};
	gvar.signed = signed;
	parseSignedRequest(signed, unique);
	bind.toFile(__dirname + '/indexa.html', gvar, function callback(data) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end(data);
	});
});
app.get('/dl', function(request, response) {
	gvar.dlimg = randomFromTo(0, 100);
	gvar.img = request.param('img', null);
	var dl = new get(gvar.img);
	dl.toDisk(__dirname + '/views/public/download/' + gvar.dlimg + '.jpg', function(err, filename) {
		console.log(err);
		response.render(__dirname + '/views/zazzle.html', {
			gvar: gvar
		});
	});
});

app.get('/dl1', function(request, response) {
	gvar.dlimg = randomFromTo(0, 100);
	gvar.img = request.param('img', null);
	var dl = new get(gvar.img);
	dl.toDisk(__dirname + '/views/public/download/' + gvar.dlimg + '.jpg', function(err, filename) {
		console.log(err);
		response.render(__dirname + '/views/download.html', {
			gvar: gvar
		});
	});
});