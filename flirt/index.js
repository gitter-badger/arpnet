 
 

var config = require('./src/config.js');
var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy 
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = require('http').createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
 

if (req.headers.host == 'blog.flirtbot.net') {
 
  proxy.web(req, res, { target: 'http://localhost:84' });
    } else if (req.headers.host == 'radioaktiven.com') { 

  proxy.web(req, res, { target: 'http://localhost:3000' });
    } else {

  proxy.web(req, res, { target: 'http://localhost:'+config.config.port });
  
    }
 

});

 
server.listen(8080);
