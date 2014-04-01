var http = require('http');
var bind  = require('bind');
var sys = require('sys')

var exec = require('child_process').exec;

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
 response.writeHead(200, {"Content-Type": "text/html"});
exec("forever list --color=none", function function_name(error,data1) {
	console.log(data1)

  
bind.toFile(__dirname+'/index.html',{output:data1},function (data,err) {
	response.end(data)

});

});
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000); 

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
