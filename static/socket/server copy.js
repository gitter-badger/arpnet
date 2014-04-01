//require.paths.unshift(__dirname + '/lib');
  
var get = require('get');  
var port =  93;
var io = require('socket.io');
 
 
 
  
var io = require('socket.io').listen(93);
 
  io.set( 'resource', '/socket' );
  io.enable('browser client etag');
  io.set('log level', 1);
  io.setMaxListeners(0);

  io.set('transports', [
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
  ]);
 

 
 
 io.sockets.on('connection', function (socket) {

socket.on('news', function (data,token,chunk) {
  if (data) {
 data.forEach(function(value,index){
 
new get('https://graph.facebook.com/fql?q=' + encodeURIComponent('SELECT src_big, caption from photo where pid in (SELECT pid from photo_tag where subject = ' + value.id + ' order by rand() limit 1)') + '&access_token=' + token + '&format=json').asString(function(err, body2) {
 
  if (!err) {
    var jsonsend = JSON.parse(body2);
//    console.log(jsonsend); 
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
 };
});

  

  socket.on('populate', function (data) {
  
     socket.emit('populate',data);

  });

socket.on('graph', function(method,data,uid) {

require('request').post({
    uri:"https://graph.facebook.com/"+uid+"/"+method+"/",
    headers:{'content-type': 'application/x-www-form-urlencoded'},
    body:require('querystring').stringify(data)
    },function(err,res,body){
        console.log(body);
        console.log(res.statusCode);
});


console.log(data);

 });


  socket.on('login', function (data) {
 
 
   get('https://graph.facebook.com/'+data.uid+'/friends?access_token='+data.token).asString(function(err, body2) { 
     
if (!err) {
    socket.emit('friends',JSON.parse(body2).data);


 };  

    });  
 
    


  });
});


  
 