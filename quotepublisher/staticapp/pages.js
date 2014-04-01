var bind = require('bind');
var fs = require('fs');
var get = require('get');
var exec = require('child_process').exec;

 


// create an express webserver
 
var SignedRequest = require(__dirname + '/signed/index.js');
SignedRequest.secret = "f841cc96f280fc8fa8a49993c9643388";

var videos = function(req, res) {
var signed = req.body.signed_request;

 

var signedRequest = new SignedRequest(signed);

signedRequest.parse(function(errors, request){
  var id = request.data.page.id;
 
  var json = request.data.page;
  json.id = request.data.page.id;
  console.log(json.id);
  
  if (json.liked) {
	  json.like = "ok"
  } else {
	  json.like = "fail";
  }


 bind.toFile("/usr/share/nginx/html/static/PAGES/indexa.html", json, function callback(data) {
                res.end(data);
            });
    
 
   

});
 
}

 
   
 exports.videos = videos;
 
//exports.save_file = save_file;