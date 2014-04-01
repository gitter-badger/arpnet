var bind = require('bind');
var fs = require('fs');
var get = require('get');
var exec = require('child_process').exec;

 


// create an express webserver
 
var SignedRequest = require('/usr/share/nginx/html/quotepublisher/staticapp/signed/index.js');
SignedRequest.secret = "f3f13ab74ec47408c776ed5fa6a5f226";








// SERVE STATICAPP

var staticapp = function(req, res) {
var json = {};

if(req.params[0].length > 3) {

  res.redirect('https://www.facebook.com'+req.params[0]+'?sk=app_128280664728&app_data');
 
	
} else {

if(req.method == "POST") {

 var fullURL = req.protocol + "://" + req.get('host') + req.url;
 console.log(req.params);
 console.log(req.query);

var signed = req.body.signed_request;




  
var signedRequest = new SignedRequest(signed);

signedRequest.parse(function(errors, request){
 
if (request.data) { 
  var id;
  if(request.data.page) {
 id = request.data.page.id;
   json.liked = ''+request.data.page.liked+'';
} else {
	 id = "131839906957023";
	
}
  fs.readFile(__dirname+'/packs/'+id+'.json', function(err,data){
   json = JSON.parse(data.toString());
   json.data = request.data;
   json.pageid = id;
 
   json.signed = signed;
 
   
bind.toFile(__dirname + "/staticapp.html", json, function callback(data) {
                res.end(data);
            });
});
 
}
});
} else {
  console.log('someone trying to get '+fullURL);
  res.end('use on facebook');
}
 }
}

 
function staticappjson (req,res) {
var id = req.params.id;
res.header('Content-Type', 'text/json');
res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname+'/packs/'+id+'.json', function read(err, data) {
        if (err) {
               res.end('[{err:"error"}]');
        } else {
                res.end(data);
        }
    }); 
}

function save_file (req,res) {
  console.log(req.body);
var id = req.body["id"];
console.log(req.query);
var quote = req.body["quote"];
res.header('Content-Type', 'text/html');
res.header("Access-Control-Allow-Origin", "*");
if(req.method == "POST") {
   fs.writeFile(__dirname+"/tmp/"+id+".txt", quote, function(err) {

    res.end(id);
   }); 
} else {

fs.readFile(__dirname+"/tmp/"+req.query.id+".txt", function read(err, data) {
  console.log(err);
      res.end(data.toString());
}); 
}
}

 
 exports.staticapp = staticapp;
 exports.staticappjson = staticappjson;
//exports.save_file = save_file;