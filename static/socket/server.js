var express = require('express');
var FormData = require('form-data'); //Pretty multipart form maker.
var https = require('https'); //Https module of Node.js
var levelup = require('levelup');
var db = levelup('./mydb')
var request = require('request');

var port = process.env.PORT || 93;

var fs = require('fs');
var get = require('get');
var crypto = require('crypto');
var bind = require('bind');
var poster = require('poster');
var gvar = {  
    test : "emperor"
}; 
  var Canvas = require('canvas'),
  fs = require('fs'),
  Image = Canvas.Image;





   function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
 
 
 	var app = express();
  app.use(express.bodyParser());
 
 
 
 

 



app.all('/',function(req,res){
 var text = req.query['text'];
var w = req.query['w'];
var h = req.query['h'];
      if (!text && !w && !h) {
	w = 200
	h = 200
        text = 'живота е сцена а ние са ебем на нея като магарета';
      };

  var canvas = new Canvas(200,200)
  , context = canvas.getContext('2d');
	res.header('Content-Type', 'image/png');
 var randnum =Math.floor(Math.random()*89);
var maxWidth = 200;
      var lineHeight = 22;
      var x = (canvas.width - maxWidth) / 2;
      var y = 60;
      var text = req.query['text'];
      if (!text) {
        text = 'живота е сцена а ние са ебем на нея като магарета';
      };

     
      context.font = '14.9pt 274C19_0_0';
      context.fillStyle = '#333';

    var base64Data = canvas.toDataURL(wrapText(context, text, x, y, maxWidth, lineHeight)).replace(/^data:image\/png;base64,/,"");

require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
 res.sendfile(__dirname + '/out.png');
});
});



function uploadimage(file,token) {
var ACCESS_TOKEN = token;
request.post('https://graph.facebook.com/me/albums', {form:{message:'http://domain.com/',name:"some name",access_token: ACCESS_TOKEN}},function(err,data){
console.log(JSON.parse(data.body).id);
var form = new FormData(); //Create multipart form
form.append('file', fs.createReadStream(file)); //Put file
//form.append('message', "Gaitooo"); //Put message
 
//POST request options, notice 'path' has access_token parameter
var options = {
    method: 'post',
    host: 'graph.facebook.com',
    path: '/'+JSON.parse(data.body).id+'/photos?access_token='+ACCESS_TOKEN,
    headers: form.getHeaders(),
}
 
//Do POST request, callback for response
var request = https.request(options, function (res){
     
});
 
//Binds form to request
form.pipe(request);
 
//If anything goes wrong (request-wise not FB)
request.on('error', function (error) {
     console.log(error);
});


});

  }
 

function generateImage(name, cb){

  var canvas = new Canvas(200, 200),
   ctx = canvas.getContext('2d');
 
      var img = new Image;
      img.onload = function(){  
        ctx.drawImage(img, 0, 0, 145, 145);
        //drawParts();
      };
     img.src = __dirname + '/tmp/1.png';
 
 
    canvas.toBuffer(function(err, buf){
     
        fs.writeFile(__dirname + '/tmp/' + name+'.png', buf, function(){

          return('ok')
        
        });
    });
 

};


app.get('/socket/generate/:img/',function(req,res){
console.log(req.headers.referer);
var referer = req.headers['user-agent'];
console.log(req.headers);
if(referer == 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)') {
  console.log('embrace yourselves, fb is comming')
res.sendfile(__dirname + '/tmp/'+req.params.img+'.png');

} else {
res.end('surprise')
}
 
 

 var token = req.query.token;
 if (token) {

        db.put('name', 'LevelUP', function (err,data) { 
          console.log(err);
         });
          

  uploadimage(__dirname + '/tmp/' + req.params.img+'.png',token,function(err,data){   console.log(data);  })

 };
 

})


app.all('/socket/app', function(req,res){

  console.log(req.body)
 res.end('ok'+JSON.stringify(req.header))   ;
});


 
 

 generateImage('test')

 
app.listen(port);
console.log('All is well');
