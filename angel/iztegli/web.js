var   bind = require('bind');
var fs = require('fs');
var exec = require('child_process').exec;
var _  = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string'); // => true

 var SignedRequest = require(__dirname + '/v2/signed/index.js');
SignedRequest.secret = "96d27fa014cc32de686d0dae6f28a3e6";
 
var iztegli1 = function(req,res) {  
    var signed = req.body.signed_request;
 
 
  var file;
  var id;

 if(req.params.id) {
  file = 'indexa.html'
 id = req.params.id;
 } else {
  file = 'indexa.html';
   id = req.query["id"];
 }
     if (!id) {

      id = "0d86";
    };
 var arr = [];
 var jsonx= {};
 jsonx.id = id;
 var filex = __dirname + "/data/"+id+".txt";
 console.log(filex);
 fs.exists(filex, function(exists) {
  if (exists) {
  fs.readFile(filex, function(err, data1) {
    if(!err) { 
    jsonx.data = JSON.parse(data1.toString());
  
   fs.readFile(__dirname + "/data.json", function(err, data) {
    if (!err) {

    // arr[key] = '<li class="thumb" style="width:130px; height:120px; float:left; cursor:pointer; overflow:hidden; margin:5px; border:1px solid #F2F2F2; text-align:center;"><img src="http://graph.facebook.com/'+val.value+'/picture"><\/li>';
     
    jsonx.appname = jsonx.data.appname;
 if(jsonx.data.file) {

  jsonx.extend = "&id="+jsonx.data.file;
 }

if(jsonx.data.quotes) {
     jsonx.lengther = jsonx.data.quotes.length;
     //stringify

     jsonx.data_json = JSON.stringify(jsonx.data.quotes);

     
 
      jsonx.rid = Math.floor(Math.random()* jsonx.data.quotes.length);
     jsonx.randomquote = jsonx.data.quotes[jsonx.rid].quote;
     if(jsonx.data.quotes[jsonx.rid].image == null) {
         jsonx.randomimage = jsonx.data.image;
     } else {
         jsonx.randomimage = jsonx.data.quotes[jsonx.rid].image;
     }
    
 
 var json = JSON.parse(data.toString());
var randomnumber=Math.floor(Math.random()*json.length);
var randomnumber_ender = randomnumber + 5;

 

 var x = 0;
for (i=randomnumber; i<randomnumber_ender; i++)
  {
   arr[x] = json[i];
   x++;
 
  }
  
     jsonx.items = arr;
      
 

    bind.toFile(__dirname + '/'+file, jsonx, function callback(data) {
      res.writeHead(200, {
        'Content-Type': 'text/html' 
      });
      res.end(data);
      
    });
  } else {
    res.end('error');
  }
  }
})
}
});
} else {
   res.end('error');
}

  
 
    //  
    

    });

 

 
 

};
 
 

 
var screenshots_render = function(req,res) {  
  var id = req.query["id"];
  var randomnumber=Math.floor(Math.random()*11);
exec("phantomjs /usr/share/nginx/html/legacyappz/screenshots/rasterize.js 'http://arpecop.net/legacyappz/screenshots/?id="+id+"'  /usr/share/nginx/html/legacyappz/screenshots/"+randomnumber+".png", function (error, stdout, stderr) {
res.sendfile(__dirname+'/screenshots/'+randomnumber+'.png');
});
 
}




exports.screenshots_render = screenshots_render;
 

exports.iztegli = iztegli1;
