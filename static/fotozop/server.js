//require.paths.unshift(__dirname + '/lib');
var express = require('express');
var fs = require('fs');
var crypto = require('crypto');
var get = require('get');  
var port = process.env.PORT || process.env.VCAP_APP_PORT ||  89;
var gvar = {};
var bind = require('bind');
var nowjs = require('now');
var io = require('socket.io');
var nano = require('nano')('http://arpecop.com/');
var alice = nano.db.use('photoverse');
var server = require('http'); 
var path = require('path');
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);
  io.set('log level', 1);
  io.set('transports', ['xhr-polling','jsonp-polling']);
app.use(express.static(path.join(__dirname, '/')));
app.use(express.bodyParser()); 
 
 io.sockets.on('connection', function (socket) {

socket.on('news', function (data,token,chunk) {
 data.forEach(function(value,index){
 
new get('https://graph.facebook.com/fql?q=' + encodeURIComponent('SELECT src_big, caption from photo where pid in (SELECT pid from photo_tag where subject = ' + value.id + ' order by rand() limit 1)') + '&access_token=' + token + '&format=json').asString(function(err, body2) {
  if (!err) {
    var jsonsend = JSON.parse(body2);
    console.log(jsonsend); 
    jsonsend.uid = value.id;
    jsonsend.name = value.name; 
     jsonsend.chunk = chunk;
     if (jsonsend.data.length == 1) {
  socket.emit('news', jsonsend);
  };
} else {
  socket.emit('news', 'error'); 
}

});

 })
});

  socket.on('collection', function (data) {

  });





  socket.on('populate', function (data) {
  
     socket.emit('populate',data);

  });

  socket.on('login', function (data) {
 
 
   get('https://graph.facebook.com/'+data.uid+'/friends?access_token='+data.token).asString(function(err, body2) { 
    console.log(err);
if (!err) {
    socket.emit('friends',JSON.parse(body2).data);


 };  

    });  
 
    


  });
});


 app.post('/', function(req, res){
  var json1 = {};
     bind.toFile(__dirname + '/index.html',  json1,    function callback(data) {   res.writeHead(200, {'Content-Type': 'text/html'});  res.end(data);  }); 
});


 app.post('/save', function(req, res){
   res.end('ok')
});
 app.post('/user', function(req, res){
   res.end('ok')
});


app.post('/favorites', function(req, res){
var obj  = {};
obj.id = req.body.id;
obj.img = req.body.img;

    alice.insert(obj, function(err, body, header) {
      if (err) {
        res.end(err.message);
        return;
      }
     
      res.end(JSON.stringify(body));
    });

});

 



 






server.listen(port);